'use client';
import ReactMarkdown, {Components} from 'react-markdown'

export interface BlogContentProps {
    children: string
}

const components: Components = {
    code: ({node, className, children, ...props}) => {
        const isInline = !className;
        
        if (isInline) {
            return (
                <code {...props}>{children}</code>
            )
        }

        return (
            <pre>
                <code className={`${className} whitespace-pre-wrap`} {...props}>
                    {children}
                </code>
            </pre>
        )
    }
}

export default function BlogContent({  children }: BlogContentProps ) {
    return (
        <div className="prose prose-slate dark:prose-invert max-w-none w-full">
            <ReactMarkdown components={components}>
                {children.replace(/\\n/g, "\n")}
            </ReactMarkdown>
        </div>
    )
}