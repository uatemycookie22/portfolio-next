export default function BlogsLoading() {
  return (
    <section className="justify-center content-center mt-24">
      <ul className="flex flex-wrap flex-col justify-center content-center justify-items-center gap-12">
        {/* Skeleton for 3 blog cards with shimmer animation */}
        {[1, 2, 3].map((i) => (
          <li
            key={i}
            className="rounded-lg shadow-md text-black dark:text-white
              max-h-[50rem] max-w-3xl h-[10rem] w-[90%]
              flex flex-col bg-transparent overflow-hidden"
          >
            <div className="relative flex items-center h-full w-full rounded-lg shadow flex-row bg-zinc-200 dark:bg-zinc-900">
              {/* Image skeleton - rounded square on left */}
              <div className="relative rounded-l-lg flex self-stretch h-full w-[8rem] bg-zinc-500 dark:bg-zinc-500">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
              
              {/* Content skeleton */}
              <div className="flex flex-col justify-between p-4 leading-normal w-[90%] h-full overflow-hidden gap-3">
                {/* Date skeleton - small rounded bar top right */}
                <div className="ml-auto w-28 h-3 bg-zinc-500 dark:bg-zinc-500 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 dark:via-zinc-200/50 to-transparent" />
                </div>
                
                {/* Title skeleton - large rounded bar */}
                <div className="w-3/4 h-7 bg-zinc-500 dark:bg-zinc-500 rounded-lg mb-auto relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 dark:via-zinc-200/50 to-transparent" />
                </div>
                
                {/* Excerpt skeleton - 2 rounded bars */}
                <div className="space-y-2 mb-auto w-full">
                  <div className="w-full h-4 bg-zinc-500 dark:bg-zinc-500 rounded-md relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 dark:via-zinc-200/50 to-transparent" />
                  </div>
                  <div className="w-5/6 h-4 bg-zinc-500 dark:bg-zinc-500 rounded-md relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 dark:via-zinc-200/50 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}