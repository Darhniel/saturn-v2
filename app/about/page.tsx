import React from 'react'
import Image from 'next/image'
import Nav from '@/components/saturn/Nav'
import Header from '@/components/saturn/Header'
import Footer from '@/components/saturn/Footer'

export default function page() {
    return (
        <>
            <Nav />
            <main>
                <Header />
                <div className='py-8 px-4 lg:p-20 flex flex-col lg:flex-row gap-9'>
                    <div>
                        <div className='flex gap-2 mb-6 items-center'>
                            <span className='w-1.5 h-1.5 bg-[#080808] rounded-full'></span>
                            <span className='text-xl'>
                                About Us
                            </span>
                        </div>
                        <h2 className='font-semibold text-6xl'>
                            A Brief Overview
                        </h2>
                    </div>
                    <div>
                        <p className='text-2xl'>
                            Saturn is an all-in-one platform that simplifies and secures wealth-building through digital assets. It caters to individuals and businesses with curated investment options like the Bitcoin Trust Fund, Varied Assets Fund, and Specialized AI Fund, tailored to different goals and risk levels. Saturn provides seamless access and innovative solutions, making it easy to invest in the future of finance.
                        </p>
                    </div>
                </div>

                <div className="px-4 lg:px-20 rounded-3xl">
                    <Image
                        src={"/people.svg"}
                        alt="busiess people discussing"
                        width={1352}
                        height={757}
                        className='w-full rounded-3xl'
                    />
                </div>

                <section className='px-4 py-20 lg:p-20'>
                    <div className='flex flex-col items-center mb-10'>
                        <div className='flex gap-2 mb-6 items-center'>
                            <span className='w-1.5 h-1.5 bg-[#080808] rounded-full'></span>
                            <span className='text-xl'>
                                Our Values
                            </span>
                        </div>

                        <h2 className='font-semibold text-6xl'>
                            Why Saturn?
                        </h2>
                    </div>

                    <div className='flex flex-col gap-6 lg:flex-row mb-6'>
                        <div className='p-6 border border-[#e7e7e7] rounded-3xl'>
                            <Image
                                src={"/financial-growth.svg"}
                                alt="icon"
                                width={80}
                                height={80}
                            />
                            <h3 className='font-bold text-3xl mt-6 mb-3'>
                                Curated Investment Options
                            </h3>
                            <p className='text-xl text-[#414141]'>
                                Tailored funds created to match diverse goals and risk appetites.
                            </p>
                        </div>
                        <div className='p-6 border border-[#e7e7e7] rounded-3xl'>
                            <Image
                                src={"/interface.svg"}
                                alt="icon"
                                width={80}
                                height={80}
                            />
                            <h3 className='font-bold text-3xl mt-6 mb-3'>
                                All-in-One Simplicity
                            </h3>
                            <p className='text-xl text-[#414141]'>
                                Invest, manage, and grow your digital assets—all from one platform.
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-6 lg:flex-row'>
                        <div className='p-6 border border-[#e7e7e7] rounded-3xl'>
                            <Image
                                src={"/accurate.svg"}
                                alt="icon"
                                width={80}
                                height={80}
                            />
                            <h3 className='font-bold text-3xl mt-6 mb-3'>
                                Future-Focused Solutions
                            </h3>
                            <p className='text-xl text-[#414141]'>
                                Access innovative funds designed around emerging trends like AI and blockchain.
                            </p>
                        </div>
                        <div className='p-6 border border-[#e7e7e7] rounded-3xl'>
                            <Image
                                src={"/multimedia.svg"}
                                alt="icon"
                                width={80}
                                height={80}
                            />
                            <h3 className='font-bold text-3xl mt-6 mb-3'>
                                Built-In Security
                            </h3>
                            <p className='text-xl text-[#414141]'>
                                Seamlessly invest with confidence, knowing that your transactions are secure.
                            </p>
                        </div>
                    </div>
                </section>
                <Footer />
            </main>
        </>
    )
}
