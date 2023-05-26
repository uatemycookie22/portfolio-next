import Image from "next/image";
import {pb} from "@pb/pocketbase";
import {Blog} from "../blogs";

async function getBlog(id: string) {
    return await pb.collection('blogs').getOne<Blog>(id)
}

export default async function BlogPage({ params }: { params: { id: string }}) {
    const { title, description, content, created } = await getBlog(params.id)
    const date = new Date(Date.parse(created)).toDateString()

    return (<>

        <section className={`flex justify-center content-center mt-24`}>

            <div className={`self-center flex flex-col justify-center max-w-[42rem] p-4`}>
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
									bg-cover object-cover`} src={'/assets/ts.png'} alt={''} fill={true}
                           objectFit={'contain'} sizes={'sizes="50vw"'}
                           priority={true} />
                </div>

                <p className={`dark:text-slate-300 md:text-lg`}>
                    {content}
                </p>

            </div>
        </section>

    </>)
}

export async function generateStaticParams() {
    const blogs = await pb.collection('blogs').getFullList<Blog>()
    return blogs.map((blog) => ({
        id: blog.id,
    }));
}