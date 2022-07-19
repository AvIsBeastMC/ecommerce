import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export interface NavLinkProps {
    link: string,
    title: string
}

const NavLink: React.FC<NavLinkProps> = (props: NavLinkProps) => {
    const router = useRouter();

    return (
        <Link href={props.link}>
            <a className={router.pathname == props.link ? 'text-gray-200 mt-2 transition-colors duration-200 transform lg:mt-0 lg:mx-4 hover:text-gray-500 dark:hover:text-gray-200' : 'mt-2 transition-colors duration-200 transform lg:mt-0 lg:mx-4 hover:text-gray-500 dark:hover:text-gray-200'}>{props.title}</a>
        </Link>
    )
}

export default NavLink