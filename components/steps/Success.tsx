import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Success() {
    return (
        <div className='flex flex-col justify-center items-center p-6 bg-[#FAFAFA] h-screen'>
            <Image
                src={"/blue-logo.svg"}
                width={156}
                height={36}
                alt='logo'
                className='mb-10'
            />

            <div className='p-6 bg-white rounded-2xl max-w-md mx-auto'>
            <Image
                src={"/check.svg"}
                width={120}
                height={120}
                alt='success icon'
                className='mb-10 mx-auto'
            />

            <h2 className='font-bold text-2xl mb-2.5 text-center'>
                Account Created Successfully
            </h2>

            <p className='text-[#606060] text-sm text-center mb-6'>
                Your account is ready!
            </p>

            <Link
                href={"/login"}
                className="w-full block text-center rounded py-2 text-white bg-[#1639CE] cursor-pointer"
            >
                Proceed
            </Link>
        </div>
        </div>
    )
}
