import {ReactNode} from "react";

export function JobBullet({children}: { children: ReactNode }) {
	return <li className="border-b border-gray-300 p-6 py-2">
		<p className="text-lg font-semibold text-left text-gray-800">
			{children}
		</p>
	</li>;
}