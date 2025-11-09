import Image from "next/image";
import {Blog} from "../blogs";
import BlogContent from "./(blog)/blog-content";
import {Metadata} from "next";
import Comments from "./(comments)/comments";
import {toDateString} from "@utils/parse-date";
import {calculateReadingTime} from "@utils/reading-time";
import {notFound} from "next/navigation";
import {getBlog} from "../../../services/blog-service";
import {Suspense} from "react";
import CommentSkeleton from "@components/CommentSkeleton/CommentSkeleton";
import BlogImageSkeleton from "@components/BlogImageSkeleton/BlogImageSkeleton";

// ISR: Revalidate every day
export const revalidate = 86400  // 24 hours in seconds
export const dynamicParams = true  // Generate pages on-demand

type BlogPageParams = {
    slug: [string, string]
}

type BlogPageProps = {
    params: Promise<BlogPageParams>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
    const resolvedParams = await params
    const resolvedSearchParams = await searchParams
    const [id] = resolvedParams.slug
    const adminPassword = resolvedSearchParams.admin as string | undefined
    
    // Fetch blog for SEO-critical data (header) - this is fast and must be immediate
    const blogRecord = await getBlog(id)
    
    // Check for null blog - return 404 if not found
    if (!blogRecord) {
        notFound()
    }
    
    const {title, publishedDate, excerpt, coverImage, author, content} = blogRecord
    const date = toDateString(new Date(publishedDate * 1000).toISOString())
    const readingTime = calculateReadingTime(content)
    const imageUrl = coverImage
        ? (coverImage.startsWith('https://') ? coverImage : `/assets/${coverImage}`)
        : '/assets/ts.webp'

    return (
        <article className="flex justify-center content-center mt-24">
            <div className="self-center flex flex-col justify-center max-w-[42rem] p-4 w-full">
                {/* Header - shown immediately (SEO critical) */}
                <section className="flex flex-col gap-4">
                    <h1 className="text-4xl font-extrabold mb-2 text-transparent text-violet-600">
                        {title}
                    </h1>

                    <p className="text-2xl text-black dark:text-white">
                        {excerpt}
                    </p>

                    <div className="flex items-start gap-2.5">
                        <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                            {author.charAt(0).toUpperCase()}
                        </div>
                        
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium text-black dark:text-white">
                                {author}
                            </span>
                            <div className="flex items-center gap-1 text-xs text-neutral dark:text-slate-300">
                                <span>{date}</span>
                                <span className="text-[10px]">•</span>
                                <span>{readingTime} min read</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cover Image - streams with Suspense */}
                <Suspense fallback={<BlogImageSkeleton />}>
                    <section className="mt-14 mb-8 flex justify-center w-full">
                        <Image
                            className="transition-opacity duration-500 delay-200 ease-in-out w-full h-auto"
                            src={imageUrl}
                            alt=""
                            width={672}
                            height={500}
                            sizes="(max-width: 768px) 100vw, 672px"
                            fetchPriority="high"
                            priority
                        />
                    </section>
                </Suspense>

                {/* Blog Content - streams with Suspense */}
                <Suspense fallback={
                    <div className="space-y-4 animate-pulse">
                        <div className="h-4 bg-zinc-500 dark:bg-zinc-500 rounded w-full relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
                        </div>
                        <div className="h-4 bg-zinc-500 dark:bg-zinc-500 rounded w-5/6 relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
                        </div>
                        <div className="h-4 bg-zinc-500 dark:bg-zinc-500 rounded w-4/6 relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
                        </div>
                    </div>
                }>
                    <BlogContent>{content}</BlogContent>
                </Suspense>

                <div className="my-4 border-t border-zinc-300 dark:border-zinc-700" />
                
                {/* Comments - already streaming */}
                <Suspense fallback={<CommentSkeleton count={3} />}>
                    {/*// @ts-ignore*/}
                    <Comments
                        blogId={id}
                        recipientEmail={'hernandezlysander22@gmail.com'}
                        adminPassword={adminPassword}
                    />
                </Suspense>
            </div>
        </article>
    )
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