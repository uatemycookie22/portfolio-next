export default function BlogPageLoading() {
  return (
    <section className="flex justify-center content-center mt-24">
      <div className="self-center flex flex-col justify-center max-w-[42rem] p-4 w-full">
        {/* Header section */}
        <div className="flex flex-col gap-2">
          {/* Title skeleton - large, violet-like */}
          <div className="w-full md:w-3/4 h-12 bg-zinc-500 dark:bg-zinc-500 rounded-lg relative overflow-hidden mb-2">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
          </div>
          
          {/* Excerpt skeleton - 2 lines */}
          <div className="space-y-2 mb-2">
            <div className="w-full h-7 bg-zinc-500 dark:bg-zinc-500 rounded-md relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
            </div>
            <div className="w-4/5 h-7 bg-zinc-500 dark:bg-zinc-500 rounded-md relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
            </div>
          </div>
          
          {/* Date skeleton */}
          <div className="w-32 h-4 bg-zinc-500 dark:bg-zinc-500 rounded-full relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
          </div>
        </div>
        
        {/* Cover image skeleton */}
        <div className="mt-14 mb-8 flex justify-center w-full">
          <div className="relative w-full h-[400px] md:h-[500px] bg-zinc-500 dark:bg-zinc-500 rounded-lg overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
          </div>
        </div>
        
        {/* Blog content skeleton - multiple paragraph lines */}
        <div className="space-y-6 mb-12">
          {/* Paragraph 1 */}
          <div className="space-y-3">
            <div className="w-full h-4 bg-zinc-500 dark:bg-zinc-500 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
            </div>
            <div className="w-full h-4 bg-zinc-500 dark:bg-zinc-500 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
            </div>
            <div className="w-5/6 h-4 bg-zinc-500 dark:bg-zinc-500 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
            </div>
          </div>
          
          {/* Paragraph 2 */}
          <div className="space-y-3">
            <div className="w-full h-4 bg-zinc-500 dark:bg-zinc-500 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
            </div>
            <div className="w-full h-4 bg-zinc-500 dark:bg-zinc-500 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
            </div>
            <div className="w-4/5 h-4 bg-zinc-500 dark:bg-zinc-500 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
            </div>
          </div>
          
          {/* Paragraph 3 */}
          <div className="space-y-3">
            <div className="w-full h-4 bg-zinc-500 dark:bg-zinc-500 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
            </div>
            <div className="w-full h-4 bg-zinc-500 dark:bg-zinc-500 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
            </div>
            <div className="w-3/4 h-4 bg-zinc-500 dark:bg-zinc-500 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
            </div>
          </div>
        </div>
        
        {/* Comments section skeleton */}
        <div className="mt-8 space-y-4">
          {/* Comments header */}
          <div className="w-40 h-6 bg-zinc-500 dark:bg-zinc-500 rounded relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
          </div>
          
          {/* Comment form skeleton */}
          <div className="space-y-3 p-4 border border-zinc-500 dark:border-zinc-500 rounded-lg">
            <div className="w-full h-24 bg-zinc-500 dark:bg-zinc-500 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
            </div>
            <div className="w-32 h-10 bg-zinc-500 dark:bg-zinc-500 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}