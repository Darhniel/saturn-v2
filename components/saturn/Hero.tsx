import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
    return (
        <div className="custom-bg flex flex-col gap-20">
            <div className="pt-12">
                <h1 className="font-bold text-5xl text-center mb-3 max-w-[606px] mx-auto text-white">
                    AI-Driven Asset
                    Management Built For You
                </h1>
                <p className='text-center text-xl max-w-[543px] mx-auto mb-10 text-white'>
                    Looking to explore digital assets or need diversified exposure to emerging markets? Saturn offers a seamless way to invest in the future of finance
                </p>

                <div className="flex justify-center gap-6">
                    <Link href={"/get-started"} className="rounded-xl py-2 px-6 bg-[#1639CE] cursor-pointer text-white">
                        Get Started
                    </Link>
                    <Link href="/login" className="border border-white py-2 px-6 rounded-xl cursor-pointer text-white">
                        Login
                    </Link>
                </div>
            </div>
            <div>
                <Image
                    src={"/tablet.png"}
                    width={630}
                    height={514}
                    alt=""
                    className="mx-auto"
                />
            </div>
        </div>
    )
}
