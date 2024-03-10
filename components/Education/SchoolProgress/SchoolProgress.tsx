import {MGraduation} from "@icons";
import useFirstIntersection from "@hooks/first-intersection";

interface SchoolProgressProps {
	percentage: number
}

const SchoolProgress = ({percentage}: SchoolProgressProps) => {
	const [barRef, barIntersected] = useFirstIntersection()

	return (
		<>
			<div className="flex w-full mt-4 items-center gap-x-4">
				<div className="h-2 w-full rounded-full bg-opacity-50 bg-zinc-500 dark:bg-neutral">
					<div className={`transition-size delay-200 duration-700 rounded-full h-full 
					bg-violet-600 dark:bg-white rounded-full`}
						 style={{width: `${barIntersected ? percentage : 0}%`}}
					     ref={barRef}>
					</div>
				</div>
				<MGraduation className="text-black dark:text-white"/>
			</div>
		</>
		)

}

export default SchoolProgress