'use client';

import {createContext, ReactNode, useReducer} from "react";


type NullMutableRefs = boolean[]
type IntersectedRefsState = { refs: NullMutableRefs }
type IntersectionRefsAction = { type: 'set', payload: NullMutableRefs}
type IntersectionRefsContextState = { refs: NullMutableRefs, dispatch: (value: IntersectionRefsAction) => void}

export const IntersectionRefsContext = createContext<IntersectionRefsContextState>({
	refs: [], dispatch: () => {},
})

function intersectionRefReducer(state: IntersectedRefsState, action: IntersectionRefsAction) {
	switch (action.type) {
		case 'set':
			return {refs: action.payload}
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