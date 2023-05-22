import {pb} from "../../pocketbase/pocketbase";

export const revalidate = 3;

interface Blog {
    id: string
    title: string
    description: string
    content: string
    created: string
    updated: string
}

async function getBlogs() {
    return await pb.collection('blogs').getList<Blog>(1, 10)
}

function BlogListing({blogRecord} : { blogRecord: Blog }) {
    const { title, created, description } = blogRecord
    const date = new Date(Date.parse(created)).toDateString()

    return (
        <li className={`border border-white rounded-lg p-5 shadow-md hover:shadow-lg transition duration-200 text-black dark:text-white`}>
            <div className={`flex mb-2`}>
               <h2 className="text-2xl font-bold inline">{title}</h2>
                <span className={`ml-auto mr-0 text-neutral`}>{date}</span>
            </div>
            <p className="text-base text-slate-300">{description}</p>
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