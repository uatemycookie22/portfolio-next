import ReactMarkdown, { MarkdownAsync } from 'react-markdown'
import { ExternalLink } from 'lucide-react'

export interface BlogContentProps {
    children: string
}

// Server Component using MarkdownAsync for proper Suspense streaming
export default async function BlogContent({ children }: BlogContentProps) {
    // MarkdownAsync returns a Promise<ReactElement> - perfect for Suspense
    const content = await MarkdownAsync({
        children: children.replace(/\\n/g, "\n"),
        components: {
            a: ({ href, children, ...props }) => {
                const isExternal = href?.startsWith('http');
                return (
                    <a href={href} {...props} className="group">
                        <span>{children}</span>
                        {isExternal && <span className="inline-block"><ExternalLink className="inline w-4 h-4 ml-1 align-text-bottom text-accent group-hover:text-accent-hover md:text-content md:dark:text-neutral-primary transition-colors duration-[600ms]" /></span>}
                    </a>
                );
            }
        }
    });
    
    return (
        <div id="blogContent" className="prose prose-violet prose-sm md:prose-base dark:prose-invert max-w-none w-full">
            {content}
        </div>
    );
}