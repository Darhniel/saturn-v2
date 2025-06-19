import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function SectionTwo() {
    return (
        <div id='funds'>
            <section className='p-4 lg:p-20 pt-16 flex flex-col lg:flex-row gap-24 items-center text-[#080808]'>
                <div className='lg:w-[29rem]'>
                    <h2 className='font-bold text-5xl mb-3'>
                        The Bitcoin Fund
                    </h2>
                    <p className="font-medium mb-10">
                        This professionally managed investment fund simplifies the process of buying, storing, and managing Bitcoin, providing peace of mind through robust security and compliance standards.
                    </p>
                    <Link href={"/bitcoin-fund"} className='text-white py-4 px-6 rounded-xl bg-[#1639CE]'>
                        Explore Funds
                    </Link>
                </div>
                <div className='bg-[#D9F9FD] lg:w-[35rem] rounded-2xl'>
                    <Image
                        src={"/bitcoin-fund.svg"}
                        width={372}
                        height={298}
                        alt="Iphone displaying an option to select bitcoin fund"
                        className="mx-auto"
                    />
                </div>
            </section>
            <section className='p-4 lg:p-20 pt-16 flex flex-col lg:flex-row gap-24 items-center text-[#080808]'>
                <div className='lg:w-[28rem]'>
                    <h2 className='font-bold text-5xl mb-3'>
                        The Specialised AI Fund
                    </h2>
                    <p className="font-medium mb-10">
                        Invest in AI&apos;s future with this fund—a diversified mix of AI-focused companies and blockchain-powered decentralized projects. It combines stocks and digital assets for effortless, all-in-one investing.
                    </p>
                    <Link href={"/specialised-fund"} className='text-white py-4 px-6 rounded-xl bg-[#1639CE]'>
                        Explore Funds
                    </Link>
                </div>
                <div className='bg-[#D9F9FD] lg:w-[35rem] rounded-2xl'>
                    <Image
                        src={"/specialised-fund.svg"}
                        width={372}
                        height={298}
                        alt="Iphone displaying a dashboard"
                        className="mx-auto"
                    />
                </div>
            </section>
            <section className='p-4 lg:p-20 pt-16 flex flex-col lg:flex-row gap-24 items-center text-[#080808]'>
                <div className='lg:w-[28rem]'>
                    <h2 className='font-bold text-5xl mb-3'>
                        The Varied Asset Fund
                    </h2>
                    <p className="font-medium mb-10">
                        This professionally managed investment fund simplifies the process of buying, storing, and managing Bitcoin, providing peace of mind through robust security and compliance standards.
                    </p>
                    <Link
                        href="/varied-asset-fund"
                        className='text-white py-4 px-6 rounded-xl bg-[#1639CE]'
                    >
                        Explore Funds
                    </Link>
                </div>
                <div className='bg-[#D9F9FD] lg:w-[35rem] rounded-2xl'>
                    <Image
                        src={"/varied-fund.svg"}
                        width={372}
                        height={298}
                        alt="Iphone displaying an option to select bitcoin fund"
                        className="mx-auto"
                    />
                </div>
            </section>
            <section className='p-4 lg:p-20 pt-16 flex flex-col-reverse lg:flex-row gap-24 items-center text-[#080808]'>
                <div className='lg:w-[30rem] rounded-2xl'>
                    <Image
                        src={"/about.svg"}
                        width={540}
                        height={540}
                        alt="Image of he saturn logo"
                        className="mx-auto rounded-2xl"
                    />
                </div>
                <div className='lg:w-[41rem]'>
                    <h2 className='font-bold text-5xl mb-3'>
                        About Saturn
                    </h2>
                    <p className="mb-10 text-2xl">
                        Saturn is an all-in-one platform that makes wealth-building with digital assets simple and secure. Offering curated funds like the Bitcoin Trust Fund, Varied Assets Fund, and Specialised AI Fund, Saturn provides tailored investments for all goals and risk levels. With seamless access and innovative solutions, it’s the easiest way to invest in the future of finance.
                    </p>
                    <Link href={"/about"} className='text-white py-4 px-6 rounded-xl bg-[#1639CE]'>
                        Learn More
                    </Link>
                </div>
            </section>
        </div>
    )
}
