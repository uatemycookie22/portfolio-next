export default function BlogImageSkeleton() {
    return (
        <section className="mt-14 mb-8 flex justify-center w-full">
            <div className="w-full h-[500px] bg-zinc-500 dark:bg-zinc-500 rounded relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent" />
            </div>
        </section>
    );
}