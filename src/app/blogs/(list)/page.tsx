import Image from "next/image";
import Link from "next/link";
import {Blog} from "../blogs";
import {Metadata, Viewport} from "next";
import {toDateString} from "@utils/parse-date";
import {formatAndEncode} from "@utils/formatters";
import {calculateReadingTime} from "@utils/reading-time";
import {listBlogs} from "../../../services/blog-service";
import {MExpandMore, MVisibility} from "@components/WrappedIcons";

// ISR: Revalidate every hour
export const revalidate = 3600

export const metadata: Metadata = {
    title: `Blogs | Lysander H`,
    description: `List of blogs from Lysander Hernandez.`,
    icons: [
        {rel: 'shortcut icon', url: '/favicon.ico'}
    ],
    robots: 'index',
    keywords: ['Python', 'Machine Learning', 'Deep Learning', 'MNIST', 'Neural Network'],
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
}

function BlogListing({blogRecord} : { blogRecord: Blog }) {
    const { title, publishedDate, excerpt, id, coverImage, author, content, tags, views } = blogRecord

    const imageUrl = coverImage
        ? (coverImage.startsWith('https://') ? coverImage : `/assets/${coverImage}`)
        : '/assets/ts.webp'
    
    const date = toDateString(new Date(publishedDate * 1000).toISOString())
    const readingTime = calculateReadingTime(content)
    const encodedTitle = formatAndEncode(title)

    return (
        <article className="border border-zinc-300 dark:border-zinc-700
                          hover:border-violet-500 dark:hover:border-violet-500
                          hover:bg-violet-50/50 dark:hover:bg-violet-950/30
                          transition-all duration-200 rounded-lg">
            <Link href={`/blogs/${id}/${encodedTitle}`} className="flex gap-4 p-3 group h-[150px]">
                {/* Cover Image */}
                <div className="relative w-32 h-32 flex-shrink-0 rounded overflow-hidden 
                              bg-zinc-200 dark:bg-zinc-800">
                    <Image 
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        src={imageUrl}
                        alt={title}
                        fill
                        sizes="128px"
                        quality={75}
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 min-w-0 justify-between py-1">
                    {/* Title & Excerpt */}
                    <div>
                        <h2 className="text-base font-bold text-black dark:text-white 
                                     line-clamp-2 group-hover:text-violet-600 dark:group-hover:text-violet-500 
                                     transition-colors leading-tight mb-2">
                            {title}
                        </h2>

                        <p className="text-xs text-neutral dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {excerpt}
                        </p>
                    </div>

                    {/* Bottom row: Author + Metadata */}
                    <div className="flex items-center justify-between gap-3">
                        {/* Left: Author with avatar */}
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center 
                                          text-white text-xs font-semibold flex-shrink-0">
                                {author.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] text-neutral dark:text-slate-400 flex-wrap">
                                <span className="font-medium">{author.split(' ')[0]}</span>
                                <span>•</span>
                                <span>{date}</span>
                                <span>•</span>
                                <span>{readingTime} min</span>
                            </div>
                        </div>

                        {/* Right: Views + Tag */}
                        <div className="flex items-center gap-3 text-[11px] text-neutral dark:text-slate-400">
                            <span className="flex items-center gap-1">
                                <MVisibility sx={{fontSize: 14}} />
                                {views > 0 ? views : 0}
                            </span>
                            {tags.length > 0 && (
                                <span className="text-violet-600 dark:text-violet-400 hidden sm:inline">
                                    {tags[0]}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    )
}

export default async function BlogsPage() {
    const blogItems = await listBlogs({limit: 10})

    return (
        <section className="mt-8 px-4 max-w-2xl mx-auto">
            <h1 className="text-lg font-bold mb-3 text-black dark:text-white">Posts</h1>
            
            {blogItems.items.length > 0 ? (
                <>
                    {/* Blog List - Stacked with spacing */}
                    <div className="flex flex-col gap-3">
                        {blogItems.items.map((blogRecord) => (
                            <BlogListing key={blogRecord.id} blogRecord={blogRecord} />
                        ))}
                    </div>

                    {/* Load More Button */}
                    {blogItems.hasMore && (
                        <div className="mt-4 text-center">
                            <button
                                className="px-3 py-1 rounded border text-xs
                                         border-brand-secondary hover:border-brand-secondary-hover
                                         text-black dark:text-white
                                         transition-colors"
                            >
                                More
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center p-4">
                    <p className="text-sm text-neutral dark:text-slate-300">
                        No posts yet
                    </p>
                </div>
            )}
        </section>
    )
}