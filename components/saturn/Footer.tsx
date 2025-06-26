import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className='bg-[#080808] pt-4 lg:pt-12'>
            <div className="flex flex-col lg:flex-row justify-between pb-8 px-4 lg:px-20 mb-3">
                <div className='w-[19rem] mb-12 lg:mb-0'>
                    <div className='mb-4'>
                        <Image
                            width={155}
                            height={36}
                            alt='logo'
                            src={'/saturn.svg'}
                        />
                    </div>
                    <p className='text-white text-xl mb-4'>
                        Smarter investing for a better financial future.
                    </p>
                    <div>
                        <a href="mailto:support@saturn.app" className='text-white no-underline'>
                            support@saturn.app
                        </a>
                        <br />
                        <a href="tel:+2349112803030" className="text-white no-underline">
                            09112803030
                        </a>
                    </div>
                </div>

                <div className='flex gap-16'>
                    <div>
                        <h6 className="text-[#A3A3A3] mb-2">
                            Funds
                        </h6>
                        <Link href="/bitcoin-fund" className="text-[#FEFDFC]">
                            The Bitcoin Fund
                        </Link>
                        <br />
                        <Link href="/specialised-fund" className="text-[#FEFDFC] my-2">
                            The Specialised AI Fund
                        </Link>
                        <br />
                        <Link href="/varied-asset-fund" className="text-[#FEFDFC]">
                            The Varied Asset Fund
                        </Link>
                    </div>
                    <div>
                        <h6 className="text-[#A3A3A3] mb-2">
                            Social
                        </h6>
                        <Link href="#" className="text-[#FEFDFC]">
                            Twitter
                        </Link>
                        <br />
                        <Link href="#" className="text-[#FEFDFC] my-2">
                            Instagram
                        </Link>
                        <br />
                        <Link href="#" className="text-[#FEFDFC]">
                            Facebook
                        </Link>
                    </div>
                </div>
            </div>

            <div className='mb-3 px-4 lg:px-20 text-[#929292] flex flex-col lg:flex-row justify-between text-xs'>
                <nav className="flex flex-col lg:flex-row gap-3 items-start lg:items-center mb-3 lg:mb-0">
                    <Link href="#">
                        Terms of Use
                    </Link>
                    <Link href="#">
                        Privacy Policy
                    </Link>
                </nav>

                <p>
                    © 2025, Saturn (powered by syarpa)
                </p>
            </div>

            <div className="border-t border-[#414141] lg:px-20">
                <Image 
                    width={1280}
                    height={166}
                    alt="saturn wordmark"
                    src={"/wordmark.svg"}
                    className='mt-2 mix-blend-overlay w-[440px] h-[64px] lg:w-full lg:h-full'
                />
            </div>
        </footer>
    )
}
