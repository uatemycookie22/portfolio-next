'use client';

import {ReactNode, useEffect, useMemo, useRef, useState} from "react";
import {formatPhoneNumber} from "@utils/formatters";

function NavBarButton({href, children}: {children: ReactNode, href?: string}) {
	return (
		<a href={href} className="block mt-4 lg:inline-block lg:mt-0 mr-6">
		<button className="transparent py-2 px-4 rounded-full focus:outline-none hover:bg-white hover:bg-opacity-5 duration-300 group">
			{children}
		</button>
		</a>
	)
}

type NavbarProps = {
	contact: Contact
}

export default function NavBarComponent(props: NavbarProps) {
	const { phone, email } = props.contact
	const [isMenuOpen, setMenuOpen] = useState(false)
	const [visible, setVisible] = useState(true)
	const [lastScrollTop, setLastScrollTop] = useState(0);

	const handleScroll = () => {
		const currentScrollPos = window.scrollY

		if(currentScrollPos > lastScrollTop){
			setVisible(false)
		}else{
			setVisible(true)
		}

		setLastScrollTop(currentScrollPos)
	}

	const phoneFormatted = useMemo(() => formatPhoneNumber(phone), [phone])

	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen);
	}

	const {current: tw} = useRef({
		barW: 'w-[28px]',
		rotatedW: 'w-[28px]',
	})

	useEffect( () => {
		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll)
	})


	return (
		<>

		<div className={`fixed w-full z-50 top-0 bg-gray-900 lg:flex lg:justify-between lg:items-center lg:px-4 px-6 py-3  text-white
		transition duration-300
		${visible ? 'top-0' : 'translate-y-[-100%] sm:translate-y-0'}
		`}>
			<div className="flex justify-between items-center">
				<a href="#" className="text-xl font-semibold tracking-tight">LH</a>

				<div className="relative z-10 lg:hidden">
					<button
						className={`block rounded-md text-gray-500 hover:text-white focus:text-white flex flex-col justify-between cursor-pointer
					 ${tw.barW} h-[22px] 
					`}
						onClick={toggleMenu}
					>
					<span className={`h-[3px] bg-white origin-left transition-transform ease-in-out transition ease-in-out
					${ isMenuOpen ? tw.rotatedW : 'w-full'}
					${ isMenuOpen ? 'rotate-[45deg]' : ''}
					`} />

						<span className={`h-[3px] bg-white transition-opacity ease-linear
					${ isMenuOpen ? tw.rotatedW : 'w-full'}
					${ isMenuOpen ? 'opacity-0' : ''}
					`} />

						<span className={`h-[3px] bg-white origin-left transition-transform ease-in-out transition ease-out
					${ isMenuOpen ? tw.rotatedW : 'w-full'}
					${ isMenuOpen ? 'rotate-[-45deg]' : ''}`} />
					</button>
				</div>
			</div>

			<div className={`${isMenuOpen ? 'block' : 'hidden'} lg:block lg:flex lg:items-center w-full lg:w-auto`}>
				<div className="text-sm lg:flex-grow">

						<NavBarButton>
							Home
						</NavBarButton>

						<NavBarButton>
							About
						</NavBarButton>

						<NavBarButton>
							Education
						</NavBarButton>

						<NavBarButton>
							Experience
						</NavBarButton>

						<NavBarButton>
							Projects
						</NavBarButton>

				</div>
				<div className="text-sm">

						<NavBarButton href={`mailto:${email}`}>
							<span className="text-gray-300 transition duration-300 group-hover:text-white">
								{email}
							</span>
						</NavBarButton>

						<NavBarButton href={`tel:${phone}`}>
							<div className="w-full h-full">
								<span className="text-gray-300 transition duration-300 group-hover:text-white">
									{phoneFormatted}
								</span>
							</div>
						</NavBarButton>
				</div>
			</div>
		</div>

			<div className="w-full h-[56px]" />
		</>
	)
}