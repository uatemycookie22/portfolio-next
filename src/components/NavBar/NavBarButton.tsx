import {AnchorHTMLAttributes, DetailedHTMLProps} from "react";
import Link from "next/link";

export default function NavBarButton(anchorProps:
	                             DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) {

	const {className: _, href, ref: __, ...rest} = anchorProps

	return (
		<Link {...rest}
			href={`${href}`}
		   className={`block lg:inline-block py-2 px-4 text-hover-purple border-hover-fade-purple
				font-semibold text-black
			  transition-duration-300
			  dark:text-white
			  `}/>
	)
}