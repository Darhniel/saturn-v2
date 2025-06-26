import { ReinvestFormProps } from "@/lib/types";
import { CopyIcon, ErrorIcon, MoneyIcon, SuccessIcon } from "../saturn/SVG";
import { useState } from "react";

// export function ReinvestFormOne({ data, onNext, setReinvestData }: ReinvestFormProps) {
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         onNext(data)
//     };
//     return (
//         <div
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0 overflow-y-scroll"
//             onClick={() => setReinvestData({ ...data, isReinvest: false })}
//         >
//             <div
//                 className="w-full mx-auto max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem] p-6 bg-white rounded-lg shadow"
//                 onClick={(e) => { e.stopPropagation() }}
//             >
//                 <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
//                     <MoneyIcon />
//                 </div>
//                 <h2 className="text-2xl font-bold text-center">
//                     Select Investment for Reinvestment
//                 </h2>
//                 <p className="mt-2 text-gray-600 text-center">
//                     Select the investment plan where you want to reinvest your returns for continued growth.
//                 </p>

//                 <form onSubmit={handleSubmit} className="mt-6">
//                     <label className={`w-full flex items-center mb-4 cursor-pointer rounded-xl border p-4 ${data.investmentPlan === "Bitcoin Funds" ? "border-[#AE6EFF] bg-[#F3E9FF]" : "border-[#EBEBEB]"}`}>
//                         <div className="relative">
//                             <input
//                                 type="radio"
//                                 name="investmentPlan"
//                                 value="Bitcoin Funds"
//                                 className="peer mb-3 block h-5 w-5 cursor-pointer appearance-none opacity-0 border-gray-300 focus:ring-purple"
//                                 checked={data.investmentPlan === "Bitcoin Funds"}
//                                 onChange={() => setReinvestData({ ...data, investmentPlan: 'Bitcoin Funds' })}
//                             />
//                             <div className="absolute top-1 h-5 w-5 rounded-full border border-[#D0D5DD] transition-all peer-checked:border-purple"></div>
//                             <div className="absolute left-1 top-2 h-3 w-3 rounded-full peer-checked:block peer-checked:bg-purple"></div>
//                         </div>
//                         <span className={`text-base ml-4 ${data.investmentPlan === "Bitcoin Funds" ? " text-purple" : "text-gray-800"}`}>
//                             Bitcoin Funds
//                         </span>
//                     </label>

//                     <label className={`w-full flex items-center mb-4 cursor-pointer rounded-xl border p-4 ${data.investmentPlan === "Varied Assets Funds" ? "border-[#AE6EFF] bg-[#F3E9FF]" : "border-[#EBEBEB]"}`}>
//                         <div className="relative">
//                             <input
//                                 type="radio"
//                                 name="investmentPlan"
//                                 value="Varied Assets Funds"
//                                 className="peer mb-3 block h-5 w-5 cursor-pointer appearance-none opacity-0 border-gray-300 focus:ring-purple"
//                                 checked={data.investmentPlan === "Varied Assets Funds"}
//                                 onChange={() => setReinvestData({ ...data, investmentPlan: 'Varied Assets Funds' })}
//                             />
//                             <div className="absolute top-1 h-5 w-5 rounded-full border border-[#D0D5DD] transition-all peer-checked:border-purple"></div>
//                             <div className="absolute left-1 top-2 h-3 w-3 rounded-full peer-checked:block peer-checked:bg-purple"></div>
//                         </div>
//                         <span className={`text-base ml-4 ${data.investmentPlan === "Varied Assets Funds" ? " text-purple" : "text-gray-800"}`}>
//                             Varied Assets Funds
//                         </span>
//                     </label>

