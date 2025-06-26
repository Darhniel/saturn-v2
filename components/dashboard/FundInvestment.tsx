import { InvestmentDataFormProps } from "@/lib/types";
import { useState } from "react";
import { ChevronDownIcon, CopyIcon, ErrorIcon, MoneyIcon, SuccessIcon, WalletFundIcon } from "../saturn/SVG";

export function InvestmentFormOne({ data, onNext, setInvestmentData }: InvestmentDataFormProps) {
    const [localData, setLocalData] = useState({
        amount: data.amount || "",
        investment: data.investment || ""
    })

    const [errors, setErrors] = useState({
        amountError: false,
        investmentError: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        const newLocalData = {
            ...localData,
            [name]: value,
        };

        // Validate amount
        if (name === 'amount') {
            if (value === "" || /[a-z]/.test(value) || /[A-Z]/.test(value) || /[!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?]/.test(value)) {
                setErrors(prev => ({ ...prev, amountError: true }));
            } else {
                setErrors(prev => ({ ...prev, amountError: false }));
            }
        }

        // Validate investment
        if (name === 'investment') {
            if (value === "") {
                setErrors(prev => ({ ...prev, investmentError: true }))
            } else {
                setErrors(prev => ({ ...prev, investmentError: false }))
            }
        }

        setLocalData(newLocalData);
    };

    function complete() {
        if (errors.amountError || errors.investmentError || localData.amount === "" || localData.investment === "") {
            return true;
        }

        return false;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext(localData)
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0"
            onClick={() => setInvestmentData(prev => ({ ...prev, isFund: false }))}
        >
            <div
                className="bg-white rounded-2xl p-6 w-full max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem]"
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <MoneyIcon />
                </div>
                <h2 className="text-xl font-bold mb-2 text-center text-[#1C1B1F]">Fund Investment</h2>
                <p className="text-[#8C8B90] mb-4 text-center text-sm">
                    Add funds to grow your investment and maximize your returns.
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="investment"
                            className="block text-sm font-medium text-[#1F1E22] mb-2"
                        >
                            Investment to Add Funds
                        </label>
                        <div className='relative w-full'>
                            <select
                                className="appearance-none w-full p-3 border border-[#D9D9D9] bg-white text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-purple mb-2 cursor-pointer"
                                name='investment'
                                value={localData.investment}
                                onChange={handleChange}
                            >
                                <option value="">Select an Investment</option>
                                <option value="Bitcoin Trust Fund" className='text-[#7C7C7A]'>
                                    Bitcoin Trust Fund
                                </option>
                                <option value="Varied Asset Fund" className='text-[#7C7C7A]'>
                                    Varied Asset Fund
                                </option>
                                <option value="Specialized AI Fund" className="text-[#7C7C7A]">
                                    Specialized AI Fund
                                </option>
                            </select>

                            <div className="absolute top-[45%] right-3 -translate-y-1/2 pointer-events-none cursor-pointer">
                                <ChevronDownIcon />
                            </div>
                        </div>

                        {errors.investmentError &&
                            <div className='flex gap-1 items-center'>
                                <ErrorIcon />
                                <span className="text-sm text-[#D02A2A] font-medium">
                                    Please select a valid investment
                                </span>
                            </div>
                        }
                    </div>
                    <div>
                        <label
                            htmlFor="amount"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Amount to Invest
                        </label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={localData.amount}
                            onChange={handleChange}
                            placeholder="Enter Amount"
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-purple focus:border-purple"
                        />
                        {errors.amountError &&
                            <div className='flex gap-1 items-center'>
                                <ErrorIcon />
                                <span className="text-sm text-[#D02A2A] font-medium">
                                    Please enter a valid investment amount
                                </span>
                            </div>
                        }
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 ${complete() ? "bg-[#D9D9D9]" : "bg-purple"} text-white rounded-md hover:bg-purple-700`}
                        disabled={complete()}
                    >
                        Proceed
                    </button>
                </form>
            </div>
        </div>
    )
};

export function InvestmentFormTwo({ data, onNext, setInvestmentData }: InvestmentDataFormProps) {
    const [localData, setLocalData] = useState({
        amount: data.amount,
        investment: data.investment,
        payment: data.payment || ""
    })

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onNext(localData)
        console.log(localData)
    };

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        const newLocalData = {
            ...localData,
            [name]: value
        };

        if (name === "investment") {
            if (value === "") {

            }
        }

        setLocalData(newLocalData)
    }

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0"
            onClick={() => setInvestmentData(prev => ({ ...prev, isFund: false }))}
        >
            <div
                className="bg-white rounded-2xl p-6 w-full max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem]"
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <MoneyIcon />
                </div>
                <h2 className="text-2xl font-bold text-center">Select Payment Method</h2>
                <p className="mt-2 text-gray-600 text-center">
                    Choose your preferred payment method to complete the transaction securely.
                </p>

                <form onSubmit={handleSubmit} className="mt-6">
                    <label className={`w-full flex items-center mb-4 cursor-pointer rounded-xl border p-4 ${localData.payment === "Bank Transfer" ? "border-[#AE6EFF] bg-[#F3E9FF]" : "border-[#EBEBEB]"}`}>
                        <div className="relative">
                            <input
                                type="radio"
                                id="bankTransfer"
                                name="payment"
                                value="Bank Transfer"
                                className="peer mb-3 block h-5 w-5 cursor-pointer appearance-none opacity-0 border-gray-300 focus:ring-purple"
                                checked={localData.payment === "Bank Transfer"}
                                onChange={handleChange}
                            />
                            <div className="absolute top-1 h-5 w-5 rounded-full border border-[#D0D5DD] transition-all peer-checked:border-purple"></div>
                            <div className="absolute left-1 top-2 h-3 w-3 rounded-full peer-checked:block peer-checked:bg-purple"></div>
                        </div>
                        <span className={`text-base ml-4 ${localData.payment === "Bank Transfer" ? "font-semibold text-purple" : "text-gray-800"}`}>
                            Bank Transfer
                        </span>
                    </label>

                    <label className={`w-full flex items-center mb-4 cursor-pointer rounded-xl border p-4 ${localData.payment === "crypto" ? "border-[#AE6EFF] bg-[#F3E9FF]" : "border-[#EBEBEB]"}`}>
                        <div className="relative">
                            <input
                                type="radio"
                                id="crypto"
                                name="payment"
                                value="Cryptocurrency"
                                className="peer mb-3 block h-5 w-5 cursor-pointer appearance-none opacity-0 border-gray-300 focus:ring-purple"
                                checked={localData.payment === "crypto"}
                                onChange={handleChange}
                            />
                            <div className="absolute top-1 h-5 w-5 rounded-full border border-[#D0D5DD] transition-all peer-checked:border-purple"></div>
                            <div className="absolute left-1 top-2 h-3 w-3 rounded-full peer-checked:block peer-checked:bg-purple"></div>
                        </div>
                        <span className={`text-base ml-4 ${localData.payment === "crypto" ? "font-semibold text-purple" : "text-gray-800"}`}>
                            Cryptocurrency
                        </span>
                    </label>

                    <button
                        type="submit"
                        className={`w-full py-2 px-4 ${localData.payment === "oldUser" ? "bg-gray-400" : "bg-purple"} text-white rounded hover:bg-purple-700 transition-colors`}
                        disabled={localData.payment === ""}
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
            <span className="font-medium">{label}</span>
            <span className="flex gap-2 items-center">
                {value}
                {
                    icon && <CopyIcon />
                }
            </span>
        </div>
    );
};

export function InvestmentFormThree({ data, onNext, setInvestmentData }: InvestmentDataFormProps) {
    const newBalance = "Adah Jonathan";
    const maturityDate = "20-07-2026";
    const expectedReturns = 250;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0 overflow-y-scroll"
            onClick={() => setInvestmentData(prev => ({ ...prev, isFund: false }))}
        >
            <div
                className="w-full max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem] bg-white rounded-xl shadow-md p-6 mt-32 mb-4"
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <WalletFundIcon />
                </div>


                <h1 className="text-xl font-bold text-center text-[#1C1B1F]">
                    Review Top Up Details
                </h1>
                <p className="text-sm text-center text-[#8C8B90] mt-2">
                    Double-check your top-up amount and payment details before proceeding.
                </p>

                <div className="text-center mt-6">
                    <p className="text-[#8C8B90] text-xs">Total Amount Invested</p>
                    <p className="text-2xl font-bold text-[#1C1B1F] mt-1">
                        ${data.amount.toLocaleString()}
                    </p>
                </div>

                <div className="border border-[#E7E7E7] bg-[#FBFBFB] rounded-xl py-5 px-3 mt-6 space-y-2">
                    <DetailRow label="Investment Name" value={data.investment} icon={false} />
                    <DetailRow label="Current Balance" value={`$${data.amount.toLocaleString()}`} icon={false} />
                    <DetailRow label="New Balance" value={newBalance} icon={false} />
                    <DetailRow label="Maturity Date" value={maturityDate} icon={false} />
                    <DetailRow label="Expected Returns" value={`$${expectedReturns}`} icon={false} />
                    <DetailRow label="Payment Method" value={data.payment} icon={false} />
                </div>

                <div className="bg-[#D9BCFF] rounded-xl p-3 mt-5 text-sm text-[#5F1CB5]">
                    <p>
                        <strong>Note:</strong> Your new balance and expected returns will be
                        updated after successful payment.
                    </p>
                </div>

                <button
                    className="mt-12 w-full py-3 rounded-xl bg-purple text-white font-semibold transition-colors"
                    onClick={() => onNext(data)}
                >
                    Proceed to Top Up
                </button>
            </div>
        </div>
    )
};

export function InvestmentFormFour({ data, onNext, setInvestmentData }: InvestmentDataFormProps) {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0"
            onClick={() => setInvestmentData(prev => ({ ...prev, isFund: false }))}
        >
            <div
                className="w-full max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem] bg-white rounded-xl shadow-md p-6"
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <WalletFundIcon />
                </div>


                <h1 className="text-xl font-bold text-center text-[#1C1B1F]">
                    Top Up Account
                </h1>
                <p className="text-sm text-center text-[#8C8B90] mt-2">
                    Below is the account details to make your payment.
                </p>

                <div className="text-center mt-6">
                    <p className="text-[#8C8B90] text-xs">Total Amount Invested</p>
                    <p className="text-2xl font-bold text-[#1C1B1F] mt-1">
                        ${data.amount.toLocaleString()}
                    </p>
                </div>

                <div className="border border-[#E7E7E7] bg-[#FBFBFB] rounded-xl py-5 px-3 mt-6">
                    <DetailRow label="Bank Name" value={"Zenith Bank"} icon={false} />
                    <DetailRow label="Account Name" value={`Saturn Investment Venture`} icon={false} />
                    <DetailRow label="Account Number" value={"0123456789"} icon={true} />
                </div>

                <button
                    className="mt-12 w-full py-3 rounded-xl bg-purple text-white font-semibold transition-colors"
                    onClick={() => onNext(data)}
                >
                    I&apos;ve done the Transfer
                </button>
            </div>
        </div>
    )
};

export function InvestmentFormFive({ setFundStep, setInvestmentData }: InvestmentDataFormProps) {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0"
            onClick={() => { setInvestmentData(prev => ({ ...prev, amount: "", investment: "", isFund: false, payment: "" })); setFundStep(1) }}
        >
            <div
                className="w-full max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem] bg-white rounded-xl shadow-md p-6"
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <SuccessIcon />
                </div>

                <h2 className="font-bold text-xl text-center text-[#1C1B1F]">
                    Investment Activated Successfully
                </h2>
                <p className="text-sm text-center text-[#8C8B90] mt-2">
                    Your funds have been received, and your investment plan is now active. Track your returns and performance on your dashboard.
                </p>
                <button
                    className="mt-12 w-full py-3 rounded-xl bg-purple text-white font-semibold transition-colors"
                    onClick={() => { setInvestmentData(prev => ({ ...prev, amount: "", investment: "", isFund: false, payment: "" })); setFundStep(1) }}
                >
                    Track Investment
                </button>
            </div>
        </div>
    )
};