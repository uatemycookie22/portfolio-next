import ReactMarkdown, { MarkdownAsync } from 'react-markdown'

export interface BlogContentProps {
    children: string
}

// Server Component using MarkdownAsync for proper Suspense streaming
export default async function BlogContent({ children }: BlogContentProps) {
    // MarkdownAsync returns a Promise<ReactElement> - perfect for Suspense
    const content = await MarkdownAsync({
        children: children.replace(/\\n/g, "\n")
    });
    
    return (
        <div className="prose prose-violet dark:prose-invert max-w-none w-full">
            {content}
        </div>
    );
}