import Image from "next/image";
import Link from "next/link";
import {Blog} from "./blogs";
import {pb} from "@pb/pocketbase";

function BlogListing({blogRecord} : { blogRecord: Blog }) {
    const { title, created, description, id } = blogRecord
    const date = new Date(Date.parse(created)).toDateString()

    return (
        <li className={`rounded-lg shadow-md hover:shadow-lg transition duration-200 text-black dark:text-white
            max-h-[50rem] max-w-3xl h-[10rem] w-[90%]
            flex flex-col bg-transparent
        `}>



            <Link href={`/blogs/${id}`} className={`relative flex items-center 
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
                    <Image src={'/assets/ts.png'} alt={''} fill={true} sizes={'sizes="10vw, 10vw, 10vw"'}
                           objectFit={'cover'}
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
    const blogPage = await getBlogs()
    const blogs = blogPage.items.map((blogRecord, i) => (<BlogListing key={i} blogRecord={blogRecord}/>))

    return (<section className={`justify-center content-center mt-24`}>
        <ul className={`flex flex-wrap flex-col justify-center content-center
        gap-12`}>
            {blogs}
        </ul>
    </section>)
}

export async function getBlogs() {
    return pb.collection('blogs').getList<Blog>(1, 10)
}