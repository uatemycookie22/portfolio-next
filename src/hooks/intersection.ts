import {useEffect, useRef, useState} from "react";

export default function useIntersection(options?: ConstructorParameters<typeof IntersectionObserver>[1]) {
	const [intersecting, setIntersecting] = useState(false)
	const elementRef = useRef(null)

	useEffect(() => {
		const target = elementRef.current
		if (target == null) return

		const observer = new IntersectionObserver(entries => entries.forEach(entry => {
			setIntersecting(entry.isIntersecting)
		}), options)

		observer.observe(target)

		return () => observer.unobserve(target)
	})

	return [elementRef, intersecting] as [typeof elementRef, boolean]
}