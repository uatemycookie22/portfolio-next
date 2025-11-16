export interface Blog {
    // Primary Key
    id: string
    
    // GSI Keys
    status: 'published' | 'draft' | 'archived'
    publishedDate: number // Unix timestamp
    
    // Content
    title: string
    excerpt: string // Short description
    content: string // Full markdown content
    
    // Metadata
    author: string
    tags: string[]
    coverImage: string // S3 key
    
    // Timestamps
    createdAt: number // Unix timestamp
    updatedAt: number // Unix timestamp
    
    // SEO
    metaDescription: string
    ogImage: string // S3 key
    
    // Metrics
    views: number
    commentCount?: number
}

export interface BlogListResult {
    items: Blog[]
    lastEvaluatedKey?: Record<string, any>
    hasMore: boolean
}