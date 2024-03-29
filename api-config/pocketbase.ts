import PocketBase from 'pocketbase';

export const pbBaseUrl = process.env.NODE_ENV === 'production'
    ? `https://${process.env.NEXT_PUBLIC_PB_URL}`
    : `http://${process.env.NEXT_PUBLIC_PB_URL}`
export const pb = new PocketBase(pbBaseUrl)