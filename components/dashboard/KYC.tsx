import { KycFormProps } from '@/lib/types'
import React, { useRef, useState } from 'react'
import DatePicker from 'react-datepicker';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { ErrorIcon } from '../saturn/SVG';
import Webcam from 'react-webcam';
import Image from 'next/image';
import Spinner from '../saturn/Spinner';
import { LoadingSpinner } from '../saturn/SVG';

export function KycFormOne({ data, onNext, setKycData }: KycFormProps) {
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
        fullName: data.fullName || "",
        bvn: data.bvn || "",
        dateOfBirth: data.dateOfBirth || ""
    });

    const [errors, setErrors] = useState({
        fullNameError: false,
        bvnError: false,
        dobError: false,
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        const newLocalData = { ...localData, [name]: value };

        if (name === "fullName") {
            if (value.trim() === "" || /\d/.test(value)) {
                setErrors((prev) => ({ ...prev, fullNameError: true }));
            } else {
                setErrors((prev) => ({ ...prev, fullNameError: false }));
            }
        }

        if (name === "bvn") {
            if (!/^[0-9]*$/.test(value)) return;
            if (value.length < 10) {
                setErrors((prev) => ({ ...prev, bvnError: true }))
            } else {
                setErrors((prev) => ({ ...prev, bvnError: false }))
            }
            setLocalData(prev => ({ ...prev, [name]: value.slice(0, 10) }));
            return;
        }

        setLocalData(newLocalData);
    };

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onNext(localData);
    };

    function complete() {
        if (localData.fullName.trim() === "" || localData.bvn.trim() === "" || localData.bvn.length < 10 || localData.dateOfBirth === "" || errors.dobError || errors.bvnError || errors.fullNameError) {
            return false
        }
        return true;
    }

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 mt-0"
            onClick={() => setKycData(prev => ({ ...prev, isVerified: false }))}
        >
            <div
                className="bg-white rounded-2xl p-6 w-full max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem]"
                onClick={(e) => { e.stopPropagation() }}
            >
                <h2 className="text-xl font-bold mb-2">
                    Verify your BVN
                </h2>
                <p className="text-[#8C8B90] mb-4 text-sm">
                    Verify your identity for secure access.
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="mb-2 block text-base font-medium text-gray-800">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Enter Full Name"
                            className={`mb-2 w-full rounded-xl border border-[#E7E7E7] px-3 py-2 text-[#121212] font-medium`}
                            value={localData.fullName}
                            onChange={handleChange}
                        />
                        <p className='text-sm text[#414141]'>
                            Enter according to how it is on your ID
                        </p>
                        {errors.fullNameError && (
                            <div className={`flex items-center gap-1`}>
                                <ErrorIcon />
                                <span className="text-sm font-medium text-red-600">
                                    Please enter a valid name.
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-base font-medium text-gray-800">
                            BVN
                        </label>
                        <input
                            type="text"
                            name="bvn"
                            placeholder="Enter your 10 digit number"
                            className={`mb-2 w-full rounded-xl border border-[#E7E7E7] px-3 py-2 text-[#121212] font-medium`}
                            value={localData.bvn}
                            onChange={handleChange}
                        />
                        {errors.bvnError && (
                            <div className={`flex items-center gap-1`}>
                                <ErrorIcon />
                                <span className="text-sm font-medium text-red-600">
                                    Please enter your complete bvn.
                                </span>
                            </div>
                        )}
                    </div>

                    <div className={`w-full mb-4`}>
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
                        {errors.dobError &&
                            <div className='flex gap-1 items-center'>
                                <ErrorIcon />
                                <span className="text-sm text-[#D02A2A] font-medium">
                                    Please enter a valid date of birth
                                </span>
                            </div>
                        }
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 px-4 ${complete() ? "bg-[#8627FF]" : "bg-[#D9D9D9]"} text-white rounded-md cursor-pointer`}
                        disabled={!complete()}
                    >
                        Take Selfie
                    </button>
                </form>
            </div>
        </div>
    )
}

export function KycFormTwo({ data, onNext, setKycData }: KycFormProps) {
    const [selfieTaken, setSelfieTaken] = useState<string | null>(null);
    const [showWebcam, setShowWebcam] = useState(false);
    const [loading, setLoading] = useState(false)

    const webcamRef = useRef<Webcam>(null);

    const capture = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setSelfieTaken(imageSrc);
            setShowWebcam(false);
        }
    };

    const uploadToCloudinary = async (file: File): Promise<string> => {
        const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

        const res = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        return data.secure_url;
    };

    const handleSubmit = async () => {
        if (!selfieTaken) return alert('Please take a selfie');

        try {
            // Convert base64 selfie to Blob
            const selfieBlob = await (await fetch(selfieTaken)).blob();
            const selfieFile = new File([selfieBlob], 'selfie.jpg', { type: 'image/jpeg' });
            const selfieUrl = await uploadToCloudinary(selfieFile);

            const submissionPayload: Record<string, string> = {
                selfieVerification: selfieUrl,
            };

            onNext({ file: submissionPayload });
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload files. Try again.');
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 mt-0 overflow-y-scroll"
            onClick={() => setKycData(prev => ({ ...prev, isVerified: false }))}
        >
            <div
                className="bg-white rounded-2xl p-6 w-full max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem] mb-4"
                onClick={(e) => { e.stopPropagation() }}
            >
                <h2 className="text-xl font-bold mb-2">
                    Selfie
                </h2>
                <p className="text-[#8C8B90] mb-6 text-sm">
                    Take or upload a clear selfie to verify your identity securely.
                </p>

                <div className={`${showWebcam || selfieTaken ? "hidden" : "block"}`}>
                    <div className="flex items-center gap-3 mb-7">
                        <div className="bg-[#F1EAFF] text-sm font-bold text-[#5421B5] rounded-full py-2 px-3.5">
                            1
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h5 className='font-semibold text-sm'>
                                Good Lighting
                            </h5>
                            <p className='text-[#475367] text-xs'>
                                Make sure you are in a lit environment and both ears are uncovered.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mb-7">
                        <div className="bg-[#F1EAFF] text-sm font-bold text-[#5421B5] rounded-full py-2 px-3.5">
                            2
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h5 className='font-semibold text-sm'>
                                Look Straight
                            </h5>
                            <p className='text-[#475367] text-xs'>
                                Hold your phone at eye level and look straight to the camera.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mb-7">
                        <div className="bg-[#F1EAFF] text-sm font-bold text-[#5421B5] rounded-full py-2 px-3.5">
                            3
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h5 className='font-semibold text-sm'>
                                Keep Your Face Unobstructed
                            </h5>
                            <p className='text-[#475367] text-xs'>
                                Ensure your entire face is visible without any obstructions, such as hats, glasses, or coverings.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    {selfieTaken ? (
                        <div className="mb-2">
                            <img src={selfieTaken} alt="Selfie" className="rounded-lg" />
                            <p className="text-sm text-green-600 mt-1">Selfie captured</p>
                            <button
                                className="text-sm text-center mt-3 w-full py-2 px-4 bg-[#8627FF] text-white rounded-md cursor-pointer"
                                onClick={handleSubmit}
                            >
                                Proceed
                            </button>
                        </div>
                    ) : showWebcam ? (
                        <div className="flex flex-col items-center space-y-2">
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                className="rounded-lg"
                            />
                            <button
                                onClick={capture}
                                className="w-full py-2 px-4 bg-[#8627FF] text-white rounded-md cursor-pointer"
                            >
                                Capture Selfie
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowWebcam(true)}
                            className={`w-full py-2 px-4 bg-[#8627FF] text-white rounded-md cursor-pointer`}
                        >
                            Proceed to Take Selfie
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export function Success({ setKycData }: KycFormProps) {
    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 mt-0 overflow-y-scroll"
            onClick={() => setKycData({ isVerified: false, fullName: "", bvn: "", dateOfBirth: "", file: {}, })}
        >
            <div className='bg-white rounded-2xl p-6 w-full max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem] mb-4 flex flex-col items-center'>
                <Image
                    src={"/blue-logo.svg"}
                    width={156}
                    height={36}
                    alt='logo'
                    className='mb-10'
                />

                <div className='p-6 bg-white rounded-2xl max-w-md mx-auto'>
                    <Image
                        src={"/check.svg"}
                        width={120}
                        height={120}
                        alt='success icon'
                        className='mb-10 mx-auto'
                    />

                    <h2 className='font-bold text-2xl mb-2.5 text-center'>
                        Verification Submitted
                    </h2>

                    <p className='text-[#8C8B90] text-sm text-center mb-6'>
                        Well done. We'd let you know as soon as you're good to go
                    </p>

                    <button
                        className="w-full rounded py-2 text-white bg-[#8627FF] cursor-pointer"
                        onClick={() => setKycData({
                            fullName: "",
                            bvn: "",
                            dateOfBirth: "",
                            file: {},
                            isVerified: false
                        })}
                    >
                        Proceed
                    </button>
                </div>
            </div>
        </div>
    )
}