'use client';

import {ReactNode} from "react";
import {MainThemeProvider} from "./theme-provider";
import {IntersectionProvider} from "../context/intersection-refs";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()

export default function Providers({children}:{children: ReactNode}) {
	return (<>
		<MainThemeProvider>
			<IntersectionProvider>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</IntersectionProvider>
		</MainThemeProvider>
	</>)
}