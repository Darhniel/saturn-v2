"use client"
import React, { useState } from 'react';
import { FormDataType } from '@/lib/types';
import ProgressBar from '@/components/saturn/ProgressBar';
import Spinner from '@/components/saturn/Spinner';
import Image from 'next/image';
import StepOne from '@/components/steps/StepOne';
import StepTwo from '@/components/steps/StepTwo';
import StepThree from '@/components/steps/StepThree';
import StepFour from '@/components/steps/StepFour';
import StepFive from '@/components/steps/StepFive';
import Success from '@/components/steps/Success'
import { ApiService } from '@/lib/services/api';


export default function Page() {
    const [stepOrder, setStepOrder] = useState<number[]>([1, 2, 3, 4, 5]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const currentStep = stepOrder[currentStepIndex];
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<FormDataType>({
        fullName: "",
        businessName: "",
        email: "",
        phone: "",
        investmentInterest: "",
        investmentSize: "",
        referral: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: "",
        address: "",
        investmentAppetite: "",
        preferredPortfolioTypes: [],
        files: [],
        file: {},
        agree: false,
        userType: "individual"
    });

    const [success, setSuccess] = useState(false);

    const handleNext = async (stepData: Partial<FormDataType>) => {
        setFormData((prev) => ({ ...prev, ...stepData }));

        const updatedData = { ...formData, ...stepData };
        setFormData(updatedData);

        // if (currentStepIndex === 0) {
        //     setCurrentStepIndex(1);
        // }

        if (currentStep === 1) {
            if (stepData.userType === "business") {
                setStepOrder([1, 2, 3, 5])
            } else {
                setStepOrder([1, 2, 3, 4, 5]);
            }
        }


        try {
            if (currentStepIndex === 0) {
                // Handle registration
                setLoading(true);
                // const result = await ApiService.register(stepData);
                // if (result.error) throw new Error(result.message);
                setCurrentStepIndex(1);
            } else if (currentStepIndex === 1) {
                // Handle investment details
                setLoading(true);
                // await ApiService.submitInvestment(stepData);
                setCurrentStepIndex(2);
            } else if (currentStepIndex === 2) {
                // Handle bank details
                setLoading(true);
                // await ApiService.submitBankDetails(stepData);
                setCurrentStepIndex(3);
            } else if (currentStepIndex === 3) {
                // Handle final KYC submission
                setLoading(true);
                if (formData.userType === "business") {
                    // const response = await ApiService.submitKYC(stepData);
                    // if (!response.ok) throw new Error("KYC submission failed");
                    console.log(stepData)
                    setSuccess(true);
                } else {
                    setCurrentStepIndex(4);
                }
            } else if (currentStepIndex === stepOrder.length - 1) {
                // Handle final KYC submission
                setLoading(true);
                // const response = await ApiService.submitKYC(stepData);
                // if (!response.ok) throw new Error("KYC submission failed");
                setSuccess(true);
            }
        } catch (error) {
            console.error("Submission failed:", error);
            alert(error instanceof Error ? error.message : "An error occurred");
        } finally {
            setLoading(false);
            console.log(updatedData)
        }
    };

    const goBack = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex((prev) => prev - 1);
        }
    };

    const goToStep = (index: number) => {
        if (index < currentStepIndex) {
            setCurrentStepIndex(index);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <StepOne data={formData} onNext={handleNext} />;
            case 2:
                return <StepTwo data={formData} onNext={handleNext} />;
            case 3:
                return <StepThree data={formData} onNext={handleNext} />;
            case 4:
                return <StepFour data={formData} onNext={handleNext} />;
            case 5:
                return <StepFive data={formData} onNext={handleNext} />;
            default:
                return null;
        }
    };

    return (
        <div className='flex flex-col justify-center items-center p-6 bg-[#FAFAFA] min-h-screen'>
            {loading ? (
                <div className="mb-4">
                    <Spinner />
                </div>
            ) : success ? (
                <Success />
            ) : (
                <>
                    <div className="mt-8 mb-10">
                        <Image
                            src={"/blue-logo.svg"}
                            width={156}
                            height={36}
                            alt='logo'
                            className='mx-auto'
                        />
                    </div>

                    <h1 className="mb-2 text-center text-[2rem] font-bold">
                        Account Creation & KYC
                    </h1>

                    <ProgressBar
                        stepOrder={stepOrder}
                        currentStepIndex={currentStepIndex}
                        goToStep={goToStep}
                    />

                    {renderStep()}

                    {currentStepIndex > 0 && (
                        <button
                            onClick={goBack}
                            className="w-full rounded-md py-2 font-medium text-white"
                        >
                            ← Back
                        </button>
                    )}
                </>
            )
            }
        </div >
    )
}
