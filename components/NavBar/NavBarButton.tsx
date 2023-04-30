import {AnchorHTMLAttributes, DetailedHTMLProps} from "react";

export default function NavBarButton(anchorProps:
	                             DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) {

	const {className: _, ...rest} = anchorProps

	return (
		<a {...rest}
		   className={`block lg:inline-block py-2 px-4 text-hover-purple border-hover-fade-purple
				font-semibold text-black
			  transition-duration-300
			  dark:text-white
			  `}/>
	)
}