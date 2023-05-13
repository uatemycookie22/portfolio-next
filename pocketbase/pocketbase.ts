import PocketBase from 'pocketbase';

export const pb = new PocketBase(`https://${process.env.NEXT_PUBLIC_PB_URL}`)