"use client";
import classNames from 'classnames';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
const Navbar = () => {
    const currentPath = usePathname();
    
    
    const links = [ { label : "Dashboard", href:"/"}, 
                    { label : "Issues", href:"/issue"}]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 items-center h-14'>
        <Link href="/">
            <AiFillBug />
        </Link>
        <ul className='flex space-x-6'>
            {links.map( (link) => (
                <Link 
                    key={link.href} 
                    href={link.href} 
                    // className={` currentPath === {link.href} ?text-zinc-500 hover:text-zinc-800 transition-colors `}
                    className = {classNames({
                        'text-zinc-800': link.href === currentPath,
                        'text-zinc-500' : link.href !== currentPath,
                        'hover:text-zinc-800 transition-colors' : true
                    })}
                >
                    {link.label}
                </Link>
            ))}
        </ul>
    </nav>
  )
}

export default Navbar