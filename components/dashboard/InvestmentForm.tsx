import { InvestmentFormProps } from "@/lib/types";
import { BankIcon, ChevronDownIcon, ErrorIcon, SuccessIcon } from "../saturn/SVG";
import { useState } from "react";
import { CircleStackIcon } from "@heroicons/react/24/outline";
import Image from 'next/image';

export function InvestmentFormOne({ data, onNext, setInvestmentData }: InvestmentFormProps) {
    const [localData, setLocalData] = useState({
        withdrawalMethod: data.withdrawalMethod || ""
    })

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onNext(localData);
    };

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        const newLocalData = {
            ...localData,
            [name]: value
        };

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
                    <BankIcon />
                </div>
                <h2 className="text-2xl font-bold text-center">Select Withdrawal Method</h2>
                <p className="mt-2 text-gray-600 text-center text-sm">
                    Select your preferred payout option to proceed with your withdrawal to add.
                </p>

                <form onSubmit={handleSubmit} className="mt-6">
                    <label className={`w-full flex items-center mb-4 cursor-pointer rounded-xl border p-4 ${localData.withdrawalMethod === "Bank Transfer" ? "border-[#AE6EFF] bg-[#F3E9FF]" : "border-[#EBEBEB]"}`}>
                        <div className="relative">
                            <input
                                type="radio"
                                id="bankTransfer"
                                name="withdrawalMethod"
                                value="Bank Transfer"
                                className="peer mb-3 block h-5 w-5 cursor-pointer appearance-none opacity-0 border-gray-300 focus:ring-purple"
                                checked={localData.withdrawalMethod === "Bank Transfer"}
                                onChange={handleChange}
                            />
                            <div className="absolute top-1 h-5 w-5 rounded-full border border-[#D0D5DD] transition-all peer-checked:border-purple"></div>
                            <div className="absolute left-1 top-2 h-3 w-3 rounded-full peer-checked:block peer-checked:bg-purple"></div>
                        </div>
                        <span className={`text-base ml-4 ${localData.withdrawalMethod === "Bank Transfer" ? "font-semibold text-purple" : "text-gray-800"}`}>
                            Nigerian Banks
                        </span>
                    </label>

                    <label className={`w-full flex items-center mb-4 cursor-pointer rounded-xl border p-4 ${localData.withdrawalMethod === "Cryptocurrency" ? "border-[#AE6EFF] bg-[#F3E9FF]" : "border-[#EBEBEB]"}`}>
                        <div className="relative">
                            <input
                                type="radio"
                                id="crypto"
                                name="withdrawalMethod"
                                value="Cryptocurrency"
                                className="peer mb-3 block h-5 w-5 cursor-pointer appearance-none opacity-0 border-gray-300 focus:ring-purple"
                                checked={localData.withdrawalMethod === "Cryptocurrency"}
                                onChange={handleChange}
                            />
                            <div className="absolute top-1 h-5 w-5 rounded-full border border-[#D0D5DD] transition-all peer-checked:border-purple"></div>
                            <div className="absolute left-1 top-2 h-3 w-3 rounded-full peer-checked:block peer-checked:bg-purple"></div>
                        </div>
                        <span className={`text-base ml-4 ${localData.withdrawalMethod === "Cryptocurrency" ? "font-semibold text-purple" : "text-gray-800"}`}>
                            Wallet Address
                        </span>
                    </label>

                    <button
                        type="submit"
                        className={`w-full py-2 px-4 ${localData.withdrawalMethod === "" ? "bg-gray-400" : "bg-purple"} text-white rounded hover:bg-purple-700 transition-colors`}
                        disabled={localData.withdrawalMethod === ""}
                    >
                        Proceed
                    </button>
                </form>
            </div>
        </div>
    )
};

