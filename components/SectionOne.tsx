import React from 'react'

export default function SectionOne() {
    return (
        <section className='py-20 px-4 lg:p-20'>
            <div className="mb-10">
                <h5 className='uppercase mb-8 text-[#0033CC] font-bold text-xl'>
                    why saturn
                </h5>
                <p className='text-4xl text-[#080808]'>
                    At Saturn, we simplify smart investing.  we offer seamless access to three expertly managed funds—Bitcoin Trust, Varied Assets, and Specialized AI—each tailored to different risk profiles and financial goals
                </p>
            </div>

            <div className="flex gap-2 flex-col lg:flex-row text-[#080808]">
                <div className='rounded-lg p-px custom-border'>
                    <div className='px-4 py-3 bg-white rounded-lg'>
                        <h3 className="text-[#080808] text-center text-4xl font-semibold mb-3">
                            3
                        </h3>
                        <p className="text-[#080808] text-center text-xl capitalize">
                            Funds available
                        </p>
                    </div>
                </div>
                <div className='rounded-lg p-px custom-border'>
                    <div className='px-4 py-3 bg-white rounded-lg'>
                        <h3 className="text-[#080808] text-center text-4xl font-semibold mb-3">
                            $1.6M
                        </h3>
                        <p className="text-[#080808] text-center text-xl capitalize">
                            Assets managed
                        </p>
                    </div>
                </div>
                <div className='rounded-lg p-px custom-border'>
                    <div className='px-4 py-3 bg-white rounded-lg'>
                        <h3 className="text-[#080808] text-center text-4xl font-semibold mb-3">
                            48%
                        </h3>
                        <p className="text-[#080808] text-center text-xl capitalize">
                            Net Promoter Score (NPS)
                        </p>
                    </div>
                </div>
                <div className='rounded-lg p-px custom-border'>
                    <div className='px-4 py-3 bg-white rounded-lg'>
                        <h3 className="text-[#080808] text-center text-4xl font-semibold mb-3">
                            20X
                        </h3>
                        <p className="text-[#080808] text-center text-xl capitalize">
                            20X growth in two years
                        </p>
                    </div>
                </div>
                <div className='rounded-lg p-px custom-border'>
                    <div className='px-4 py-3 bg-white rounded-lg'>
                        <h3 className="text-[#080808] text-center text-4xl font-semibold mb-3">
                            +$5M
                        </h3>
                        <p className="text-[#080808] text-center text-xl capitalize">
                            Trading volume of over
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
