import {useRef, useState} from "react";

export default function useIdempotent<T>(initial: T | (() => T), predicate?: (state: T) => boolean): [T, (state: T) => void] {
	const setted = useRef(false)
	const [state, setState] = useState(initial)

	return [
		state,
		(newState: T) => {
			if (!setted.current) {
				setted.current = predicate?.(newState) || !!newState
				setState(newState)
			}
		}
	]
}