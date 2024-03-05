import {MPerson} from "@icons";

const PLACEHOLDER_DATE = "Mon Mar 04 2024"

export default function CommentBox(comment: {text: string, date: string}) {
    return (<>
        <li className="rounded-lg shadow-md hover:shadow-lg transition duration-200 text-black dark:text-white
            max-h-[50rem] max-w-3xl h-auto mt-12 p-4
            flex flex-col bg-transparent">

            <div className="flex justify-between">

                <MPerson fontSize={'large'} className="inline" />

                <p className="dark:text-neutral">
                    {PLACEHOLDER_DATE}
                </p>
            </div>


            <p className="pt-6">
                {comment.text}
            </p>

        </li>
    </>)
}