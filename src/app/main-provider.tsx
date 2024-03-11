'use client';

import {ReactNode} from "react";
import {IntersectionProvider} from "../context/intersection-refs";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()

export default function Providers({children}:{children: ReactNode}) {
	return (<>
			<IntersectionProvider>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</IntersectionProvider>
	</>)
}