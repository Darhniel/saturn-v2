'use client'
import { StepProps } from '@/lib/types';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { CalendarIcon } from '@heroicons/react/24/outline';
import 'react-datepicker/dist/react-datepicker.css';
import { CancelIcon, CheckIcon, ChevronDownIcon, ErrorIcon } from '../saturn/SVG';

export default function StepThree({ data, onNext }: StepProps) {
    const today = new Date();
    const preciseEighteenYearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
    );

    const formatDateToISO = (date: Date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [startDate, setStartDate] = useState<Date | null>(null);

    const [localData, setLocalData] = useState({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        dateOfBirth: data.dateOfBirth,
        address: data.address,
        investmentAppetite: data.investmentAppetite,
        preferredPortfolioTypes: data.preferredPortfolioTypes,
        userType: data.userType
    });

    const [errors, setErrors] = useState({
        dateError: false,
        addressError: false,
        investmentError: false,
        portfolioError: false
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "preferredPortfolioTypes") {
            // Ignore the default option
            if (value !== "" && !localData.preferredPortfolioTypes.includes(value)) {
                setLocalData((prev) => ({
                    ...prev,
                    preferredPortfolioTypes: [...prev.preferredPortfolioTypes, value],
                }));

                // Optionally, clear any error for portfolio type:
                setErrors((prev) => ({ ...prev, portfolioError: false }));
            }
            return; // Exit early since we've handled portfolioType
        }

        const newLocalData = {
            ...localData,
            [name]: value,
        };

        // Validate address
        if (name === 'address') {
            if (value === "") {
                setErrors(prev => ({ ...prev, addressError: true }));
            } else {
                setErrors(prev => ({ ...prev, addressError: false }));
            }
        }

        // Validate investment
        if (name === 'investmentAppetite') {
            if (value === "") {
                setErrors(prev => ({ ...prev, investmentError: true }))
            } else {
                setErrors(prev => ({ ...prev, investmentError: false }))
            }
        }

        setLocalData(newLocalData);
    };

    function complete() {
        if (localData.userType === "individual") {
            if (errors.dateError || errors.addressError || errors.investmentError || errors.portfolioError || localData.dateOfBirth === "" || localData.address === "" || localData.investmentAppetite === "" || localData.preferredPortfolioTypes.length === 0) {
                return true;
            }
        } else {
            if (errors.investmentError || errors.portfolioError || localData.investmentAppetite === "" || localData.preferredPortfolioTypes.length === 0) {
                return true;
            }
        }

        return false;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext(localData);
    };
    return (
        <div className="mx-auto w-full max-w-[35rem] rounded-2xl border border-[#F2F2F2] bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold">
                Profile Setup
            </h2>
            <p className="mb-6 text-sm text-[#8C8B90]">
                Complete your profile for a personalized experience and full access to all features
            </p>
            <form onSubmit={handleSubmit}>
                {/* Date of Birth */}
                <div className={`w-full mb-4 ${localData.userType === "business" ? "hidden" : ""}`}>
                    <label className="block text-base font-medium text-[#1F1E22] mb-2" htmlFor="date">
                        Date of Birth
                    </label>
                    <DatePicker
                        className="w-full border border-[#D9D9D9] rounded-xl focus:outline-none focus:ring-2 focus:ring-purple mb-2 text-[#1F1E22]"
                        selected={startDate}
                        onChange={(date) => {
                            setStartDate(date);
                            setLocalData((prev) => ({
                                ...prev,
                                dateOfBirth: date ? formatDateToISO(date) : "",
                            }))
                        }}
                        maxDate={preciseEighteenYearsAgo}
                        placeholderText="DD/MM/YYYY"
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        toggleCalendarOnIconClick
                        closeOnScroll={true}
                        customInput={
                            <div className="flex items-center">
                                <CalendarIcon className="h-5 w-5 absolute left-3 text-gray-400" />
                                <input
                                    className="pl-10 pr-3 py-2 w-full border border-[#D9D9D9] rounded-xl font-medium"
                                    placeholder="DD/MM/YYYY"
                                    name='dateOfBirth'
                                    value={startDate ? formatDateToISO(startDate) : ''}
                                    onChange={(e) => e.preventDefault()}
                                    onClick={(e) => (e.target as HTMLInputElement).blur()}
                                />
                            </div>
                        }
                    />
                    {errors.dateError &&
                        <div className='flex gap-1 items-center'>
                            <ErrorIcon />
                            <span className="text-sm text-[#D02A2A] font-medium">
                                Please enter a valid date of birth
                            </span>
                        </div>
                    }
                </div>

                {/* House Address */}
                <div className={`mb-4 ${localData.userType === "business" ? "hidden" : ""}`}>
                    <label className="block text-base font-medium text-[#1F1E22] mb-2" htmlFor="address">
                        Address
                    </label>
                    <input
                        id="address"
                        type="text"
                        placeholder="Enter House Address"
                        className="w-full p-3 border border-[#D9D9D9] text-black rounded-xl font-medium mb-2"
                        name='address'
                        value={localData.address}
                        onChange={handleChange}
                    />
                    {errors.addressError &&
                        <div className='flex gap-1 items-center'>
                            <ErrorIcon />
                            <span className="text-sm text-[#D02A2A] font-medium">
                                Address field cannot be empty
                            </span>
                        </div>
                    }
                </div>

                {/* Investment */}
                <div className="mb-4">
                    <label className="block text-base font-medium text-[#1F1E22] mb-2" htmlFor="investmentApetite">
                        Investment Appetite
                    </label>
                    <div className='flex gap-4 md:gap-8 items-center mb-2 flex-wrap'>
                        <div className='flex items-center'>
                            <div className="relative">
                                <input
                                    type="radio"
                                    name="investmentAppetite"
                                    id="aggressive"
                                    value={"aggressive"}
                                    onChange={handleChange}
                                    className="appearance-none peer w-5 h-5 opacity-0 relative z-10 cursor-pointer"
                                />
                                <div className="absolute w-5 h-5 border rounded-full border-[#D0D5DD] top-1 peer-checked:bg-[#1639CE] peer-checked:border-0 transition-all"></div>
                                <CheckIcon />
                            </div>
                            <label htmlFor="aggressive" className="ml-2 text-base font-medium text-[#1F1E22]">Aggressive</label>
                        </div>
                        <div className='flex items-center'>
                            <div className="relative">
                                <input
                                    type="radio"
                                    name="investmentAppetite"
                                    id="moderate"
                                    value={"moderate"}
                                    onChange={handleChange}
                                    className="appearance-none peer w-5 h-5 opacity-0 relative z-10 cursor-pointer"
                                />
                                <div className="absolute w-5 h-5 border rounded-full border-[#D0D5DD] top-1 peer-checked:bg-[#1639CE] peer-checked:border-0 transition-all"></div>
                                <CheckIcon />
                            </div>
                            <label htmlFor="moderate" className="ml-2 text-base font-medium text-[#1F1E22]">Moderate</label>
                        </div>
                        <div className='flex items-center'>
                            <div className="relative">
                                <input
                                    type="radio"
                                    name="investmentAppetite"
                                    id="conservative"
                                    value={"conservative"}
                                    onChange={handleChange}
                                    className="appearance-none peer w-5 h-5 opacity-0 relative z-10 cursor-pointer"
                                />
                                <div className="absolute w-5 h-5 border rounded-full border-[#D0D5DD] top-1 peer-checked:bg-[#1639CE] peer-checked:border-0 transition-all"></div>
                                <CheckIcon />
                            </div>
                            <label htmlFor="conservative" className="ml-2 text-base font-medium text-[#1F1E22]">
                                Conservative
                            </label>
                        </div>
                    </div>

                    {errors.investmentError &&
                        <div className='flex gap-1 items-center'>
                            <ErrorIcon />
                            <span className="text-sm text-[#D02A2A] font-medium">
                                Please select your investment appetite
                            </span>
                        </div>
                    }
                </div>

                {/* Portfolio type */}
                <div className="mb-6">
                    <label className="block text-base font-medium text-[#1F1E22] mb-2" htmlFor="preferredPortfolioTypes">
                        Preferred Portfolio Type
                    </label>
                    <div className='relative w-full'>
                        <select
                            className="appearance-none w-full p-3 border border-[#D9D9D9] text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-purple mb-2 cursor-pointer"
                            name='preferredPortfolioTypes'
                            value={""}
                            onChange={handleChange}
                        >
                            <option value="">Select Portfolio Type</option>
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

                    <div className="mt-2 flex flex-wrap gap-2">
                        {localData.preferredPortfolioTypes.map((option, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 bg-[#F3E9FF] text-purple rounded-full cursor-pointer hover:bg-purple font-medium"
                                onClick={() =>
                                    setLocalData((prev) => ({
                                        ...prev,
                                        preferredPortfolioTypes: prev.preferredPortfolioTypes.filter((item) => item !== option),
                                    }))
                                }
                            >
                                {option}
                                {/* An "x" icon for removal */}
                                <CancelIcon />
                            </span>
                        ))}
                    </div>


                    {errors.portfolioError &&
                        <div className='flex gap-1 items-center'>
                            <ErrorIcon />
                            <span className="text-sm text-[#D02A2A] font-medium">
                                Please choose a preferred portfolio
                            </span>
                        </div>
                    }
                </div>

                {/* Proceed Button */}
                <button
                    type="submit"
                    className={`w-full text-white py-2 rounded transition-colors ${complete() ? "bg-[#D9D9D9] cursor-not-allowed" : "bg-[#1639CE] cursor-pointer"}`}
                    disabled={complete()}
                >
                    Proceed
                </button>
            </form>
        </div>
    );
}
