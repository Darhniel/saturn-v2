'use client'
import React from 'react'
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';

const faqs = [
    {
        question: "What is Saturn?",
        answer: "Saturn bundles high-performing assets into investment products called “crypto funds.” You choose a fund, invest using crypto or local currency, and Saturn handles rebalancing, tracking, and insights for you."
    },
    {
        question: "What types of funds does Saturn offer?",
        answer: `Saturn currently offers three main investment products:\n\n• Bitcoin Fund – Pure exposure to Bitcoin for those seeking a long-term BTC position.\n• Specialised AI Fund – Invest in leading AI and infrastructure tokens driving the future of decentralised technology.\n• Varied Assets Fund – A diversified portfolio across multiple high-potential crypto assets for balanced exposure.`
    },
    {
        question: "Who should invest with Saturn?",
        answer: "Saturn is ideal for retail investors, high-net-worth individuals (HNIs), and institutions looking to invest in crypto without active management or trading stress."
    },
    {
        question: "Is KYC required?",
        answer: "Yes. All users must complete basic “Know Your Customer (KYC)” verification to comply with regulations and ensure security."
    },
    {
        question: "What makes Saturn different?",
        answer: "Saturn provides professionally structured crypto exposure without the need to actively trade or manage assets. With options across different risk levels, secure onboarding, and clear performance tracking, it's a simple, powerful way to invest in the future of finance."
    }
];

export default function FAQ () {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number | null) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id='faq' className='pt-20 p-4 lg:p-20'>
            <div className='text-center mb-16'>
                <h2 className='font-bold text-6xl max-w-[33rem] mx-auto mb-5'>
                    Frequently Asked Questions
                </h2>
                <p className='max-w-[19rem] mx-auto text-2xl text-[#181818] mb-5'>
                    Got questions or feedback?
                </p>
                <button className="rounded-xl py-2 px-6 bg-[#1639CE] text-white">
                    Contact Us
                </button>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-10">
                {faqs.map((faq, index) => (
                    <div key={index} className="mb-4 border rounded-lg border-[#E7E7E7]">
                        <button
                            className="w-full flex justify-between items-center text-left p-4 font-bold text-2xl cursor-pointer"
                            onClick={() => toggle(index)}
                        >
                            {faq.question}
                            <ChevronDownIcon
                                className={`text-[#247EE9] w-5 h-5 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                            />
                        </button>
                        {openIndex === index && (
                            <div className="px-4 pb-4 text-xl whitespace-pre-line">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}
