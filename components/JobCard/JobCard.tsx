'use client';

import {ReactNode, useState} from "react";

export function JobCard({ front, back }: {front: ReactNode, back: ReactNode}) {
	const [flipped, setFlipped] = useState(false);

	return <div className="p-8 mb-8 max-w-[28rem] w-full lg:mb-0 transition-all hover:transform-perspective transition-all">
		{/*<a className="relative btn" href="https://tritechsoft.com/" target="_blank" rel="noreferrer">*/}
		<button className="sm:h-[512px] bg-secondary rounded-lg shadow-2xl shadow-black  transition-all duration-100 relative w-full relative btn flex justify-start " onClick={() => setFlipped(!flipped)}>
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