'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (<>
            <section className={`justify-center content-center mt-24`}>
                <ul className={`flex flex-wrap flex-col justify-center content-center
        gap-12 content-center items-center text-black dark:text-white`}>
                    <h2 className={`text-3xl`}>Something went wrong</h2>
                    <button
                        onClick={
                            // Attempt to recover by trying to re-render the segment
                            () => reset()
                        }

                        className={`text-xl bg-violet-600 rounded h-12 w-36 hover:bg-violet-500`}
                    >
                        Try again
                    </button>
                </ul>

            </section>

        <div className={`w-full h-full`}>

        </div>
        </>
    )
}