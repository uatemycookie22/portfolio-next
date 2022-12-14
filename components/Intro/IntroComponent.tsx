'use client';

import {useContext, useEffect, useRef, useState} from "react";
import animations from "styles/animations.module.scss";
import {IntersectionRefsContext} from "../../context/intersection-refs";

function useIntersection(style: string) {
	const [intersecting, setIntersecting] = useState(false)
	const elementRef = useRef(null)

	useEffect(() => {
		const observer = new IntersectionObserver(entries => entries.forEach(entry => {
			entry.target.classList.toggle(style, entry.isIntersecting)
			setIntersecting(entry.isIntersecting)
		}))
		observer.observe(elementRef.current as any)

	}, [style])

	return [elementRef, intersecting] as [typeof elementRef, boolean]
}

export default function IntroComponent() {
	const { dispatch } = useContext(IntersectionRefsContext)
	const [textRef, textIntersecting] = useIntersection(animations.show)
	const [textRef2, textIntersecting2] = useIntersection(animations.show)
	const [textRef3, textIntersecting3] = useIntersection(animations.show)

	useEffect(() => {
		dispatch({type: 'set', payload: [textIntersecting, textIntersecting2, textIntersecting3]})
	}, [textIntersecting, textIntersecting2, textIntersecting3, dispatch])

	return (<>
		<section>
			<h1  style={{color: 'white',}} ref={textRef}>School</h1>
		</section>

		<section>
			<h1 style={{color: 'white',}} ref={textRef2} className={animations.fadeIn}>College</h1>
		</section>

		<section>
			<h1 style={{color: 'white',}} ref={textRef3} className={animations.fadeIn}>Job</h1>
		</section>
	</>)
}