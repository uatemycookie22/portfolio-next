import Image from "next/image";
import {ReactNode} from "react";

interface ImageTextProps {
	src: string,
	children?: ReactNode
}

export default function ImageText({src, children}: ImageTextProps) {
	return (<>
		<div className="flex items-center gap-[10px]">
			<Image
				alt="" src={src}
				width={40}
				height={40}
			/>
			<span className="text-2xl">
				{children}
			</span>
		</div>
	</>)
}