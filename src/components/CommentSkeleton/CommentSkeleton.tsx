export default function CommentSkeleton({ count = 3 }: { count?: number }) {
    return (
        <div className="space-y-8 mt-8">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="rounded-lg shadow-md p-4 bg-transparent">
                    {/* Author section skeleton */}
                    <div className="flex items-start gap-2">
                        {/* Avatar */}
                        <div className="w-12 h-12 bg-zinc-500 dark:bg-zinc-500 rounded-full relative overflow-hidden flex-shrink-0">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
                        </div>
                        
                        {/* Author info */}
                        <div className="flex-1 space-y-2">
                            {/* Name */}
                            <div className="w-32 h-4 bg-zinc-500 dark:bg-zinc-500 rounded relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
                            </div>
                            
                            {/* Date */}
                            <div className="w-24 h-3 bg-zinc-500 dark:bg-zinc-500 rounded relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
                            </div>
                        </div>
                        
                        {/* Like button skeleton */}
                        <div className="w-12 h-6 bg-zinc-500 dark:bg-zinc-500 rounded relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
                        </div>
                    </div>
                    
                    {/* Comment text skeleton */}
                    <div className="mt-4 space-y-2">
                        <div className="w-full h-4 bg-zinc-500 dark:bg-zinc-500 rounded relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
                        </div>
                        <div className="w-3/4 h-4 bg-zinc-500 dark:bg-zinc-500 rounded relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
                        </div>
                    </div>
                    
                    {/* Reply button skeleton */}
                    <div className="mt-2 w-16 h-4 bg-zinc-500 dark:bg-zinc-500 rounded relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
                    </div>
                </div>
            ))}
        </div>
    );
}