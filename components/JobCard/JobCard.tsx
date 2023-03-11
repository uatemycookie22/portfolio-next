'use client';

import {ReactNode, useState} from "react";

export default function JobCard({ front, back }: {front: ReactNode, back: ReactNode}) {
	const [flipped, setFlipped] = useState(false);

	return <div className="mb-8 max-w-[22rem] w-full lg:mb-0 transition-all hover:transform-perspective transition-all">

		<button className="sm:h-[460px] min-h-[460px] rounded-lg bg-white shadow-xl shadow-neutral dark:shadow-black transition-all duration-100 relative w-full relative btn flex justify-start " onClick={() => setFlipped(!flipped)}>
			<div className={`h-full w-full
			${flipped ? "hidden" : ''}`}>

				{front}

			</div>

			<div className={`h-full w-full
			${flipped ? '' : 'hidden'}`}>

				{back}

			</div>
		</button>

	</div>;

}