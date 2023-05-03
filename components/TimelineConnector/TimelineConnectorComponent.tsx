'use client';

import {ReactNode, useContext, useEffect} from "react";
import {IntersectionRefsContext} from "../../context/intersection-refs";
import useIntersection from "@hooks/intersection";

export default function TimelineConnectorComponent({children, index}: {children: ReactNode, index: number}) {
	const { dispatch } = useContext(IntersectionRefsContext)
	const [textRef, textIntersecting] = useIntersection()

	useEffect(() => {
		dispatch({type: 'set', payload: textIntersecting, index})
	}, [textRef, dispatch, index, textIntersecting])
	
	return (
		<div ref={textRef as any}>
			{children}
		</div>
	)
}