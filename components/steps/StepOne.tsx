"use client";
import { useState } from "react";
import { StepProps } from "@/lib/types";
import { ErrorIcon } from "../SVG";
import Link from "next/link";

export default function StepOne({ data, onNext }: StepProps) {
  interface LocalData {
    fullName: string;
    email: string;
    phone: string;
    investmentInterest: string;
    investmentSize: string;
    referral: string;
  }
  const [localData, setLocalData] = useState<LocalData>({
    fullName: data.fullName || "",
    email: data.email || "",
    phone: data.phone || "",
    investmentInterest: data.investmentInterest || "",
    investmentSize: data.investmentSize || "",
    referral: data.referral || ""
  });

  const [errors, setErrors] = useState({
    fullNameError: false,
    emailError: false,
    phoneError: false,
    investmentSizeError: false,
    referralError: false,
    investmentInterestError: false
  });

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');

    if (!numericValue) return '';

    // Format as USD currency
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(Number(numericValue));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const rawNumeric = value.replace(/\D/g, '');

    if (name === "investmentSize") {
      if (!/^[0-9]*$/.test(rawNumeric)) return;

      setErrors((prev) => ({
        ...prev,
        investmentSizeError: rawNumeric.trim() === "",
      }));

      setLocalData((prev) => ({
        ...prev,
        investmentSize: formatCurrency(rawNumeric),
      }));
      return;
    }
    const newLocalData = { ...localData, [name]: value };

    // Validate the name field (fullName or businessName)
    if (name === "fullName") {
      setErrors((prev) => ({
        ...prev,
        fullNameError: value.trim() === "" || /\d/.test(value),
      }));
    }

    // Validate the email field
    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        emailError: value.trim() === "" || !/^\S+@\S+\.\S+$/.test(value),
      }));
    }

    // Validate Phone number field
    if (name === "phone") {
      if (!/^[0-9]*$/.test(value)) return;
      setErrors((prev) => ({
        ...prev,
        phoneError: value.trim() === "" || value.length < 10,
      }));
    }

    if (name === "investmentInterest") {
      setErrors((prev) => ({
        ...prev,
        investmentInterestError: value.trim() === "",
      }));
    }

    if (name === "referral") {
      setErrors((prev) => ({
        ...prev,
        referralError: value.trim() === "",
      }));
    }
    
    setLocalData(newLocalData);
  };

  function complete() {
    const allFieldsFilled = Object.values(localData).every((val) => val.trim() !== "");
    const noErrors = Object.values(errors).every((err) => err === false);

    return allFieldsFilled && noErrors;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onNext({
      fullName: localData.fullName,
      email: localData.email,
      phone: localData.phone,
      investmentInterest: localData.investmentInterest,
      investmentSize: localData.investmentSize,
      referral: localData.referral
    });
  };

  return (
    <div className="mx-auto w-full max-w-[35rem] rounded-2xl border border-[#F2F2F2] bg-white p-6">
      <h2 className="mb-4 text-2xl font-bold">
        Account Registration
      </h2>
      <p className="mb-6 text-sm text-[#8C8B90]">
        Sign up to get started on your Saturn journey. Fill in your details to
        begin.
      </p>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-4">
          <label className="mb-2 block text-base font-medium text-gray-800">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter Full Name"
            className="mb-2 w-full rounded-xl border border-[#E7E7E7] px-3 py-4 text-[#121212] font-medium"
            value={localData.fullName}
            onChange={handleChange}
          />
          {errors.fullNameError && (
            <div className="flex items-center gap-1">
              <ErrorIcon />
              <span className="text-sm font-medium text-red-600">
                Please enter a valid name.
              </span>
            </div>
          )}
        </div>
        {/* Email Field */}
        <div className={`mb-4`}>
          <label className="mb-2 block text-base font-medium text-gray-800">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email Address"
            className="mb-2 w-full rounded-xl border border-[#E7E7E7] px-3 py-4 text-[#121212] font-medium"
            value={localData.email}
            onChange={handleChange}
          />
          {errors.emailError && (
            <div className="flex items-center gap-1">
              <ErrorIcon />
              <span className="text-sm font-medium text-red-600">
                Please enter a valid email.
              </span>
            </div>
          )}
        </div>
        {/* Phone Number Field */}
        <div className={`mb-4`}>
          <label className="mb-2 block text-base font-medium text-gray-800">
            Phone Number
          </label>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2 border border-[#E7E7E7] rounded-xl px-3 py-4 font-medium">
              🇳🇬 +234
            </span>
            <input
              name="phone"
              type="tel"
              placeholder="Enter Phone Number"
              className="flex-1 border border-[#E7E7E7] rounded-xl px-4 py-4 font-medium"
              onChange={handleChange}
              value={localData.phone}
              maxLength={10}
            />
          </div>

          {errors.phoneError && (
            <div className="flex items-center gap-1">
              <ErrorIcon />
              <span className="text-sm font-medium text-red-600">
                Please enter a valid phone number.
              </span>
            </div>
          )}
        </div>
        {/* Investment Interest Field */}
        <div className={`mb-4`}>
          <label className="mb-2 block text-base font-medium text-gray-800">
            Investment Interest
          </label>
          <select
            name="investmentInterest"
            className="mb-2 w-full rounded-xl border border-[#E7E7E7] px-3 py-4 text-[#121212] font-medium"
            onChange={handleChange}
            value={localData.investmentInterest}
          >
            <option value="">Select Investment Interest</option>
            <option value="real_estate">Real Estate</option>
            <option value="stocks">Stocks</option>
            <option value="crypto">Crypto</option>
          </select>
          {errors.investmentInterestError && (
            <div className="flex items-center gap-1">
              <ErrorIcon />
              <span className="text-sm font-medium text-red-600">
                Please choose a valid option.
              </span>
            </div>
          )}
        </div>
        {/* Investment Size Field */}
        <div className={`mb-4`}>
          <label className="mb-2 block text-base font-medium text-gray-800">
            Estimated Investment Size
          </label>
          <input
            type="text"
            name="investmentSize"
            placeholder="₦0.00"
            className="mb-2 w-full rounded-xl border border-[#E7E7E7] px-3 py-4 text-[#121212] font-medium"
            value={localData.investmentSize}
            onChange={handleChange}
          />
          {errors.investmentSizeError && (
            <div className="flex items-center gap-1">
              <ErrorIcon />
              <span className="text-sm font-medium text-red-600">
                Please enter a valid investment size.
              </span>
            </div>
          )}
        </div>
        {/* How did you hear about us Field */}
        <div className={`mb-4`}>
          <label className="mb-2 block text-base font-medium text-gray-800">
            How did you hear about us?
          </label>
          <select
            name="referral"
            className="mb-2 w-full rounded-xl border border-[#E7E7E7] px-3 py-4 text-[#121212] font-medium"
            onChange={handleChange}
            value={localData.referral}
          >
            <option value="">Select Referral Method</option>
            <option value="friend">Friend</option>
            <option value="social_media">Social Media</option>
          </select>
          {errors.referralError && (
            <div className="flex items-center gap-1">
              <ErrorIcon />
              <span className="text-sm font-medium text-red-600">
                Please choose a valid option.
              </span>
            </div>
          )}
        </div>
        
        <button
          type="submit"
          className={`w-full rounded py-2 text-white transition-colors ${complete() ? "bg-[#1639CE] cursor-pointer" : "bg-[#D9D9D9] cursor-not-allowed"}`}
          disabled={!complete()}
        >
          Proceed
        </button>
      </form>

      <p className='text-[#414141] text-center mt-6'>
        Already have an account? {" "}
        <Link href={"/login"} className='font-bold underline text-[#0033cc]'>Sign In</Link>
      </p>
    </div>
  );
}
