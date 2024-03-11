import Image from "next/image";
import {pb} from "@api-config/pocketbase";
import {Blog} from "../blogs";
import BlogContent from "./(blog)/blog-content";
import {Metadata} from "next";
import Comments from "./(comments)/comments";
import {toDateString} from "../../../utils/parse-date";

type BlogPageParams = {
    slug: [string, string]
}

type BlogPageProps = {
    params: BlogPageParams
}

async function getBlog(id: string) {
    return await pb.collection('blogs').getOne<Blog>(id, { '$autoCancel': false })
}

export default async function BlogPage({ params }: BlogPageProps) {
    const [id] = params.slug
    const blogRecord = await getBlog(id)
    const {title, created, description, thumbnail, content } = blogRecord

    const imageUrl = thumbnail ? pb.files.getUrl(blogRecord, thumbnail) : '/assets/ts.png'
    const date = toDateString(created)

    return (<>

        <section className={`flex justify-center content-center mt-24`}>

            <div className={`self-center flex flex-col justify-center max-w-[42rem] p-4 w-full`}>
                <div className={`flex flex-col gap-2`}>
                    <h1 className={`text-4xl font-extrabold mb-2 text-transparent 
                                    text-violet-600`}>
                        {title}
                    </h1>

                    <p className={`text-2xl text-black dark:text-white`}>
                        {description}
                    </p>

                    <p className={`dark:text-neutral`}>
                        {date}
                    </p>
                </div>

                <div className={`mt-14 mb-8 relative flex justify-center h-auto min-h-[100px] p-2`}>
                    <Image className={`absolute]
									transition-opacity duration-500 delay-200 ease-in-out 
									bg-cover object-cover`} src={imageUrl} alt={''} fill={true}
                           objectFit={'contain'} sizes={'sizes="50vw"'}
                           priority={true} />
                </div>

                <BlogContent>
                    {content}
                </BlogContent>
                {/*// @ts-ignore*/}
                <Comments comments={[]} recipientEmail={'mail@mail.mail'} />
            </div>
        </section>

    </>)
}

export async function generateStaticParams(): Promise<BlogPageParams[]> {
    const blogs = await pb.collection('blogs').getFullList<Blog>({ '$autoCancel': false })

    return blogs.map((blog) => ({
        slug: [blog.id, blog.title], // Matches /:id and /:id/:title
    }));
}

export async function generateMetadata({ params }: { params: BlogPageParams}): Promise<Metadata> {
    const [id] = params.slug
    const { title, description } = await getBlog(id)
    return {
        title: `${title} | Lysander H`,
        description,
        icons: [
            {rel: 'shortcut icon', url: '/favicon.ico'}
        ],
        robots: 'index',
        authors: [{name: 'Lysander Hernandez',}],
        keywords: ['Python', 'Machine Learning', 'Deep Learning', 'MNIST', 'Neural Network'],
    }
}

export function generateViewport() {
    return {
        width: 'device-width',
        initialScale: 1,
    }
}