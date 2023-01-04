import {ReactNode} from "react";

export default function SimpleCard({ children }: { children: ReactNode }) {
	return (<>
		<div className="px-4 mb-8">
			<div className="rounded-lg p-6 ">
				{children}
			</div>
		</div>
	</>)
}