//                     <label className={`w-full flex items-center mb-4 cursor-pointer rounded-xl border p-4 ${data.investmentPlan === "Specialized AI Funds" ? "border-[#AE6EFF] bg-[#F3E9FF]" : "border-[#EBEBEB]"}`}>
//                         <div className="relative">
//                             <input
//                                 type="radio"
//                                 name="investmentPlan"
//                                 value="Specialized AI Funds"
//                                 className="peer mb-3 block h-5 w-5 cursor-pointer appearance-none opacity-0 border-gray-300 focus:ring-purple"
//                                 checked={data.investmentPlan === "Specialized AI Funds"}
//                                 onChange={() => setReinvestData({ ...data, investmentPlan: 'Specialized AI Funds' })}
//                             />
//                             <div className="absolute top-1 h-5 w-5 rounded-full border border-[#D0D5DD] transition-all peer-checked:border-purple"></div>
//                             <div className="absolute left-1 top-2 h-3 w-3 rounded-full peer-checked:block peer-checked:bg-purple"></div>
//                         </div>
//                         <span className={`text-base ml-4 ${data.investmentPlan === "Specialized AI Funds" ? " text-purple" : "text-gray-800"}`}>
//                             Specialized AI Funds
//                         </span>
//                     </label>

//                     <button
//                         type="submit"
//                         className={`w-full py-2 px-4 ${data.investmentPlan === "" ? "bg-gray-400" : "bg-purple"} text-white rounded hover:bg-purple-700 transition-colors`}
//                         disabled={data.investmentPlan === ""}
//                     >
//                         Proceed
//                     </button>
//                 </form>
//             </div>
//         </div>
//     )
// };

