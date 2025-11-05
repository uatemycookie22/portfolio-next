import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const healthcheck = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '0.1.0',
  }

  try {
    return NextResponse.json(healthcheck, { status: 200 })
  } catch (error) {
    const errorResponse = {
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    }
    return NextResponse.json(errorResponse, { status: 503 })
  }
}