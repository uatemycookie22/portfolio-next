import { NextResponse } from 'next/server'
import { listBlogs } from '../../../services/blog-service'

export async function GET() {
  const healthcheck = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '0.1.0',
    dynamodb: {
      status: 'unknown',
      blogCount: 0,
      error: null as string | null,
    },
  }

  try {
    // Test DynamoDB connection at runtime
    console.log('[Health Check] Testing DynamoDB connection at runtime...')
    const blogResult = await listBlogs({ limit: 5 })
    
    healthcheck.dynamodb.status = 'connected'
    healthcheck.dynamodb.blogCount = blogResult.items.length
    
    console.log('[Health Check] DynamoDB connection successful!')
    console.log('[Health Check] Runtime credentials working:', {
      hasRoleArn: !!process.env.AWS_ROLE_ARN,
      hasAccessKey: !!process.env.AWS_ACCESS_KEY_ID,
      region: process.env.AWS_REGION,
      blogsFetched: blogResult.items.length,
    })
    console.log('[Health Check] Fetched blogs:', JSON.stringify(blogResult.items.map(b => ({
      id: b.id,
      title: b.title,
      publishedDate: new Date(b.publishedDate * 1000).toISOString(),
    })), null, 2))

    return NextResponse.json(healthcheck, { status: 200 })
  } catch (error) {
    console.error('[Health Check] DynamoDB connection failed:', error)
    
    healthcheck.dynamodb.status = 'error'
    healthcheck.dynamodb.error = error instanceof Error ? error.message : 'Unknown error'
    
    // Still return 200 but with error details
    return NextResponse.json(healthcheck, { status: 200 })
  }
}