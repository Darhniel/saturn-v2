import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
// import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { Manrope } from "next/font/google";

const manRope = Manrope({
    variable: "--font-manrope",
    subsets: ["latin"]
})

export default function Header() {
    return (
        <header className={`${manRope.variable} p-4 lg:py-5 lg:px-20 bg-[#080808] shadow-[0_4px_4px_0_rgba(30,30,30,0.25)]`}>
            <div className="flex justify-between items-center">
                <Link href={"/"}>
                    <Image
                        width={155}
                        height={36}
                        alt='logo'
                        src={'/saturn.svg'}
                    />
                </Link>

                <nav className='hidden lg:flex items-center gap-6'>
                    <Link href={"#funds"} className='flex gap-1 items-center text-white'>
                        Funds
{/*                         <ChevronDownIcon
                            className='text-white'
                            width={16}
                            height={16}
                        /> */}
                    </Link>
                    <Link href={"/about"} className='text-white'>
                        About Us
                    </Link>
                    
                </nav>

                <button className="rounded-xl py-2 px-6 bg-[#1639CE] text-white hidden lg:inline-block">
                    Get Started
                </button>
            </div>
        </header>
    )
}
