'use client';

import {ReactNode, useContext, useEffect} from "react";
import {IntersectionRefsContext} from "../../context/intersection-refs";
import animations from '/styles/animations.module.scss'
import useIntersection from "../../hooks/use-intersection";

export default function TimelineConnectorComponent({children, index}: {children: ReactNode, index: number}) {
	const { dispatch } = useContext(IntersectionRefsContext)
	const [textRef, textIntersecting] = useIntersection(animations.show)

	useEffect(() => {
		dispatch({type: 'set', payload: textIntersecting, index})
	}, [textRef, dispatch, index, textIntersecting])
	
	return (
		<div ref={textRef}>
			{children}
		</div>
	)
}