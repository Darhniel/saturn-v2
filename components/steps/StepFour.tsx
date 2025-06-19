'use client';

import { StepProps } from '@/lib/types';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import React, { useCallback, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import Webcam from 'react-webcam';

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function StepFour({ data, onNext }: StepProps) {
    const [govID, setGovID] = useState<File[]>([]);
    const [addressProof, setAddressProof] = useState<File[]>([]);
    const [selfieTaken, setSelfieTaken] = useState<string | null>(null);
    const [showWebcam, setShowWebcam] = useState(false);

    const onDropGovID = useCallback((acceptedFiles: File[]) => {
        setGovID(acceptedFiles);
    }, []);

    const onDropAddress = useCallback((acceptedFiles: File[]) => {
        setAddressProof(acceptedFiles);
    }, []);

    const { getRootProps: getGovRoot, getInputProps: getGovInput } = useDropzone({ onDrop: onDropGovID });
    const { getRootProps: getAddrRoot, getInputProps: getAddrInput } = useDropzone({ onDrop: onDropAddress });

    const webcamRef = useRef<Webcam>(null);

    const capture = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setSelfieTaken(imageSrc);
            setShowWebcam(false);
        }
    };

    const handleSubmit = async () => {
        if (!govID[0] || !addressProof[0] || !selfieTaken) return alert('Please upload all 3 documents');

        try {
            const [govUrl, addrUrl] = await Promise.all([
                uploadToCloudinary(govID[0]),
                uploadToCloudinary(addressProof[0]),
            ]);

            // Convert base64 selfie to Blob
            const selfieBlob = await (await fetch(selfieTaken)).blob();
            const selfieFile = new File([selfieBlob], 'selfie.jpg', { type: 'image/jpeg' });
            const selfieUrl = await uploadToCloudinary(selfieFile);

            const submissionPayload: Record<string, string> = {
                governmentId: govUrl,
                proofOfAddress: addrUrl,
                selfieVerification: selfieUrl,
            };

            onNext({ file: submissionPayload });
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload files. Try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
                <h1 className="text-xl font-semibold text-gray-900">KYC</h1>
                <p className="text-sm text-gray-500 mb-4">
                    Upload the following documents to verify your KYC
                </p>
                <hr className="my-4" />

                <p className="text-sm text-gray-800 mb-2">
                    Upload the following documents to verify your KYC.<br />
                    <span className="text-gray-500">
                        Note: Acceptable documents must be less than 3 months old.
                    </span>
                </p>
                <ul className="list-disc list-inside mb-6 space-y-1 text-sm">
                    <li>Government ID</li>
                    <li>Proof of Address</li>
                    <li>Selfie Verification</li>
                </ul>

                {/* Government ID */}
                <div className="mb-4">
                    <label className="font-medium mb-1 block">Upload Government ID</label>
                    <div
                        {...getGovRoot()}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-between cursor-pointer"
                    >
                        <input {...getGovInput()} />
                        <span className="text-sm flex gap-3 items-center text-[#B6B6B6]">
                            <button className='bg-[#EFF2F6] py-2 px-4 flex gap-2 items-center w-fit rounded-sm'>
                                <ArrowUpTrayIcon
                                    width={24}
                                    height={24}
                                />
                                <span className='text-[#B6B6B6]'>
                                    Upload Files
                                </span>
                            </button>
                            or Drop Files
                        </span>
                    </div>
                    {govID.length > 0 && (
                        <p className="text-xs text-green-600 mt-1">{govID[0].name} uploaded</p>
                    )}
                </div>

                {/* Address Proof */}
                <div className="mb-4">
                    <label className="font-medium mb-1 block">Upload Proof of Address</label>
                    <div
                        {...getAddrRoot()}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-between cursor-pointer"
                    >
                        <input {...getAddrInput()} />
                        <span className="text-sm flex gap-3 items-center text-[#B6B6B6]">
                            <button className='bg-[#EFF2F6] py-2 px-4 flex gap-2 items-center w-fit rounded-sm'>
                                <ArrowUpTrayIcon
                                    width={24}
                                    height={24}
                                />
                                <span className='text-[#B6B6B6]'>
                                    Upload Files
                                </span>
                            </button>
                            or Drop Files
                        </span>
                    </div>
                    {addressProof.length > 0 && (
                        <p className="text-xs text-green-600 mt-1">{addressProof[0].name} uploaded</p>
                    )}
                </div>

                {/* Selfie Section */}
                <div className="mb-4">
                    {selfieTaken ? (
                        <div className="mb-2">
                            <img src={selfieTaken} alt="Selfie" className="rounded-lg" />
                            <p className="text-sm text-green-600 mt-1">Selfie captured</p>
                            <button
                                className="bg-[#1639CE] text-white px-4 py-2 rounded-lg text-sm cursor-pointer w-full text-center mt-3"
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
                                className="bg-[#1639CE] text-white px-4 py-2 rounded-lg text-sm cursor-pointer"
                            >
                                Capture Selfie
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowWebcam(true)}
                            className={`w-full text-white font-semibold py-2 rounded-lg ${(govID.length > 0 && addressProof.length > 0) ? "bg-[#1639CE] cursor-pointer" : "bg-[#D9D9D9] cursor-not-allowed"}`}
                            disabled={!(govID.length > 0 && addressProof.length > 0)}
                        >
                            Take Selfie
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
