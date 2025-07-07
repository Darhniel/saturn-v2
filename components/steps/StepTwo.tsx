'use client'
import { useState } from 'react';
import { StepProps } from '@/lib/types';
import { ErrorIcon, EyeIcon, EyeOffIcon } from '../saturn/SVG';

export default function StepTwo({ data, onNext }: StepProps) {
    const [localData, setLocalData] = useState({
        password: data.password || "",
        confirmPassword: data.confirmPassword || "",
        userType: data.userType
    });

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [errors, setErrors] = useState({
        passwordError: false,
        confirmPasswordError: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newLocalData = {
            ...localData,
            [name]: value,
        };

        // Validate password
        if (name === "password") {
            setErrors((prev) => ({ ...prev, passwordError: value.length < 8 }));
        }
        // Validate confirmPassword match
        if (name === "confirmPassword" || name === "password") {
            const isMatching = newLocalData.password === newLocalData.confirmPassword;
            setErrors((prev) => ({ ...prev, confirmPasswordError: !isMatching }));
        }

        setLocalData(newLocalData);
    }

    function complete() {
        return localData.password.length >= 8 && localData.confirmPassword === localData.password;
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onNext(localData)
        // console.log(localData);
    }

    return (
        <div className="mx-auto w-full max-w-[35rem] rounded-2xl border border-[#F2F2F2] bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold">
                Create Password
            </h2>
            <p className="text-sm text-[#8C8B90] mb-6">
                Use at least 8 characters
            </p>

            <form onSubmit={handleSubmit}>
                {/* Password Field */}
                <div className="mb-4">
                    <label className="mb-2 block text-base font-medium text-gray-800">
                        Create Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter Password"
                            className="focus:ring-purple mb-2 w-full rounded-xl border border-gray-300 p-3 text-gray-800 focus:outline-none focus:ring-2"
                            value={localData.password}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-[45%] -translate-y-1/2"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                    </div>
                    {errors.passwordError && (
                        <div className="flex items-center gap-1">
                            <ErrorIcon />
                            <span className="text-sm font-medium text-red-600">
                                Password must be at least 8 characters.
                            </span>
                        </div>
                    )}
                </div>
                {/* Confirm Password Field */}
                <div className="mb-4">
                    <label className="mb-2 block text-base font-medium text-gray-800">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="focus:ring-purple mb-2 w-full rounded-xl border border-gray-300 p-3 text-gray-800 focus:outline-none focus:ring-2"
                        value={localData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPasswordError && (
                        <div className="flex items-center gap-1">
                            <ErrorIcon />
                            <span className="text-sm font-medium text-red-600">
                                Passwords do not match.
                            </span>
                        </div>
                    )}
                </div>

                {/* Proceed Button */}
                <button
                    type="submit"
                    className={`w-full text-white py-2 rounded transition-colors ${!complete() ? "bg-[#D9D9D9] cursor-not-allowed" : "bg-[#1639CE] cursor-pointer"}`}
                    disabled={!complete()}
                >
                    Proceed
                </button>
            </form>
        </div>
    );
}
