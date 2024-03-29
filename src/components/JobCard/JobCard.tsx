'use client';

import {ReactNode, useState} from "react";

export default function JobCard({ front, back }: {front: ReactNode, back: ReactNode}) {
	const [flipped, setFlipped] = useState(false);

	return <div className="mb-8 max-w-[25rem] min-w-[16rem] w-full lg:mb-0 transition-all hover:transform-perspective transition-all">

		<button className="sm:h-[512px] min-h-[512px] bg-white rounded-lg shadow-xl shadow-neutral dark:shadow-black transition-all duration-100 relative w-full relative btn flex justify-start " onClick={() => setFlipped(!flipped)}>
			<span className={`h-full w-full
			${flipped ? "hidden" : ''}`}>

				{front}

			</span>

			<span className={`h-full w-full
			${flipped ? '' : 'hidden'}`}>

				{back}

			</span>
		</button>

	</div>;

}