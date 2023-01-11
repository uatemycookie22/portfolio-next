import {MGraduation} from "@icons";
import useFirstIntersection from "@hooks/use-first-intersection";

const SchoolProgress = () => {
	const [barRef, barIntersected] = useFirstIntersection()

	return (
		<>
			<div className="flex w-full mt-4 items-center gap-x-4">
				<div className="h-2 w-full rounded-full bg-gray-800">
					<div className={`transition-all delay-200 duration-700 rounded-full h-full bg-secondary rounded-full
					${barIntersected ? "w-[45%]" : "w-0"}`}
					     ref={el => {if (el) barRef.current = el}}>
					</div>
				</div>
				<MGraduation className="text-primary"/>
			</div>
		</>
		)

}

export default SchoolProgress