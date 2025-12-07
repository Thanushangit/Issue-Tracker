"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames"

const Navbar = () => {

    const NavLinks=[
        {name:"Dashboard",path:"/"},
        {name:"Issues",path:"/issues"},
    ];

    const pathName= usePathname();
  return (
    <nav className='p-2 md:p-4 md:h-14 flex items-center space-x-6 border-b border-gray-400/40'>
        <Link href="/"><AiFillBug size={20} /></Link>
        <ul className='flex items-center space-x-6'>
            {NavLinks.map((link)=>(
                <li key={link.name}>
                    <Link 
                    href={link.path}
                    className={classnames({
                    "text-zinc-900":pathName===link.path,
                    "text-zinc-500":pathName!==link.path,
                    "hover:text-zinc-900 transition-colors":true
                    })}
                    >{link.name}
                    </Link>
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default Navbar