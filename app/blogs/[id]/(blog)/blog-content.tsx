'use client';
import ReactMarkdown from 'react-markdown'

export interface BlogContentProps {
    children: string
}

export default function BlogContent({  children }: BlogContentProps ) {
    return (<>
        <ReactMarkdown className={`dark:text-slate-300 markdown w-full`}>
            {children.replace(/\\n/g, "\n")}
        </ReactMarkdown>
    </>)
}