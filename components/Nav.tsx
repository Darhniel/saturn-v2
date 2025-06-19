"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Nav() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const pathname = usePathname();

    const navItems = [
        { name: 'The Bitcoin Fund', href: '/bitcoin-fund', },
        { name: 'The Specialised AI Fund', href: '/specialised-fund' },
        { name: 'The Varied Asset Fund', href: '/varied-asset-fund' },
        { name: 'FAQs', href: '/#faq' },
        { name: 'About Us', href: '/about' }
    ];

        useEffect(() => {
            const mainElement = window.document.querySelector("main")
    
            if (isSidebarOpen) {
                if (mainElement) {
                    mainElement.classList.add('overflow-y-hidden');
                }
            } else {
                if (mainElement) {
                    mainElement.classList.remove('overflow-y-hidden');
                }
            }
        }, [isSidebarOpen]);

    return (
        <>
            <button
                className="bg-[#0033CC] w-8 h-8 lg:hidden text-white rounded-xl flex justify-center items-center absolute top-4 right-4"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                ) : (
                    <Bars3Icon className="h-6 w-6" />
                )}
            </button>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            <div
                className={`bg-[#080808] text-white w-56 h-screen flex flex-col fixed top-0 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} z-40`}
            >
                <Link href={"/"} className="px-6 py-4 border-b border-gray-700">
                    <Image
                        src={"/saturn.svg"}
                        width={156}
                        height={36}
                        alt='logo'
                    />
                </Link>

                <div className='flex flex-col h-full justify-between'>
                    <nav className="px-2 py-4 flex-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex gap-2 items-center text-base/8 p-2 rounded mb-1 ${pathname.endsWith(item.href) ? 'text-white bg-[#0033CC]' : 'hover:bg-gray-800'
                                    }`}
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    )
}
