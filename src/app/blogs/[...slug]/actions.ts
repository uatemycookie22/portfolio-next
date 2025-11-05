'use server';

import {invalidPrompt} from "@utils/api-constants";
import {commentsApiBase} from "@api-config/comments-api";
import {revalidateTag} from "next/cache";



export async function postComment(formData: FormData): Promise<{response?: string, error?: string}> {
    const failedCommentPost = "Comment post failed"
    const message = formData.get('body')

    let errorReason = ''

    try {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 4000);

        const res = await fetch(`${commentsApiBase}/api/v1/comment`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({message}),
            // signal: AbortSignal.timeout(4000)
            signal: controller.signal
        })
        clearTimeout(id)

        if (!res.ok) {
            switch (res.status) {
                case 400: {
                    errorReason = invalidPrompt
                    break
                }
                default: {
                    errorReason = failedCommentPost
                    break
                }
            }
        }

        await new Promise(resolve =>
            {setTimeout(() => {resolve('')}, 500)}
        )

        await revalidateTag('postComment', {})

        return {response: 'Success', error: undefined}
    } catch (err) {
        if (err instanceof Error) {
            switch (err.name) {
                case 'AbortError': {
                    errorReason = 'Comment submission timed out.'
                    break
                }
                case 'TypeError': {
                    errorReason = 'No connection.'
                    break
                }
                default: {
                    errorReason = failedCommentPost
                }
            }
        }

        return {response: undefined, error: errorReason}
    }
}