export function ReinvestFormOne({ data, onNext, setReinvestData }: ReinvestFormProps) {
    const [errors, setErrors] = useState({
        amountError: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Validate amount
        if (name === 'investmentAmount') {
            if (value === "" || /[a-z]/.test(value) || /[A-Z]/.test(value) || /[!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?]/.test(value)) {
                setErrors(prev => ({ ...prev, amountError: true }));
            } else {
                setErrors(prev => ({ ...prev, amountError: false }));
            }
        }

        setReinvestData({ ...data, [name]: value });
    };

    function complete() {
        if (errors.amountError || data.investmentAmount === "") {
            return true;
        }

        return false;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext(data)
    };
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0 overflow-y-scroll"
            onClick={() => setReinvestData({ ...data, isReinvest: false })}
        >
            <div
                className="w-full mx-auto max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem] p-6 bg-white rounded-lg shadow  mt-24 mb-4"
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <MoneyIcon />
                </div>
                <h2 className="text-2xl font-bold text-center">
                    Top Up With Returns
                </h2>
                <p className="mt-2 text-gray-600 text-center">
                    Boost your investment by adding your earned returns and watch your wealth grow.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-[#F3E9FF] border border-[#D9BCFF] rounded-xl p-4 text-center">
                        <p className="text-sm font-bold text-[#1C1B1F] my-4 sm:my-2">$50,000</p>
                        <p className="text-xs text-[#8C8B90]">Current Investment</p>
                    </div>
                    <div className="bg-[#F3E9FF] border border-[#D9BCFF] rounded-xl p-4 text-center">
                        <p className="text-sm font-bold text-[#1C1B1F] my-2 sm:my-2">31st of Mar, 2025</p>
                        <p className="text-xs text-[#8C8B90]">Next Withdrawal Day</p>
                    </div>
                </div>

                <p className="text-[#8C8B90] font-semibold text-xs text-center mt-7">
                    Returns Amount
                </p>
                <p className="mt-1 font-bold text-2xl text-[#1C1B1F] text-center">
                    $50,000
                </p>

                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mb-6">
                        <label
                            htmlFor="investmentAmount"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Amount to Re-Invest
                        </label>
                        <input
                            type="number"
                            id="investmentAmount"
                            name="investmentAmount"
                            value={data.investmentAmount}
                            onChange={handleChange}
                            placeholder="Enter Amount"
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        />
                        {errors.amountError &&
                            <div className='flex gap-1 items-center mt-1'>
                                <ErrorIcon />
                                <span className="text-sm text-[#D02A2A] font-medium">
                                    Please enter a valid investment amount
                                </span>
                            </div>
                        }
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 px-4 ${complete() ? "bg-[#D9D9D9]" : "bg-purple"} text-white rounded-md`}
                        disabled={complete()}
                    >
                        Proceed
                    </button>
                </form>
            </div>
        </div>
    )
}

function DetailRow({ label, value, icon }: { label: string, value: string, icon?: boolean }) {
    return (
        <div className="flex justify-between text-sm text-black mb-4">
            <span className="">{label}</span>
            <span className={`flex gap-2 items-center ${label === "Transaction ID" ? "font-bold text-purple text-base" : "font-semibold"}`}>
                {value}
                {
                    icon && <CopyIcon />
                }
            </span>
        </div>
    );
}

export function ReinvestFormTwo({ data, onNext, setReinvestData }: ReinvestFormProps) {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0 overflow-y-scroll"
            onClick={() => setReinvestData({ ...data, isReinvest: false })}
        >
            <div
                className="w-full mx-auto max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem] p-6 bg-white rounded-lg shadow  mt-24 mb-4"
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <MoneyIcon />
                </div>
                <h2 className="text-2xl font-bold text-center">
                    Review Top Up Details
                </h2>
                <p className="mt-2 text-gray-600 text-center">
                    Double-check your top-up amount and payment details before proceeding.
                </p>

                <p className="text-[#8C8B90] font-semibold text-xs text-center mt-7">
                    Total Amount Invested
                </p>
                <p className="mt-1 font-bold text-2xl text-[#1C1B1F] text-center">
                    $50,000
                </p>

                <div className="border border-gray-200 rounded-xl p-4 mt-6 space-y-2 text-left">
                    <DetailRow label="Investment Name" value={data.investmentPlan} />
                    <DetailRow label="Current Balance" value="$50,000" />
                    <DetailRow label="Reinvested Amount" value={`$${data.investmentAmount}`} />
                    <DetailRow label="New Balance(After Top Up)" value={"$50,000"} />
                    <DetailRow label="Maturity Date" value="20-07-2026" />
                    <DetailRow label="New Expected Returns" value="$250" />
                </div>

                <div className="p-3 rounded-lg bg-[#F3E9FF] border border-[#D9BCFF] mt-5">
                    <p className="text-[#5F1CB5] text-sm font-semibold">
                        Note: Your new balance and expected returns will be updated after successful payment.
                    </p>
                </div>

                <button
                    type="button"
                    className={`w-full py-2 px-4 bg-purple text-white rounded-md mt-12`}
                    onClick={() => onNext(data)}
                >
                    Proceed to Top Up
                </button>
            </div>
        </div>
    )
}

export function ReinvestFormThree({ data, setReinvestData, setReinvestStep }: ReinvestFormProps) {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0 overflow-y-scroll"
            onClick={() => setReinvestData({ ...data, isReinvest: false })}
        >
            <div
                className="text-center border-2 w-full mx-auto max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem] p-6 bg-white rounded-2xl shadow mb-4"
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-50 mx-auto mb-6">
                    <SuccessIcon />
                </div>
                <h2 className="text-xl font-bold mb-2 text-gray-800">
                    Top Up Successful
                </h2>
                <p className="text-gray-500 mb-10">
                    Your reinvestment has been successfully processed. Your new balance and expected returns have been updated. Keep growing your investment!
                </p>

                <button
                    type="button"
                    className={`py-2 px-4 bg-white border border-[#D6D6D6] text-[#1C1B1F] rounded-md w-40`}
                    onClick={() => {setReinvestData({ isReinvest: false, investmentPlan: "", investmentAmount: "" }); setReinvestStep(1) } }
                >
                    Close
                </button>
            </div>
        </div>
    )
}