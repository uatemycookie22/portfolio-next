import useIdempotent from "@hooks/use-idempotent";
import {useEffect} from "react";
import useIntersection from "@hooks/use-intersection";

export default function useFirstIntersection( options?: Parameters<typeof useIntersection>[0] ): ReturnType<typeof useIntersection> {
	const [ref, refIntersecting] = useIntersection(options)

	const [intersected, setIntersected] = useIdempotent(false)

	useEffect(() => {
		setIntersected(refIntersecting)
	}, [refIntersecting, intersected, setIntersected])

	return [ref, intersected]
}