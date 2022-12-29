import {useEffect, useRef, useState} from "react";

export default function useIntersection(style: string) {
	const [intersecting, setIntersecting] = useState(false)
	const elementRef = useRef<Element>(undefined!)

	useEffect(() => {
		const observer = new IntersectionObserver(entries => entries.forEach(entry => {
			entry.target.classList.toggle(style, entry.isIntersecting)
			setIntersecting(entry.isIntersecting)
		}))
		observer.observe(elementRef.current)
		console.log('Observing')
	}, [style])

	return [elementRef, intersecting] as [typeof elementRef, boolean]
}