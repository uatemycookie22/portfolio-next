import Image from "next/image";
import {Blog} from "../blogs";
import BlogContent from "./(blog)/blog-content";
import {Metadata} from "next";
import Comments from "./(comments)/comments";
import {toDateString} from "@utils/parse-date";
import {notFound} from "next/navigation";
import {getBlog} from "../../../services/blog-service";

// ISR: Revalidate every day
export const revalidate = 86400  // 24 hours in seconds
export const dynamicParams = true  // Generate pages on-demand

type BlogPageParams = {
    slug: [string, string]
}

type BlogPageProps = {
    params: Promise<BlogPageParams>
}

export default async function BlogPage({ params }: BlogPageProps) {
    const resolvedParams = await params
    const [id] = resolvedParams.slug
    const blogRecord = await getBlog(id)
    
    // Check for null blog - return 404 if not found
    if (!blogRecord) {
        notFound()
    }
    
    const {title, publishedDate, excerpt, coverImage, content } = blogRecord

    // Support both S3 URLs and local assets
    const imageUrl = coverImage
        ? (coverImage.startsWith('https://') ? coverImage : `/assets/${coverImage}`)
        : '/assets/ts.webp'
    // Convert Unix timestamp (seconds) to milliseconds for JavaScript Date
    const date = toDateString(new Date(publishedDate * 1000).toISOString())

    return (<>

        <section className={`flex justify-center content-center mt-24`}>

            <div className={`self-center flex flex-col justify-center max-w-[42rem] p-4 w-full`}>
                <div className={`flex flex-col gap-2`}>
                    <h1 className={`text-4xl font-extrabold mb-2 text-transparent 
                                    text-violet-600`}>
                        {title}
                    </h1>

                    <p className={`text-2xl text-black dark:text-white`}>
                        {excerpt}
                    </p>

                    <p className={`dark:text-neutral`}>
                        {date}
                    </p>
                </div>

                <div className={`mt-14 mb-8 flex justify-center w-full`}>
                    <div className={`relative w-full h-[400px] md:h-[500px]`}>
                        <Image className={`transition-opacity duration-500 delay-200 ease-in-out object-contain`}
                               src={imageUrl}
                               alt={''}
                               fill
                               sizes="(max-width: 768px) 100vw, 672px"
                               priority />
                    </div>
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
    
    const { title, metaDescription, tags, ogImage } = blog
    
    // Support both S3 URLs and local assets for OG image
    const ogImageUrl = ogImage
        ? (ogImage.startsWith('https://') ? ogImage : `/assets/${ogImage}`)
        : '/assets/ts.webp'
    
    return {
        title: `${title} | Lysander H`,
        description: metaDescription,
        icons: [
            {rel: 'shortcut icon', url: '/favicon.ico'}
        ],
        robots: 'index',
        authors: [{name: 'Lysander Hernandez',}],
        keywords: tags,
        openGraph: {
            title: title,
            description: metaDescription,
            images: [ogImageUrl],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: metaDescription,
            images: [ogImageUrl],
        },
    }
}

export function generateViewport() {
    return {
        width: 'device-width',
        initialScale: 1,
    }
}