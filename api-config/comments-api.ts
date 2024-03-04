export const commentsApiBase = process.env.NODE_ENV === 'production'
    ? `https://${process.env.NEXT_PUBLIC_COMMENTS_API_URL}`
    : `http://${process.env.NEXT_PUBLIC_COMMENTS_API_URL}`
