import { RequestDataFormProps } from "@/lib/types";
import { useRef, useState } from "react";
import { BankIcon, BitcoinIcon, ChevronDownIcon, CopyIcon, ErrorIcon, MailIcon, SuccessIcon, TetherIcon, WalletFundIcon } from "../saturn/SVG";
import Image from 'next/image';
import Link from 'next/link'

export function RequestFormOne({ data, onNext, setRequestData }: RequestDataFormProps) {
    const [localData, setLocalData] = useState({
        amount: data.amount || "",
        investment: data.investment || "",
        penalty: data.penalty || "",
    });
    const [errors, setErrors] = useState({
        amountError: false,
        investmentError: false,
        penaltyError: false
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
        if (errors.amountError || errors.investmentError || errors.penaltyError || localData.amount === "" || localData.investment === "" || localData.penalty === "") {
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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0 overflow-y-scroll"
            onClick={() => setRequestData(prev => ({ ...prev, isRequest: false }))}
        >
            <div
                className="bg-white rounded-2xl p-6 mx-auto mt-32 mb-4 max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem] w-full"
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <WalletFundIcon fill={"#8627FF"} />
                </div>
                <h2 className="text-xl font-bold mb-2 text-center text-[#1C1B1F]">Request Payout</h2>
                <p className="text-[#8C8B90] mb-4 text-center text-sm">
                    Withdraw your investment earnings seamlessly.
                    <br />
                    Early withdrawals may incur a penalty.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-[#F3E9FF] border border-[#D9BCFF] rounded-xl p-4 text-center">
                        <p className="text-base font-bold text-[#1C1B1F] my-4">$50,000</p>
                        <p className="text-xs text-[#8C8B90]">Total Amount Invested</p>
                    </div>
                    <div className="bg-[#F3E9FF] border border-[#D9BCFF] rounded-xl p-4 text-center">
                        <p className="text-base font-bold text-[#1C1B1F] my-2">31st of Mar, 2025</p>
                        <p className="text-xs text-[#8C8B90]">Next Withdrawal Day</p>
                    </div>
                </div>

                <form className="mt-4" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label
                            htmlFor="amount"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Amount to Withdraw (Minimum is $500)
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
                                    Please enter a valid withdarwal amount
                                </span>
                            </div>
                        }
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="investment"
                            className="block text-sm font-medium text-[#1F1E22] mb-2"
                        >
                            Investment to withdraw from
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

                    <div className="mb-6">
                        <label
                            htmlFor="investment"
                            className="block text-sm font-medium text-[#1F1E22] mb-2"
                        >
                            Where do you want to be charged the 2.5% penalty fee?
                        </label>
                        <div className='relative w-full'>
                            <select
                                className="appearance-none w-full p-3 border border-[#D9D9D9] bg-white text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-purple mb-2 cursor-pointer"
                                name='penalty'
                                value={localData.penalty}
                                onChange={handleChange}
                            >
                                <option value="">Select an Investment</option>
                                <option value="From Wallet Balance" className='text-[#7C7C7A]'>
                                    From Wallet Balance
                                </option>
                                <option value="From Amount Withdrawn" className='text-[#7C7C7A]'>
                                    From Amount Withdrawn
                                </option>
                            </select>

                            <div className="absolute top-[45%] right-3 -translate-y-1/2 pointer-events-none cursor-pointer">
                                <ChevronDownIcon />
                            </div>
                        </div>

                        {errors.penaltyError &&
                            <div className='flex gap-1 items-center'>
                                <ErrorIcon />
                                <span className="text-sm text-[#D02A2A] font-medium">
                                    Please select a balance
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

export function RequestFormTwo({ data, onNext, setRequestData }: RequestDataFormProps) {
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
                onClick={() => setRequestData(prev => ({ ...prev, isRequest: false }))}
            >
                <div
                    className="bg-white rounded-2xl p-6 px-10 w-full mx-auto max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem] mt-32 mb-4"
                    onClick={(e) => { e.stopPropagation() }}
                >
                    <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                        <BankIcon />
                    </div>

                    <h1 className="text-xl font-bold mb-2 text-center text-[#1C1B1F]">
                        Select Payout Destination
                    </h1>
                    <p className="text-[#8C8B90] mb-4 text-center text-sm">
                        Choose the bank account where you want to receive your payout securely.
                    </p>

                    <div className="flex justify-around items-center space-x-2 mt-6 bg-[#FEE9F3] p-1 border border-[#FDBBD9] rounded-lg">
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

                    {/* Content Section */}
                    {activeTab === "banks" ? (
                        <div className="mt-6 text-left space-y-4">
                            <div className="relative border border-purple rounded-xl p-4 bg-[#F3E9FF]">
                                <div className="font-semibold text-[#101928]">John Doe</div>
                                <div className="text-sm text-[#667185]">Opay • 8045021299</div>
                                {/* Default Label */}
                                <div className="absolute top-[-0.7rem] right-2 bg-[#F72585] text-white text-xs px-2 py-1 rounded-md">
                                    Default
                                </div>
                            </div>

                            <div className="border border-gray-200 rounded-xl p-4">
                                <div className="font-semibold text-[#101928]">John Doe</div>
                                <div className="text-sm text-gray-500">Kuda Bank • 1159426194</div>
                            </div>

                            <div className="text-center">
                                <Link
                                    href="/dashboard/withdrawal"
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
                        onClick={handleSubmit}
                    >
                        Proceed
                    </button>
                </div>
            </div>
        </>
    );
}

export function RequestFormThree({ data, onNext, setRequestData, setReqStep }: RequestDataFormProps) {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [isOtp, setIsOtp] = useState(false);
    function onProceed() {
        setIsOtp(true);
    }
    // const isOtp = false;
    // const [localData, setLocalData] = useState({
    //     amount: data.amount || "",
    //     investment: data.investment || "",
    //     penalty: data.penalty || "",
    // });
    // const [errors, setErrors] = useState({
    //     amountError: false,
    //     investmentError: false,
    //     penaltyError: false
    // });

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    //     const { name, value } = e.target;

    //     const newLocalData = {
    //         ...localData,
    //         [name]: value,
    //     };

    //     // Validate amount
    //     if (name === 'amount') {
    //         if (value === "" || /[a-z]/.test(value) || /[A-Z]/.test(value) || /[!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?]/.test(value)) {
    //             setErrors(prev => ({ ...prev, amountError: true }));
    //         } else {
    //             setErrors(prev => ({ ...prev, amountError: false }));
    //         }
    //     }

    //     // Validate investment
    //     if (name === 'investment') {
    //         if (value === "") {
    //             setErrors(prev => ({ ...prev, investmentError: true }))
    //         } else {
    //             setErrors(prev => ({ ...prev, investmentError: false }))
    //         }
    //     }

    //     setLocalData(newLocalData);
    // };

    const handleChange = (index: number, value: string) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    function complete() {
        if (otp.length === 6 && otp.every(val => /^\d$/.test(val))) {
            
            return true;
        } else {
            return false;
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onNext(data)
    }

    // function complete() {
    //     if (errors.amountError || errors.investmentError || errors.penaltyError || localData.amount === "" || localData.investment === "" || localData.penalty === "") {
    //         return true;
    //     }

    //     return false;
    // }

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     onNext(localData)
    // };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0"
            onClick={() => setRequestData(prev => ({ ...prev, isRequest: false }))}
        >
            <div
                className="bg-white rounded-2xl p-6 w-full mx-auto max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem]"
                onClick={(e) => { e.stopPropagation() }}
            >
                {
                    isOtp ?
                        <>
                            <div className="flex justify-center">
                                <div className="p-3 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                                    <MailIcon />
                                </div>
                            </div>
                            <h1 className="text-xl text-center font-bold text-[#1C1B1F]">OTP Sent to Your Email</h1>
                            <p className="text-sm text-[#8C8B90] text-center mt-1">
                                An OTP has been sent to your email. Please check your inbox and enter the code to proceed securely.
                            </p>

                            <div className="flex justify-center space-x-2 mt-6">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => { inputRefs.current[index] = el }}
                                        type="text"
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        maxLength={1}
                                        className="w-10 h-10 border border-gray-300 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple"
                                    />
                                ))}
                            </div>

                            {/* Buttons */}
                            <div className="grid grid-cols-2 gap-4 mt-10">
                                <button
                                    type="submit"
                                    className={`w-full py-2 px-4 text-purple bg-white rounded-md border border-purple`}
                                    onClick={() => { setRequestData(prev => ({ ...prev, isRequest: false })); setReqStep(1) }}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className={`w-full py-2 px-4  ${complete() ? "bg-purple" : "bg-[#D9D9D9]"} text-white rounded-md`}
                                    disabled={!complete()}
                                    onClick={handleSubmit}
                                >
                                    Yes, Proceed
                                </button>
                            </div>
                        </> :
                        <>
                            <div className="p-3 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                                <Image
                                    src={"/images/dashboard/icon.png"}
                                    width={20}
                                    height={20}
                                    alt="icon"
                                />
                            </div>
                            <h2 className="text-xl font-bold mb-2 text-center text-[#1C1B1F]">Early Payout Penalty</h2>
                            <p className="text-[#8C8B90] mb-4 text-center text-sm">
                                Payout before the maturity date will incur a 2.5% payout penalty fee. Are you sure want to proceed?
                            </p>

                            <div className="grid grid-cols-2 gap-4 mt-10">
                                <button
                                    type="submit"
                                    className={`w-full py-2 px-4 text-purple bg-white rounded-md border border-purple`}
                                    onClick={() => { setRequestData(prev => ({ ...prev, isRequest: false })); setReqStep(1) }}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className={`w-full py-2 px-4 bg-purple text-white rounded-md`}
                                    onClick={onProceed}
                                >
                                    Yes, Proceed
                                </button>
                            </div>
                        </>
                }

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

export function RequestFormFour({ data, onNext, setRequestData, setReqStep }: RequestDataFormProps) {
    const localData = {
        amount: data.amount || "",
        investment: data.investment || "",
        penalty: data.penalty || "",
    };
    // const [localData, setLocalData] = useState({
    //     amount: data.amount || "",
    //     investment: data.investment || "",
    //     penalty: data.penalty || "",
    // });

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0"
            onClick={() => setRequestData(prev => ({ ...prev, isRequest: false }))}
        >
            <div 
                className="w-full mx-auto max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem] bg-white rounded-2xl shadow-md p-6 text-center"
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="p-3 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <WalletFundIcon />
                </div>

                <h1 className="text-xl font-bold text-gray-900">
                    Review Your Payout Details
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Carefully check your payout amount, bank details, and applicable
                    fees before proceeding.
                </p>

                <div className="mt-6 border border-gray-200 rounded-xl p-4 space-y-2 text-left">
                    <DetailRow label="Payout Amount" value={localData.amount} />
                    <DetailRow label="Bank Name" value={"Access Bank"} />
                    <DetailRow label="Account Name" value={"Adah Jonathan"} />
                    <DetailRow label="Account Number" value={"0085600249"} icon={true} />
                    <DetailRow label="Penalty Fee" value={"$250"} />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center mt-6 gap-4">
                    <button
                        className="p2 rounded-lg border border-purple text-purple font-semibold w-44"
                        onClick={() => { setRequestData(prev => ({ ...prev, isRequest: false })); setReqStep(1) }}
                    >
                        Cancel
                    </button>
                    <button
                        className="p-2 rounded-lg bg-purple text-white font-semibold w-44"
                        onClick={() => onNext(data)}
                    >
                        Confirm Payout
                    </button>
                </div>
            </div>
        </div>
    )
}

export function RequestFormFive({ setRequestData, setReqStep }: RequestDataFormProps) {

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0"
            onClick={() => setRequestData(prev => ({ ...prev, isRequest: false }))}
        >
            <div 
                className="w-full mx-auto max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem] bg-white rounded-2xl shadow-md p-6 text-center"
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="p-3 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <SuccessIcon />
                </div>

                <h1 className="text-xl font-bold text-gray-900">
                    Payout Successful 🎉
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Your funds have been sent to the selected destination. Check your balance for confirmation.
                </p>

                <button
                    className="p-2 rounded-lg border border-[#D6D6D6] text-[#1C1B1F] font-semibold w-40 mt-6"
                    onClick={() => { setRequestData(prev => ({ ...prev, isRequest: false })); setReqStep(1) }}
                >
                    Close
                </button>
            </div>
        </div>
    )
}