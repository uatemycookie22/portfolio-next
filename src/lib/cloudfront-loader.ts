/**
 * Custom image loader for CloudFront
 * 
 * Automatically prepends CloudFront URL to all local asset paths.
 * This applies to ALL <Image> components without needing to wrap each src.
 */

interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function cloudfrontLoader({ src, width }: ImageLoaderProps): string {
  // If already a full URL, return as-is (S3, CloudFront, external)
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  
  // If it's a Next.js bundled asset (imported images), return as-is
  // These are served from the Next.js server, not CloudFront
  if (src.startsWith('/_next/static/')) {
    return src;
  }
  
  // If CloudFront URL is configured and it's a public asset, use CloudFront
  const cloudfrontUrl = process.env.CLOUDFRONT_URL || process.env.NEXT_PUBLIC_CLOUDFRONT_URL;
  if (cloudfrontUrl && src.startsWith('/assets/')) {
    // Images are pre-optimized, append width param to satisfy Next.js (CloudFront ignores it)
    return `${cloudfrontUrl}${src}?w=${width}`;
  }
  
  // Fallback to local path (append width to satisfy Next.js)
  return `${src}?w=${width}`;
}