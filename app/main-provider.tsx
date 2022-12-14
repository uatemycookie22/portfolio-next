'use client';

import {ReactNode} from "react";
import {MainThemeProvider} from "./theme-provider";
import {IntersectionProvider} from "../context/intersection-refs";

export default function Providers({children}:{children: ReactNode}) {
	return (<>
		<MainThemeProvider>
			<IntersectionProvider>
				{children}
			</IntersectionProvider>
		</MainThemeProvider>
	</>)
}