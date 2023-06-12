'use client';
import ReactMarkdown, {Components} from 'react-markdown'

export interface BlogContentProps {
    children: string
}

const components: Components = {
    code: (props) => {

        if (props.inline) {
            return (<>
                <code>{props.children}</code>
            </>)
        }

        return (<>
            <pre>
                <code className={`${props.className} whitespace-pre-wrap`}>
                    {props.children}
                </code>
            </pre>
        </>)
    }
}

export default function BlogContent({  children }: BlogContentProps ) {
    return (<>
        <ReactMarkdown className={`dark:text-slate-300 markdown w-full`} components={components}>
            {children.replace(/\\n/g, "\n")}
        </ReactMarkdown>
    </>)
}