import PocketBase from 'pocketbase';

export const pb = new PocketBase(`http://${process.env.NEXT_PUBLIC_PB_URL}`)