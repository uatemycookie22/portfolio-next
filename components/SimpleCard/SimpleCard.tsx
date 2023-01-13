import {ReactNode} from "react";

export default function SimpleCard({ children }: { children: ReactNode }) {
	return (<>
		<div className="mb-8">
			<div className="rounded-lg">
				{children}
			</div>
		</div>
	</>)
}