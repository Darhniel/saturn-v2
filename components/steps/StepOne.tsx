"use client";
import { useState, useEffect, useMemo } from "react";
import { StepProps } from "@/lib/types";
import { ErrorIcon } from "../saturn/SVG";
import Link from "next/link";

export default function StepOne({ data, onNext }: StepProps) {
  interface LocalData {
    fullName: string;
    businessName: string;
    email: string;
    phone: string;
    investmentInterest: string;
    investmentSize: string;
    referral: string;
    userType: "individual" | "business";
  }

  const [localData, setLocalData] = useState<LocalData>({
    fullName: data.fullName || "",
    email: data.email || "",
    phone: data.phone || "",
    investmentInterest: data.investmentInterest || "",
    investmentSize: data.investmentSize || "",
    referral: data.referral || "",
    userType: data.userType,
    businessName: data.businessName || ""
  });

  const [touched, setTouched] = useState({
    fullName: false,
    businessName: false,
    email: false,
    phone: false,
    investmentInterest: false,
    investmentSize: false,
    referral: false
  })

  const errors = useMemo(() => {
    const newErrors = {
      fullNameError: false,
      emailError: false,
      phoneError: false,
      investmentSizeError: false,
      referralError: false,
      investmentInterestError: false,
      businessNameError: false
    };

    // Validate name based on account type
    if (localData.userType === "individual") {
      newErrors.fullNameError =
        localData.fullName.trim() === "" ||
        /\d/.test(localData.fullName);
    } else {
      newErrors.businessNameError =
        localData.businessName.trim() === "" ||
        /\d/.test(localData.businessName);
    }

    // Validate email
    newErrors.emailError =
      localData.email.trim() === "" ||
      !/^\S+@\S+\.\S+$/.test(localData.email);

    // Validate phone
    newErrors.phoneError =
      localData.phone.trim() === "" ||
      localData.phone.length < 10;

    // Validate investment size
    newErrors.investmentSizeError =
      localData.investmentSize.trim() === "";

    // Validate referral
    newErrors.referralError =
      localData.referral.trim() === "";

    // Validate investment interest
    newErrors.investmentInterestError =
      localData.investmentInterest.trim() === "";

    return newErrors;
  }, [localData]);
  //   fullNameError: false,
  //   emailError: false,
  //   phoneError: false,
  //   investmentSizeError: false,
  //   referralError: false,
  //   investmentInterestError: false,
  //   businessNameError: false
  // });

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

  useEffect(() => {
    setLocalData(prev => {
      if (prev.userType === "individual") {
        return { ...prev, businessName: "" };
      } else {
        return { ...prev, fullName: "" };
      }
    });

    setTouched(prev => ({
      ...prev,
      fullName: false,
      businessName: false
    }));
  }, [localData.userType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const rawNumeric = value.replace(/\D/g, '');
    const fieldName = name as keyof typeof touched;

    if (!touched[fieldName]) {
      setTouched(prev => ({ ...prev, [fieldName]: true }));
    }

    if (name === "investmentSize") {
      if (!/^[0-9]*$/.test(rawNumeric)) return;

      setLocalData((prev) => ({
        ...prev,
        investmentSize: formatCurrency(rawNumeric),
      }));
      return;
    }

    // Validate Phone number field
    if (name === "phone") {
      if (!/^[0-9]*$/.test(value)) return;
      setLocalData(prev => ({ ...prev, [name]: value.slice(0, 10) }));
      return;
    }

    setLocalData(prev => ({ ...prev, [name]: value }));
  };

  function complete() {
    return !Object.values(errors).some(error => error)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onNext({
      fullName: localData.fullName,
      email: localData.email,
      phone: localData.phone,
      investmentInterest: localData.investmentInterest,
      investmentSize: localData.investmentSize,
      referral: localData.referral,
      businessName: localData.businessName,
      userType: localData.userType
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
        {/* Account Type Selection */}
        <div className="mb-4 flex gap-12">
          <label
            className={`w-full cursor-pointer rounded-xl border p-6 ${localData.userType === "individual" ? "border-[#4765EB]" : "border-[#EBEBEB]"}`}
          >
            <div className="relative">
              <input
                type="radio"
                name="userType"
                value="individual"
                className="peer mb-3 block h-5 w-5 cursor-pointer appearance-none opacity-0"
                checked={localData.userType === "individual"}
                onChange={handleChange}
              />
              <div className="absolute top-1 h-5 w-5 rounded-full border border-[#D0D5DD] transition-all peer-checked:border-[#4765EB]"></div>
              <div className="absolute left-1 top-2 h-3 w-3 rounded-full peer-checked:block peer-checked:bg-[#4765EB]"></div>
            </div>
            <span
              className={`text-base ${localData.userType === "individual" && "font-semibold"}`}
            >
              Personal Account
            </span>
          </label>

          <label
            className={`w-full cursor-pointer rounded-xl border p-6 ${localData.userType === "business" ? "border-[#4765EB]" : "border-gray-300"}`}
          >
            <div className="relative">
              <input
                type="radio"
                name="userType"
                value="business"
                className="peer mb-3 block h-5 w-5 cursor-pointer appearance-none opacity-0"
                checked={localData.userType === "business"}
                onChange={handleChange}
              />
              <div className="absolute top-1 h-5 w-5 rounded-full border border-gray-400 transition-all peer-checked:border-[#4765EB]"></div>
              <div className="absolute left-1 top-2 h-3 w-3 rounded-full peer-checked:block peer-checked:bg-[#4765EB]"></div>
            </div>
            <span
              className={`text-base ${localData.userType === "business" && "font-semibold"}`}
            >
              Business Account
            </span>
          </label>
        </div>
        {/* Name Field */}
        {
          localData.userType === "individual" && (
            <div className="mb-4">
              <label className="mb-2 block text-base font-medium text-gray-800">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter Full Name"
                className={`mb-2 w-full rounded-xl border border-[#E7E7E7] px-3 py-4 text-[#121212] font-medium`}
                value={localData.fullName}
                onChange={handleChange}
              />
              {touched.fullName && errors.fullNameError && (
                <div className={`flex items-center gap-1`}>
                  <ErrorIcon />
                  <span className="text-sm font-medium text-red-600">
                    Please enter a valid name.
                  </span>
                </div>
              )}
            </div>
          )
        }
        {
          localData.userType === "business" && (
            <div className="mb-4">
              <label className="mb-2 block text-base font-medium text-gray-800">
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                placeholder="Enter Business Name"
                className={`mb-2 w-full rounded-xl border border-[#E7E7E7] px-3 py-4 text-[#121212] font-medium`}
                value={localData.businessName}
                onChange={handleChange}
              />
              {touched.businessName && errors.businessNameError && (
                <div className={`flex items-center gap-1`}>
                  <ErrorIcon />
                  <span className="text-sm font-medium text-red-600">
                    Please enter a valid business name.
                  </span>
                </div>
              )}
            </div>
          )
        }

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
          {touched.email && errors.emailError && (
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

          {touched.phone && errors.phoneError && (
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
          {touched.investmentInterest
            && errors.investmentInterestError && (
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
          {touched.investmentSize && errors.investmentSizeError && (
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
          {touched.referral && errors.referralError && (
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
