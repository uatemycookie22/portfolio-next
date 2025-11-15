export default function BlogsLoading() {
  return (
    <section className="mt-8 px-4 max-w-2xl mx-auto">
      <div className="w-16 h-6 bg-zinc-500 dark:bg-zinc-500 rounded mb-3 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
      </div>

      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <article
            key={i}
            className="border border-zinc-300 dark:border-zinc-700 rounded-lg"
          >
            <div className="flex flex-col sm:flex-row gap-4 p-3 sm:h-[150px]">
              {/* Image skeleton */}
              <div className="relative w-full sm:w-32 h-48 sm:h-32 flex-shrink-0 rounded bg-zinc-500 dark:bg-zinc-500 overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
              </div>

              {/* Content skeleton */}
              <div className="flex flex-col flex-1 justify-between py-1">
                {/* Title & Excerpt */}
                <div>
                  <div className="w-3/4 h-4 bg-zinc-500 dark:bg-zinc-500 rounded mb-2 relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
                  </div>
                  <div className="space-y-1">
                    <div className="w-full h-3 bg-zinc-500 dark:bg-zinc-500 rounded relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
                    </div>
                    <div className="w-5/6 h-3 bg-zinc-500 dark:bg-zinc-500 rounded relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
                    </div>
                  </div>
                </div>

                {/* Bottom metadata */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mt-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-zinc-500 dark:bg-zinc-500 relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
                    </div>
                    <div className="w-32 h-2.5 bg-zinc-500 dark:bg-zinc-500 rounded relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
                    </div>
                  </div>
                  <div className="w-20 h-2.5 bg-zinc-500 dark:bg-zinc-500 rounded relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}