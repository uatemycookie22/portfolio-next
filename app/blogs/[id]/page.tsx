import Image from "next/image";
import {pb} from "@pb/pocketbase";
import {Blog} from "../blogs";
import BlogContent from "./(blog)/blog-content";

async function getBlog(id: string) {
    return await pb.collection('blogs').getOne<Blog>(id, { '$autoCancel': false })
}

export default async function BlogPage({ params }: { params: { id: string }}) {
    const blogRecord = await getBlog(params.id)
    const { title, created, description, thumbnail, content } = blogRecord

    const imageUrl = thumbnail ? pb.files.getUrl(blogRecord, thumbnail) : '/assets/ts.png'
    const date = new Date(Date.parse(created)).toDateString()

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

                <div className={`mt-14 mb-8 relative flex justify-center w-auto max-h-[400px] h-[70vw] p-2`}>
                    <Image className={`absolute]
									transition-opacity duration-500 delay-200 ease-in-out 
									bg-cover object-cover`} src={imageUrl} alt={''} fill={true}
                           objectFit={'contain'} sizes={'sizes="50vw"'}
                           priority={true} />
                </div>

                <BlogContent>
                    {content}
                </BlogContent>

            </div>
        </section>

    </>)
}

export async function generateStaticParams() {
    const blogs = await pb.collection('blogs').getFullList<Blog>({ '$autoCancel': false })
    return blogs.map((blog) => ({
        id: blog.id,
    }));
}

export async function generateMetadata({ params }: { params: { id: string }}) {
    const { title, description } = await getBlog(params.id)
    return {
        title: `${title} | Lysander H`,
        description,
        viewport: {width: 'device-width', initialScale: 1},
        icons: [
            {rel: 'shortcut icon', url: '/favicon.ico'}
        ],
    }
}
