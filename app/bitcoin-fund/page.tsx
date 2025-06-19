import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline'
import Nav from "@/components/Nav";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function page() {
    return (
        <>
            <Nav />
            <main>
                <Header />

                <div>
                    <div className="custom-bg flex flex-col lg:flex-row gap-20 pt-8 px-4 lg:px-20 text-white items-center">
                        <div className="lg:w-[34rem]">
                            <h1 className='font-bold text-7xl mb-3'>
                                The Bitcoin Fund
                            </h1>
                            <p className="text-2xl mb-10">
                                The Saturn Bitcoin Trust Fund offers accredited investors a secure, tech-driven way to invest in Bitcoin without the complexities of direct ownership
                            </p>
                            <Link
                                href="/"
                                className='text-white py-4 px-6 rounded-xl bg-[#1639CE]'
                            >
                                Invest Now
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="absolute top-0 left-0 h-40 w-52">
                                <Image
                                    src="/logo.svg"
                                    alt="Background Left"
                                    layout="fill"
                                />
                            </div>

                            <Image
                                src={"/bitcoin-fund.svg"}
                                width={630}
                                height={514}
                                alt=""
                                className="mx-auto relative"
                            />
                        </div>
                    </div>

                    <section className='py-20 px-4 lg:p-20'>
                        <h2 className='font-bold text-4xl mb-2.5'>
                            Overview
                        </h2>
                        <p className='lg:w-[51rem] mb-16'>
                            The Bitcoin fund simplifies the process of buying, storing, and managing Bitcoin, providing peace of mind through robust security and compliance standards
                        </p>

                        <section>
                            <div className='flex gap-6 flex-col lg:flex-row'>
                                <div className='border rounded-2xl p-5 pb-8 border-[#1639CE1A]'>
                                    <Image
                                        src={"/Image.svg"}
                                        alt=""
                                        width={588}
                                        height={215}
                                        className='mb-6'
                                    />
                                    <div>
                                        <h4 className="text-3xl font-extrabold mb-2">
                                            Fund Strategy
                                        </h4>
                                        <p className="text-[#121212] text-2xl mb-4">
                                            This fund follows a passive holding strategy, directly acquiring and storing Bitcoin to give investors pure exposure to the asset’s market performance
                                        </p>
                                        <button className='text-white py-4 px-6 rounded-xl bg-[#1639CE]'>
                                            Invest Now
                                        </button>
                                    </div>
                                </div>
                                <div className='border rounded-2xl p-5 pb-8 border-[#1639CE1A]'>
                                    <Image
                                        src={"/bento-image.svg"}
                                        alt=""
                                        width={588}
                                        height={215}
                                        className='mb-6'
                                    />
                                    <div>
                                        <h4 className="text-3xl font-extrabold mb-2">
                                            Why Invest?
                                        </h4>
                                        <p className="text-[#121212] text-2xl mb-4">
                                            At Saturn, your investments are managed with smart, diversified strategies—all backed by top-tier security and full transparency. We&apos;re here to help you trade smarter and grow faster.
                                        </p>
                                        <button className='text-white py-4 px-6 rounded-xl bg-[#1639CE]'>
                                            Invest Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='flex gap-6 mt-8 flex-col lg:flex-row'>
                                <div className='border rounded-2xl p-5 pb-8 border-[#1639CE1A]'>
                                    <Image
                                        src={"/bentoImage.svg"}
                                        alt=""
                                        width={588}
                                        height={215}
                                        className='mb-6'
                                    />
                                    <div>
                                        <h4 className="text-3xl font-extrabold mb-2">
                                            Performance
                                        </h4>
                                        <p className="text-[#121212] text-2xl mb-4">
                                            Delivering consistent, market-responsive returns
                                        </p>
                                        <button className='text-white py-4 px-6 rounded-xl bg-[#1639CE]'>
                                            Invest Now
                                        </button>
                                    </div>
                                </div>
                                <div className='border rounded-3xl border-[#1639CE1A] lg:w-[59%] mix-blend-multiply relative bg-[#000D45] py-9 px-12'>
                                    <div className='absolute inset-0 rounded-3xl'>
                                        <Image
                                            src={"/background.jpg"}
                                            alt="background image"
                                            className='w-full h-full object-cover opacity-25 rounded-3xl'
                                            width={512}
                                            height={215}
                                        />
                                    </div>
                                    <div className='text-white relative z-30'>
                                        <h4 className="text-5xl font-bold mb-2 text-center">
                                            Download Private
                                            <br />Placement<br /> Memorandum
                                        </h4>
                                        <p className="text-2xl mb-8 text-center">
                                            Gain access to real-time insights, detailed reports, and expert advice to help you stay ahead in the market and make confident investment decisions.
                                        </p>
                                        <button className='text-white py-4 px-6 rounded-xl bg-[#1639CE] flex gap-3 items-center mx-auto'>
                                            Download Brochure
                                            <DocumentArrowDownIcon
                                                width={24}
                                                height={24}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                </div>

                <Footer />
            </main>
        </>
    )
}
