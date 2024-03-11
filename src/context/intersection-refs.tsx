'use client';

import {createContext, ReactNode, useReducer} from "react";


type NullMutableRefs = boolean
type IntersectedRefsState = { refs: NullMutableRefs[] }
type IntersectionRefsAction = { type: 'set', payload: NullMutableRefs, index: number}
type IntersectionRefsContextState = { refs: NullMutableRefs[], dispatch: (value: IntersectionRefsAction) => void}

export const IntersectionRefsContext = createContext<IntersectionRefsContextState>({
	refs: [], dispatch: () => {},
})

function intersectionRefReducer(state: IntersectedRefsState, action: IntersectionRefsAction) {
	switch (action.type) {
		case 'set':
			const newRefs = [...state.refs]
			newRefs[action.index] = action.payload

			return {refs: newRefs}
		default:
			throw new Error()
	}
}

export function IntersectionProvider({children}: {children: ReactNode}) {
	const [intersectedRefs, dispatchIntersectedRefs] = useReducer(intersectionRefReducer, {refs: []})

	return (<>
		<IntersectionRefsContext.Provider value={{refs: intersectedRefs.refs, dispatch: dispatchIntersectedRefs}}>
			{children}
		</IntersectionRefsContext.Provider>
	</>)
}