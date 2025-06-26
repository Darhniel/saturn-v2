import { WithdrawalFormProps } from "@/lib/types";
import { BankIcon, BitcoinIcon, CopyIcon, ErrorIcon, MoneyIcon, SuccessIcon, TetherIcon } from "../saturn/SVG";
import Link from "next/link";
import { useState } from "react";

export function WithdrawalFormOne({ data, onNext, setWithdrawalData }: WithdrawalFormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);
        onNext(data)
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0 overflow-y-scroll"
            onClick={() => setWithdrawalData({ ...data, isWithdrawal: false })}
        >
            <div
                className="w-full mx-auto max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem] p-4 bg-white rounded-lg shadow"
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <MoneyIcon />
                </div>
                <h2 className="text-2xl font-bold text-center">
                    Select Plan to Withdraw From
                </h2>
                <p className="mt-2 text-gray-600 text-center">
                    Choose the specific investment plan from which you want to withdraw returns.
                </p>

                <form onSubmit={handleSubmit} className="mt-6">
                    <label className={`w-full flex items-center mb-4 cursor-pointer rounded-xl border p-4 ${data.investmentPlan === "Bitcoin Funds" ? "border-[#AE6EFF] bg-[#F3E9FF]" : "border-[#EBEBEB]"}`}>
                        <div className="relative">
                            <input
                                type="radio"
                                name="investmentPlan"
                                value="Bitcoin Funds"
                                className="peer mb-3 block h-5 w-5 cursor-pointer appearance-none opacity-0 border-gray-300 focus:ring-purple"
                                checked={data.investmentPlan === "Bitcoin Funds"}
                                onChange={() => setWithdrawalData({ ...data, investmentPlan: 'Bitcoin Funds' })}
                            />
                            <div className="absolute top-1 h-5 w-5 rounded-full border border-[#D0D5DD] transition-all peer-checked:border-purple"></div>
                            <div className="absolute left-1 top-2 h-3 w-3 rounded-full peer-checked:block peer-checked:bg-purple"></div>
                        </div>
                        <div className={`text-base ml-4 w-full flex justify-between ${data.investmentPlan === "Bitcoin Funds" ? " text-purple" : "text-gray-800"}`}>
                            <div>
                                Bitcoin Funds
                            </div>
                            <div>
                                $200,000
                            </div>
                        </div>
                    </label>

                    <label className={`w-full flex items-center mb-4 cursor-pointer rounded-xl border p-4 ${data.investmentPlan === "Varied Assets Funds" ? "border-[#AE6EFF] bg-[#F3E9FF]" : "border-[#EBEBEB]"}`}>
                        <div className="relative">
                            <input
                                type="radio"
                                name="investmentPlan"
                                value="Varied Assets Funds"
                                className="peer mb-3 block h-5 w-5 cursor-pointer appearance-none opacity-0 border-gray-300 focus:ring-purple"
                                checked={data.investmentPlan === "Varied Assets Funds"}
                                onChange={() => setWithdrawalData({ ...data, investmentPlan: 'Varied Assets Funds' })}
                            />
                            <div className="absolute top-1 h-5 w-5 rounded-full border border-[#D0D5DD] transition-all peer-checked:border-purple"></div>
                            <div className="absolute left-1 top-2 h-3 w-3 rounded-full peer-checked:block peer-checked:bg-purple"></div>
                        </div>
                        <div className={`text-base ml-4 w-full flex justify-between ${data.investmentPlan === "Varied Assets Funds" ? " text-purple" : "text-gray-800"}`}>
                            <div>Varied Assets Funds</div>
                            <div>$200,000</div>
                        </div>
                    </label>

                    <label className={`w-full flex items-center mb-4 cursor-pointer rounded-xl border p-4 ${data.investmentPlan === "Specialized AI Funds" ? "border-[#AE6EFF] bg-[#F3E9FF]" : "border-[#EBEBEB]"}`}>
                        <div className="relative">
                            <input
                                type="radio"
                                name="investmentPlan"
                                value="Specialized AI Funds"
                                className="peer mb-3 block h-5 w-5 cursor-pointer appearance-none opacity-0 border-gray-300 focus:ring-purple"
                                checked={data.investmentPlan === "Specialized AI Funds"}
                                onChange={() => setWithdrawalData({ ...data, investmentPlan: 'Specialized AI Funds' })}
                            />
                            <div className="absolute top-1 h-5 w-5 rounded-full border border-[#D0D5DD] transition-all peer-checked:border-purple"></div>
                            <div className="absolute left-1 top-2 h-3 w-3 rounded-full peer-checked:block peer-checked:bg-purple"></div>
                        </div>
                        <div className={`text-base ml-4 w-full flex justify-between ${data.investmentPlan === "Specialized AI Funds" ? " text-purple" : "text-gray-800"}`}>
                            <div>Specialized AI Funds</div>
                            <div>$200,000</div>
                        </div>
                    </label>

                    <button
                        type="submit"
                        className={`w-full py-2 px-4 ${data.investmentPlan === "" ? "bg-gray-400" : "bg-purple"} text-white rounded hover:bg-purple-700 transition-colors`}
                        disabled={data.investmentPlan === ""}
                    >
                        Proceed
                    </button>
                </form>
            </div>
        </div>
    )
}

