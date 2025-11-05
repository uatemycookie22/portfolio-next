import Image from "next/image";
import {Blog} from "../blogs";
import BlogContent from "./(blog)/blog-content";
import {Metadata} from "next";
import Comments from "./(comments)/comments";
import {toDateString} from "@utils/parse-date";
import {notFound} from "next/navigation";

// ISR: Revalidate every day
export const revalidate = 60 * 60 * 24
export const dynamicParams = true  // Generate pages on-demand

type BlogPageParams = {
    slug: [string, string]
}

type BlogPageProps = {
    params: Promise<BlogPageParams>
}

async function getBlog(id: string): Promise<Blog | null> {
    // Mock: return null (blog not found - no PocketBase)
    return null
}

export default async function BlogPage({ params }: BlogPageProps) {
    const resolvedParams = await params
    const [id] = resolvedParams.slug
    const blogRecord = await getBlog(id)
    
    // Check for null blog - return 404 if not found
    if (!blogRecord) {
        notFound()
    }
    
    const {title, created, description, thumbnail, content } = blogRecord

    // Mock: would normally use pb.files.getUrl(blogRecord, thumbnail)
    const imageUrl = thumbnail ? '/assets/ts.png' : '/assets/ts.png'
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


export async function generateMetadata({ params }: { params: Promise<BlogPageParams>}): Promise<Metadata> {
    const resolvedParams = await params
    const [id] = resolvedParams.slug
    const blog = await getBlog(id)
    
    // Return default metadata if blog not found
    if (!blog) {
        return {
            title: 'Blog Not Found | Lysander H',
            description: 'This blog post is not available.',
        }
    }
    
    const { title, description } = blog
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