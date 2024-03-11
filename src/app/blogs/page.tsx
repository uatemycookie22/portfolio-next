import Image from "next/image";
import Link from "next/link";
import {Blog} from "./blogs";
import {pb} from "@api-config/pocketbase";
import {Metadata, Viewport} from "next";
import {ClientResponseError, ListResult} from "pocketbase";
import {toDateString} from "@utils/parse-date";
import {formatAndEncode} from "@utils/formatters";

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
    const { title, created, description, id, thumbnail } = blogRecord

    const imageUrl = thumbnail ? pb.files.getUrl(blogRecord, thumbnail) : '/assets/ts.png'
    const date = toDateString(created)

    const encodedTitle = formatAndEncode(title)
    return (
        <li className={`rounded-lg shadow-md hover:shadow-lg transition duration-200 text-black dark:text-white
            max-h-[50rem] max-w-3xl h-[10rem] w-[90%]
            flex flex-col bg-transparent
        `}>



            <Link href={`/blogs/${id}/${encodedTitle}`} className={`relative flex items-center 
            h-full w-full
            rounded-lg shadow flex-row
            hover:bg-zinc-500 hover:bg-opacity-10
            dark:hover:bg-gray-700
            rounded-t-lg 
            
            `}>
                <div className={`relative rounded-t-lg rounded-none rounded-l-lg flex self-start
                 h-full
                 w-[8rem]
                `}>
                    <Image className="object-cover"
                           src={imageUrl}
                           alt={''}
                           width={120}
                           height={40}
                           sizes={'sizes="10vw, 10vw, 10vw"'}
                           quality={25}
                    />
                </div>

                <div className="flex flex-col justify-between p-4 leading-normal w-[90%] h-full overflow-hidden">
                    <span className={`ml-auto mr-0 text-neutral text-sm md:text-md`}>{date}</span>
                    <h2 className="text-xl md:text-2xl font-semibold inline mb-auto">{title}</h2>
                    <p className={`dark:text-slate-300 mb-auto
                    whitespace-nowrap overflow-ellipsis overflow-hidden md:whitespace-normal
                    text-sm md:text-[16px]
                    `}>{description}</p>
                </div>
            </Link>
        </li>
    )
}

export default async function BlogsPage() {
    const [blogItems] = await getBlogs()
    const blogs = blogItems?.items.map((blogRecord, i) => (<BlogListing key={i} blogRecord={blogRecord}/>))

    return (<section className={`justify-center content-center mt-24`}>
        <ul className={`flex flex-wrap flex-col justify-center content-center justify-items-center
        gap-12`}>
            {blogs}
        </ul>
    </section>)
}

type GetBlogs = [ListResult<Blog> | undefined, unknown | undefined]
async function getBlogs(): Promise<GetBlogs> {
    try {
        const fetchedBlogs = await pb.collection('blogs')
            .getList<Blog>(1, 10, { '$autoCancel': false, fields: '' })

        return [fetchedBlogs, undefined]
    } catch (error) {
        if (error instanceof ClientResponseError) {
            const errorMessage = `${error.originalError} ${error.originalError.cause} ${pb.baseUrl}`
            throw new ClientResponseError(errorMessage)
        }

        throw error
    }
}