export function InvestmentFormTwo({ data, onNext, setInvestmentData }: InvestmentFormProps) {
    const [localData, setLocalData] = useState({
        bankName: data.bankName,
        accountNumber: data.accountNumber,
        bankCode: '001',
        cryptoType: data.cryptoType,
        networkType: data.networkType,
        walletAddress: data.walletAddress
    });

    const banks = [
        { name: 'Access Bank', image: "/images/saturn/access.svg" },
        { name: 'First Bank', image: "/images/saturn/first-bank.svg" },
        { name: 'Kuda', image: "/images/saturn/kuda.svg" },
        { name: 'Opay', image: "/images/saturn/opay.svg" },
    ]

    const cryptos = [
        { name: "USDT", image: "/images/dashboard/tether.svg" },
        { name: "BTC", image: "/images/dashboard/bitcoin.svg" },
        { name: "ETH", image: "/images/dashboard/ethereum.svg" },
        { name: "SOL", image: "/images/dashboard/solana.svg" },
    ]

    const networks = [
        { name: "Ethereum (ERC-20)" },
        { name: "Tron (TRC-20)" },
        { name: "Binance Smart Chain (BEP-20)" },
        { name: "Polygon (MATIC)" },
        { name: "Solana (SOL)" },
        { name: "Avalanche (AVAX C-Chain)" },
    ]

    const [isDropdownOpen, setIsDropdownOpen] = useState({
        bank: false,
        crypto: false,
        network: false
    });

    const handleBankSelect = (bankName: string) => {
        setLocalData(prev => ({ ...prev, bankName }));
        setErrors(prev => ({ ...prev, bankNameError: false }));
        setIsDropdownOpen({ bank: false, crypto: false, network: false });
    };

    const handleCryptoSelect = (cryptoType: string) => {
        setLocalData(prev => ({ ...prev, cryptoType }));
        setIsDropdownOpen({ bank: false, crypto: false, network: false });
    };

    const handleNetworkSelect = (networkType: string) => {
        setLocalData(prev => ({ ...prev, networkType }));
        setIsDropdownOpen({ bank: false, crypto: false, network: false });
    };



    const [errors, setErrors] = useState({
        accountNumberError: false,
        walletAddressError: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newLocalData = {
            ...localData,
            [name]: value,
        };

        if (name === 'accountNumber') {
            if (value === "" || /[a-z]/.test(value) || /[A-Z]/.test(value) || /[!@#$%^&*()_+\-=\[\]{};':"\\|.,<>\/?]/.test(value) || value.length < 10) {
                setErrors((prev) => ({ ...prev, accountNumberError: true }));
            } else {
                setErrors((prev) => ({ ...prev, accountNumberError: false }));
            }
        }

        setLocalData(newLocalData);
    }

    function complete() {
        if (data.withdrawalMethod === "Bank Transfer") {
            if (errors.accountNumberError || localData.bankName === "" || localData.accountNumber === "") {
                return true;
            }
        } else {
            if (errors.walletAddressError || localData.cryptoType === "" || localData.walletAddress === "" || localData.networkType === "") {
                return true;
            }
        }

        return false;
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onNext(localData);
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
                <div className="p-4 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full text-purple">
                    {data.withdrawalMethod === 'Bank Transfer' ? <BankIcon /> : <CircleStackIcon width={24} />}
                </div>
                <h2 className="text-2xl font-bold text-center mb-4">
                    {data.withdrawalMethod === 'Bank Transfer' ? "Add Bank Account" : "Add Your Crypto Wallet"}
                </h2>
                <p className="mt-2 text-gray-600 text-center text-sm mb-4">
                    {data.withdrawalMethod === 'Bank Transfer' ? "Fill in your bank account details for smooth and timely withdrawals." : "Enter your wallet details securely to enable crypto withdrawals without hassle."}
                </p>

                <form onSubmit={handleSubmit}>
                    {
                        data.withdrawalMethod === "Bank Transfer" ?
                            <>
                                <div className="mb-6">
                                    <label className="block text-base font-medium text-[#1F1E22] mb-2" htmlFor="bankName">
                                        Bank Name
                                    </label>

                                    <select
                                        name="bankName"
                                        value={localData.bankName}
                                        className="hidden"
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Bank</option>
                                        {banks.map(bank => (
                                            <option key={bank.name} value={bank.name}>
                                                {bank.name}
                                            </option>
                                        ))}
                                    </select>

                                    <div className='relative w-full'>
                                        <button
                                            type="button"
                                            className="w-full p-3 border border-[#D9D9D9] text-black rounded-xl flex items-center justify-between"
                                            onClick={() => setIsDropdownOpen(prev => ({ ...prev, bank: !prev.bank }))}
                                        >
                                            <div className="flex items-center gap-3">
                                                {localData.bankName ? (
                                                    <>
                                                        <Image
                                                            src={banks.find(b => b.name === localData.bankName)?.image || ''}
                                                            alt=""
                                                            width={24}
                                                            height={24}
                                                        />
                                                        <span>{localData.bankName}</span>
                                                    </>
                                                ) : (
                                                    <span className="text-[#7C7C7A]">Select Bank</span>
                                                )}
                                            </div>
                                            <ChevronDownIcon
                                                className={`lucide lucide-chevron-down transform transition-transform ${isDropdownOpen.bank ? 'rotate-180' : ''}`}
                                            />
                                        </button>

                                        {/* Dropdown options */}
                                        {isDropdownOpen.bank && (
                                            <div className="absolute w-full mt-2 bg-white border border-[#D9D9D9] rounded-xl shadow-lg z-10">
                                                {banks.map(bank => (
                                                    <div
                                                        key={bank.name}
                                                        className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => handleBankSelect(bank.name)}
                                                    >
                                                        <Image
                                                            src={bank.image}
                                                            alt=""
                                                            width={24}
                                                            height={24}
                                                        />
                                                        <span className="text-[#1F1E22]">{bank.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Account Number */}
                                <div className="mb-4">
                                    <label className="block text-base font-medium text-[#1F1E22] mb-2" htmlFor="accountNumber">
                                        Account Number
                                    </label>
                                    <input
                                        id="accountNumber"
                                        type="text"
                                        placeholder="Enter Amount Number"
                                        className="w-full p-3 border border-[#D9D9D9] text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-purple mb-2"
                                        name='accountNumber'
                                        value={localData.accountNumber}
                                        onChange={handleChange}
                                        maxLength={10}
                                    />
                                    {errors.accountNumberError &&
                                        <div className='flex gap-1 items-center'>
                                            <ErrorIcon />
                                            <span className="text-sm text-[#D02A2A] font-medium">
                                                Please enter a valid account number
                                            </span>
                                        </div>
                                    }
                                </div>

                                <div className={`${complete() ? "hidden" : "flex justify-end gap-1 mb-2"}`}>
                                    <p>
                                        {data.withdrawalMethod === "Bank Transfer" && "JOHN DOE"}
                                    </p>
                                </div>
                            </>
                            :
                            <>
                                <div className="mb-6">
                                    <label className="block text-base font-medium text-[#1F1E22] mb-2" htmlFor="bankName">
                                        Cryptocurrency Type
                                    </label>

                                    <select
                                        name="cryptoType"
                                        value={localData.cryptoType}
                                        className="hidden"
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Bank</option>
                                        {cryptos.map(crypto => (
                                            <option key={crypto.name} value={crypto.name}>
                                                {crypto.name}
                                            </option>
                                        ))}
                                    </select>

                                    <div className='relative w-full'>
                                        <button
                                            type="button"
                                            className="w-full p-3 border border-[#D9D9D9] text-black rounded-xl flex items-center justify-between"
                                            onClick={() => setIsDropdownOpen(prev => ({ ...prev, crypto: !prev.crypto }))}
                                        >
                                            <div className="flex items-center gap-3">
                                                {localData.cryptoType ? (
                                                    <>
                                                        <Image
                                                            src={cryptos.find(b => b.name === localData.cryptoType)?.image || ''}
                                                            alt=""
                                                            width={24}
                                                            height={24}
                                                        />
                                                        <span>{localData.cryptoType}</span>
                                                    </>
                                                ) : (
                                                    <span className="text-[#7C7C7A]">Select Crypto</span>
                                                )}
                                            </div>
                                            <ChevronDownIcon
                                                className={`lucide lucide-chevron-down transform transition-transform ${isDropdownOpen.crypto ? 'rotate-180' : ''}`}
                                            />
                                        </button>

                                        {/* Dropdown options */}
                                        {isDropdownOpen.crypto && (
                                            <div className="absolute w-full mt-2 bg-white border border-[#D9D9D9] rounded-xl shadow-lg z-10">
                                                {cryptos.map(crypto => (
                                                    <div
                                                        key={crypto.name}
                                                        className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => handleCryptoSelect(crypto.name)}
                                                    >
                                                        <Image
                                                            src={crypto.image}
                                                            alt=""
                                                            width={24}
                                                            height={24}
                                                        />
                                                        <span className="text-[#1F1E22]">{crypto.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-base font-medium text-[#1F1E22] mb-2" htmlFor="bankName">
                                        Network Type
                                    </label>

                                    <select
                                        name="networkType"
                                        value={localData.networkType}
                                        className="hidden"
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Network</option>
                                        {networks.map(network => (
                                            <option key={network.name} value={network.name}>
                                                {network.name}
                                            </option>
                                        ))}
                                    </select>

                                    <div className='relative w-full'>
                                        <button
                                            type="button"
                                            className="w-full p-3 border border-[#D9D9D9] text-black rounded-xl flex items-center justify-between"
                                            onClick={() => setIsDropdownOpen(prev => ({ ...prev, network: !prev.network }))}
                                        >
                                            <div className="flex items-center gap-3">
                                                {localData.networkType ? (
                                                    <>
                                                        <span className="text-[#7C7C7A]">{localData.networkType}</span>
                                                    </>
                                                ) : (
                                                    <span className="text-[#7C7C7A]">Select Crypto Network</span>
                                                )}
                                            </div>
                                            <ChevronDownIcon
                                                className={`lucide lucide-chevron-down transform transition-transform ${isDropdownOpen.network ? 'rotate-180' : ''}`}
                                            />
                                        </button>

                                        {/* Dropdown options */}
                                        {isDropdownOpen.network && (
                                            <div className="absolute w-full mt-2 bg-white border border-[#D9D9D9] rounded-xl shadow-lg z-10">
                                                {networks.map(network => (
                                                    <div
                                                        key={network.name}
                                                        className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => handleNetworkSelect(network.name)}
                                                    >
                                                        <span className="text-[#1F1E22]">{network.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-base font-medium text-[#1F1E22] mb-2" htmlFor="walletAddress">
                                        Wallet Address
                                    </label>
                                    <input
                                        id="walletAddress"
                                        type="text"
                                        placeholder="Enter Wallet Address"
                                        className="w-full p-3 border border-[#D9D9D9] text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-purple mb-2"
                                        name='walletAddress'
                                        value={localData.walletAddress}
                                        onChange={handleChange}
                                        minLength={10}
                                    />
                                    {errors.walletAddressError &&
                                        <div className='flex gap-1 items-center'>
                                            <ErrorIcon />
                                            <span className="text-sm text-[#D02A2A] font-medium">
                                                Please enter a valid wallet address
                                            </span>
                                        </div>
                                    }
                                </div>
                            </>
                    }

                    <button
                        type="submit"
                        className={`w-full text-white py-2 rounded transition-colors ${complete() ? "bg-[#D9D9D9]" : "bg-[#8627FF]"} `}
                        disabled={complete()}
                    >
                        {data.withdrawalMethod === "Bank Transfer" ? "Add Bank" : "Add Wallet"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export function InvestmentFormThree({ data, setInvestmentData, setFundStep }: InvestmentFormProps) {

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0"
            onClick={() => setInvestmentData(prev => ({ ...prev, isRequest: false }))}
        >
            <div
                className="w-full mx-auto max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem] bg-white rounded-2xl shadow-md p-6 text-center"
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="p-3 w-fit mx-auto my-4 bg-[#F3E9FF] rounded-full">
                    <SuccessIcon />
                </div>

                <h1 className="text-xl font-bold text-gray-900">
                    {data.withdrawalMethod === "Bank Transfer" ? "Bank Added Successful 🎉" : "Wallet Added Successfully"}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    {data.withdrawalMethod === "Bank Transfer" ? "Your bank account has been added successfully. You can now receive withdrawals to this account." : "Your crypto wallet has been added. You can now withdraw funds seamlessly."}
                </p>

                <button
                    className="p-2 rounded-lg border border-[#D6D6D6] text-[#1C1B1F] font-semibold w-40 mt-6"
                    onClick={() => { setInvestmentData({ withdrawalMethod: "", isFund: false, bankName: "", accountNumber: "", cryptoType: "", networkType: "", walletAddress: "" }); setFundStep(1); console.log(data) }}
                >
                    Close
                </button>
            </div>
        </div>
    )
}