'use client'
import Image from 'next/image';
import { useState } from 'react';
import { ArrowUpTrayIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import Notifications from './Notification';

type RequestDataType = {
    amount: string;
    investment: string;
    isRequest: boolean;
    penalty: string;
}

type InvestmentDataType = {
    amount: string;
    investment: string;
    isFund: boolean;
    payment: string;
}

interface HeaderProps {
    requestData: RequestDataType;
    investmentData: InvestmentDataType;
    setRequestData: React.Dispatch<React.SetStateAction<RequestDataType>>;
    setInvestmentData: React.Dispatch<React.SetStateAction<InvestmentDataType>>;
    title: string;
}

export default function Header({ title, requestData, setRequestData, investmentData, setInvestmentData }: HeaderProps) {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <header className=" space-y-4 mb-6 sm:space-y-0">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-[#101010] hidden md:block">
                    {title}
                </h1>
                <Image
                    src={"/images/dashboard/logos.svg"}
                    width={112}
                    height={26}
                    alt=""
                    className="md:hidden"
                />
                <div className="hidden md:flex gap-3">
                    <Notifications />

                    <div className="flex items-center ml-4 space-x-2">
                        <div className="h-10 w-10 bg-gray-400 rounded-full flex items-center justify-center">
                            <div className="bg-[#CCC1F0] rounded-full">
                                <Image
                                    src={"/images/dashboard/avatar.png"}
                                    width={40}
                                    height={40}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div>
                            <p className="font-medium text-sm">Sandra Vivian</p>
                            <p className="text-xs text-gray-500">devign@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:flex items-center justify-center md:justify-between">
                <div className="relative md:block mb-6 md:mb-0">
                    <div className="w-6 h-6 absolute left-2 top-2">
                        <MagnifyingGlassIcon
                            width={20}
                            height={20}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Search anything here"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-[#F7F9FC] w-full"
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        className="px-6 py-2 bg-white rounded-xl border border-[#D6D6D6] text-base font-medium text-[#101010] flex items-center gap-2"
                        onClick={() => setRequestData({ ...requestData, isRequest: true })}
                    >
                        <ArrowUpTrayIcon
                            width={24}
                            height={24}
                        />
                        Export
                    </button>

                    <button
                        className="px-6 py-2 rounded-xl bg-gradient-to-b from-[#8627FF] to-[#3F1574] text-white text-base font-medium flex items-center gap-1"
                        onClick={() => setInvestmentData({ ...investmentData, isFund: true })}
                    >
                        <PlusIcon
                            width={24}
                            height={24}
                        />
                        Fund Investment
                    </button>
                </div>
            </div>
        </header>
    )
}