export function WithdrawalFormTwo({ data, onNext, setWithdrawalData }: WithdrawalFormProps) {
    const [errors, setErrors] = useState({
        amountError: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Validate amount
        if (name === 'withdrawalAmount') {
            if (value === "" || /[a-z]/.test(value) || /[A-Z]/.test(value) || /[!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?]/.test(value)) {
                setErrors(prev => ({ ...prev, amountError: true }));
            } else {
                setErrors(prev => ({ ...prev, amountError: false }));
            }
        }

        setWithdrawalData({ ...data, [name]: value });
    };

    function complete() {
        if (errors.amountError || data.withdrawalAmount === "") {
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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0"
            onClick={() => setWithdrawalData(prev => ({ ...prev, isWithdrawal: false }))}
        >
            <div
                className="bg-white rounded-2xl p-6 w-full mx-auto max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem]"
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <MoneyIcon />
                </div>
                <h2 className="text-xl font-bold mb-2 text-center text-[#1C1B1F]">
                    Enter Withdrawal Amount
                </h2>
                <p className="text-[#8C8B90] mb-4 text-center text-sm">
                    Specify the amount you wish to withdraw from your available returns. Ensure the amount is within your eligible balance.
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="amount"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Withdrawal Amount
                        </label>
                        <input
                            type="number"
                            name="withdrawalAmount"
                            value={data.withdrawalAmount}
                            onChange={handleChange}
                            placeholder="Enter Amount"
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        />
                        {errors.amountError &&
                            <div className='flex gap-1 items-center'>
                                <ErrorIcon />
                                <span className="text-sm text-[#D02A2A] font-medium">
                                    Please enter a valid withdrawal amount
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
}

export function WithdrawalFormThree({ data, onNext, setWithdrawalData }: WithdrawalFormProps) {
    const [activeTab, setActiveTab] = useState("banks");

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext(data)
    };

    return (
        <>

            <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0 overflow-y-scroll"
                onClick={() => setWithdrawalData({ ...data, isWithdrawal: false })}
            >
                <div
                    className="bg-white rounded-2xl p-6 px-10 w-full mx-auto max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem] mt-32 mb-4"
                    onClick={(e) => { e.stopPropagation() }}
                >
                    <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                        <BankIcon />
                    </div>

                    <h1 className="text-xl font-bold mb-2 text-center text-[#1C1B1F]">
                        Select Withdrawal Destination
                    </h1>
                    <p className="text-[#8C8B90] mb-4 text-center text-sm">
                        Choose the bank account where you want to receive your payout securely.
                    </p>

                    <div className="flex justify-around items-center space-x-2 mt-6 bg-[#FEE9F3] py-1 border border-[#FDBBD9] rounded-lg">
                        <button
                            onClick={() => handleTabChange("banks")}
                            className={`px-4 py-2 text-sm font-medium rounded-lg
                    ${activeTab === "banks"
                                    ? "bg-white border border-[#FFDDED] text-[#E12279]"
                                    : "text-[#FA6DAD]"
                                }`}
                        >
                            Nigerian Banks
                        </button>
                        <button
                            onClick={() => handleTabChange("wallet")}
                            className={`px-4 py-2 text-sm font-medium rounded-lg
                    ${activeTab === "wallet"
                                    ? "bg-white border border-[#FFDDED] text-[#E12279]"
                                    : "text-[#FA6DAD]"
                                }`}
                        >
                            Wallet Address
                        </button>
                    </div>

                    {activeTab === "banks" ? (
                        <div className="mt-6 text-left space-y-4">
                            <div
                                className="relative border border-purple rounded-xl p-4 bg-[#F3E9FF]"
                                onClick={() => setWithdrawalData({ ...data, bankName: "Opay", accountName: "John Doe", accountNumber: "8045021299" })}
                            >
                                <div className="font-semibold text-[#101928]">John Doe</div>
                                <div className="text-sm text-[#667185]">Opay • 8045021299</div>
                                {/* Default Label */}
                                <div className="absolute top-[-0.7rem] right-2 bg-[#F72585] text-white text-xs px-2 py-1 rounded-md">
                                    Default
                                </div>
                            </div>

                            <div
                                className="border border-gray-200 rounded-xl p-4"
                                onClick={() => setWithdrawalData({ ...data, bankName: "Kuda Bank", accountName: "John Doe", accountNumber: "1159426194" })}
                            >
                                <div className="font-semibold text-[#101928]">John Doe</div>
                                <div className="text-sm text-gray-500">Kuda Bank • 1159426194</div>
                            </div>

                            <div className="text-center">
                                <Link
                                    href={"/dashboard/withdrawal"} 
                                    className="text-purple font-medium hover:underline">
                                    + Add New Bank
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-6 text-left space-y-4">
                            <div className="relative border border-purple rounded-xl p-3 bg-[#F3E9FF] flex items-center">
                                <div className="p-3 w-fit mx-auto my-4 bg-[#F7931A] rounded-full">
                                    <BitcoinIcon />
                                </div>
                                <div className="overflow-wrap w-4/5">
                                    <div className="font-semibold text-[#101928]">
                                        1FTaXpGAZDaZ5h2BCSAJyeFjGivGB
                                    </div>
                                    <div className="text-sm text-[#667185]">
                                        Bitcoin
                                    </div>
                                </div>
                                <div className="absolute top-[-0.7rem] right-2 bg-[#F72585] text-white text-xs px-2 py-1 rounded-md">
                                    Default
                                </div>
                            </div>

                            <div className="border border-gray-200 rounded-xl p-3 flex items-center">
                                <div className="w-fit mx-auto my-4">
                                    <TetherIcon />
                                </div>
                                <div className="overflow-wrap w-4/5">
                                    <div className="font-semibold text-[#101928]">
                                        1FTaXpGAZDaZ5h2BCSAJyeFjGivGB
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        USDT
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <Link
                                    href={"/dashboard/withdrawal"} 
                                    className="text-purple font-medium hover:underline">
                                    + Add New Address
                                </Link>
                            </div>
                        </div>
                    )}

                    <button
                        className="mt-6 w-full py-3 rounded-xl bg-purple text-white font-semibold transition-colors"
                        onClick={() => handleSubmit}
                    >
                        Proceed
                    </button>
                </div>
            </div>
        </>
    );
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

export function WithdrawalFormFour({ data, onNext, setWithdrawalData }: WithdrawalFormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext(data)
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0"
            onClick={() => setWithdrawalData(prev => ({ ...prev, isWithdrawal: false }))}
        >
            <div
                className="w-full mx-auto max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem] bg-white rounded-2xl shadow-md p-6 text-center"
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="p-3 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <MoneyIcon />
                </div>

                <h1 className="text-xl font-bold text-gray-900">
                    Review Withdrawal Details
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Double-check your top-up amount and payment details before proceeding.
                </p>
                <p className="text-[#8C8B90] text-xs text-center">Amount to withdraw</p>
                <p className="font-bold text-center text-2xl">{`$${data.withdrawalAmount}`}</p>

                <div className="mt-6 border border-gray-200 rounded-xl p-4 space-y-2 text-left">
                    <DetailRow
                        label="Withdrawal Fee"
                        value={"₦1,500"}
                    />
                    <DetailRow
                        label="Amount to Receive"
                        value={`₦ ${data.withdrawalAmount}`}
                    />
                    <DetailRow
                        label="Withdrawal Method"
                        value={"Bank Transfer"}
                    />
                    <DetailRow label="Receiving Bank Name" value={data.bankName} />
                    <DetailRow label="Account Name" value={data.accountName} />
                    <DetailRow label="Account Number" value={data.accountNumber} />
                </div>

                <button
                    className="p-2 rounded-lg bg-purple text-white font-semibold w-full"
                    onClick={handleSubmit}
                >
                    Proceed to Withdraw
                </button>
            </div>
        </div>
    )
}

export function WithdrawalFormFive({ data, setWithdrawalData, setWithdrawalStep }: WithdrawalFormProps) {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0 overflow-y-scroll"
            onClick={() => setWithdrawalData({ ...data, isWithdrawal: false })}
        >
            <div
                className="text-center border-2 w-full mx-auto max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem] p-6 bg-white rounded-2xl shadow mb-4"
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-50 mx-auto mb-6">
                    <SuccessIcon />
                </div>
                <h2 className="text-xl font-bold mb-2 text-gray-800">
                    Withdrawal Successful 🎉
                </h2>
                <p className="text-gray-500 mb-10">
                    Your withdrawal request has been processed successfully. The funds will be credited to your selected bank account shortly.
                </p>

                <button
                    type="button"
                    className={`py-2 px-4 bg-white border border-[#D6D6D6] text-[#1C1B1F] rounded-md w-40`}
                    onClick={() => { setWithdrawalData({ ...data, isWithdrawal: false }); setWithdrawalStep(1) }}
                >
                    Close
                </button>
            </div>
        </div>
    )
}