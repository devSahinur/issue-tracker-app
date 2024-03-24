'use client'
import Link from 'next/link'
import React from 'react'
import { AiFillBug } from "react-icons/ai";
import { usePathname } from 'next/navigation';

const NavBar = () => {
    const currentPath = usePathname()
    const links = [
        {
            name: 'Dashboard',
            href: '/'
        },
        {
            name: 'Issues',
            href: '/issues'
        }
    ]
    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
            <Link href={'/'}><AiFillBug /></Link>
            <ul className='flex space-x-6'>
                {links.map((link) => (
                    <li key={link.name}><Link className={`${currentPath === link.href ? 'text-zinc-900' : 'text-zinc-500'} text-zinc-500 hover:text-zinc-800 transition-colors`} href={link.href}>{link.name}</Link></li>
                ))}
            </ul>
        </nav>
    )
}

export default NavBar