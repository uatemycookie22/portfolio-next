import Image from "next/image";
import {ReactNode} from "react";
import styles from './ImageTextComponent.module.scss'

interface ImageTextProps {
	src: string,
	children?: ReactNode
}

export default function ImageText({src, children}: ImageTextProps) {
	return (<>
		<div className={styles.container}>
			<Image
				alt="" src={src}
				width={40}
				height={40}
			/>
			<span>
				{children}
			</span>
		</div>
	</>)
}