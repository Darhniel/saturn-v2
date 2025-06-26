"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import Image from 'next/image';
import { OverviewIcon, SettingsIcon, UsersIcon, PortfolioIcon, TransactionsIcon, MessagesIcon, Bank } from '../saturn/SVG';
import { Bars3Icon, XMarkIcon, ArrowRightStartOnRectangleIcon, NoSymbolIcon } from '@heroicons/react/24/outline'

export default function SideNav() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const pathname = usePathname();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

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

    const navItems = [
        { name: 'Overview', href: '/dashboard' },
        { name: 'Investments', href: '/investment' },
        { name: 'Earnings & Returns', href: '/earnings', },
        { name: 'Transactions', href: '/transactions' },
        { name: 'Withdrawal Method', href: '/withdrawal' }
    ];

    const extraNavItems = [
        { name: 'Settings', href: '/settings' }
    ]

    return (
        <>
            <button
                className="lg:hidden fixed top-4 right-4 z-50 p-2 text-black rounded-lg"
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
                className={`bg-[#15161B] text-white w-56 h-screen flex flex-col fixed top-0 lg:relative transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 z-40`}
            >
                <div className="px-6 py-4 text-xl font-bold border-b border-gray-700">
                    <Image
                        src={"/images/dashboard/logo.svg"}
                        width={156}
                        height={36}
                        alt='logo'
                    />
                </div>

                <div className='flex flex-col h-full justify-between'>
                    <nav className="px-2 py-4 flex-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href === "/dashboard" ? item.href : `/dashboard${item.href}`}
                                className={`flex gap-2 items-center text-base/8 p-2 rounded mb-1 ${pathname.endsWith(item.href) ? 'text-white bg-gradient-to-b from-[#0066FF] to-[#1639CE]' : 'hover:bg-gray-800'
                                    }`}
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <div className="h-6 w-6">
                                    {
                                        item.name === "Overview" ?
                                            <OverviewIcon href={pathname.endsWith(item.href)} />
                                            :
                                            item.name === "Investments" ?
                                                <UsersIcon href={pathname.endsWith(item.href)} />
                                                :
                                                item.name === "Earnings & Returns" ?
                                                    <PortfolioIcon href={pathname.endsWith(item.href)} />
                                                    :
                                                    item.name === "Transactions" ?
                                                        <TransactionsIcon href={pathname.endsWith(item.href)} />
                                                        :
                                                        item.name === "Messages" ?
                                                            <MessagesIcon href={pathname.endsWith(item.href)} />
                                                            :
                                                            item.name === "Withdrawal Method" ?
                                                                <Bank href={pathname.endsWith(item.href)} />
                                                                : ""
                                    }
                                </div>
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex flex-col justify-center flex-1">
                        <nav className="px-2 py-4">
                            {extraNavItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={`/dashboard${item.href}`}
                                    className={`flex gap-2 items-center text-base/8 p-2 rounded mb-1 ${pathname.endsWith(item.href) ? 'text-white bg-gradient-to-b from-[#8627FF] to-[#3F1574]' : 'hover:bg-gray-800'
                                        }`}
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    {
                                        item.name === "Settings" ?
                                            <SettingsIcon href={pathname.endsWith(item.href)} />
                                            : ""
                                    }
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        <div className="px-2 py-4 border-t border-gray-700">
                            <button
                                className="w-full text-left p-2 rounded hover:bg-gray-800 flex gap-2 items-center "
                                onClick={() => setShowLogoutModal(true)}
                            >
                                <ArrowRightStartOnRectangleIcon
                                    width={24}
                                    height={24}
                                />
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showLogoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white text-black rounded-lg p-6 max-w-[21rem] w-full">
                        <div className="p-4 w-fit mx-auto my-4 bg-[#FBE9E9] rounded-full">
                            <NoSymbolIcon color={"#D42620"} width={24} />
                        </div>
                        <h2 className="text-xl font-bold text-center text-[#1C1B1F]">Are you sure you want to Logout</h2>
                        <p className="text-center text-[#8C8B90] mt-2">
                            You will be signed out of your account and need to log in again to continue.
                        </p>
                        <div className="mt-12 flex justify-center gap-12">
                            <button
                                className="px-4 py-2 rounded text-[#D42620] border border-[#D42620]"
                                onClick={() => setShowLogoutModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 rounded bg-red-600 text-white"
                                onClick={() => {
                                    window.location.href = 'https://www.syarpa.com';
                                }}
                            >
                                Yes, Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
