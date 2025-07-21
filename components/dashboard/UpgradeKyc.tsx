import { UpdateKycProps, UploadedFile } from '@/lib/types';
import React, { useState } from 'react'
import { ActivityIndicator, ErrorIcon, ImageErrorIcon, PdfErrorIcon, TrashIcon } from '../saturn/SVG';
import Image from 'next/image';

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function UpgradeKycOne({ data, onNext, setUpdateKyc }: UpdateKycProps) {
    const requiredDocs = 1;
    const [uploadedDocuments, setUploadedDocuments] = useState<UploadedFile[]>([]);
    const [localData, setLocalData] = useState({
        idType: data.idType || "",
        idNumber: data.idNumber || "",
        idFile: data.idFile || ""
    });

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({
        idTypeError: false,
        idNumberError: false,
        idFileError: false,
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        const newLocalData = { ...localData, [name]: value };

        if (name === "idType") {
            if (value.trim() === "" || /\d/.test(value)) {
                setErrors((prev) => ({ ...prev, idTypeError: true }));
            } else {
                setErrors((prev) => ({ ...prev, idTypeError: false }));
            }
        }

        if (name === "idNumber") {
            if (!/^[0-9]*$/.test(value)) return;
            if (value.length < 10) {
                setErrors((prev) => ({ ...prev, idNumberError: true }))
            } else {
                setErrors((prev) => ({ ...prev, idNumberError: false }))
            }
            setLocalData(prev => ({ ...prev, [name]: value.slice(0, 10) }));
            return;
        }

        setLocalData(newLocalData);
    };

    const handleDocumentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (!files) return;

        const newDocs: UploadedFile[] = [];
        Array.from(files).forEach((file) => {
            // Validate file type
            if (!ALLOWED_FILE_TYPES.includes(file.type)) {
                newDocs.push({
                    file,
                    previewUrl: "",
                    progress: 0,
                    error: "Unsupported file type",
                });
                return;
            }
            // Validate file size
            if (file.size > MAX_FILE_SIZE) {
                newDocs.push({
                    file,
                    previewUrl: "",
                    progress: 0,
                    error: "File size exceeds limit",
                });
                return;
            }
            // Create a preview URL for image files
            let previewUrl = "";
            if (file.type.startsWith("image/")) {
                previewUrl = URL.createObjectURL(file);
            }
            newDocs.push({
                file,
                previewUrl,
                progress: 100,
            });
        });

        // Only allow up to requiredDocs
        setUploadedDocuments((prev) => {
            const combined = [...prev, ...newDocs];
            return combined.slice(0, requiredDocs);
        });
        e.target.value = "";
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

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        handleProceed();
    };

    const handleProceed = async () => {
        setLoading(true)
        const finalFiles = [
            ...uploadedDocuments.map(doc => doc.file)
        ];

        try {
            // Upload all files to Cloudinary
            const uploadedUrls = await Promise.all(finalFiles.map((file) => uploadToCloudinary(file)));

            // Map the URLs to the expected payload structure

            const newLocalData = { ...localData, idFile: uploadedUrls[0] };

            setLocalData(newLocalData);

            if (complete()) {
                onNext(newLocalData);
            }
        } catch (error) {
            console.error("Error during file upload and API submission:", error);
            alert("Something went wrong with the submission \nCheck and try again")
        } finally {
            setLoading(false)
        }
    };

    function complete() {
        if (localData.idNumber === "" || localData.idType === "" || uploadedDocuments.length < requiredDocs) {
            return false;
        }
        return true;
    }

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 mt-0 overflow-y-scroll"
            onClick={() => setUpdateKyc(prev => ({ ...prev, isUpdated: false }))}
        >
            <div
                className="bg-white rounded-2xl p-6 w-full max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem] mt-20"
                onClick={(e) => { e.stopPropagation() }}
            >
                <h2 className="text-xl font-bold mb-2">
                    Verify ID
                </h2>
                <p className="text-[#8C8B90] mb-4 text-sm">
                    Upload the following documents to verify your KYC.
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="mb-2 block text-base font-medium text-gray-800">
                            ID Type
                        </label>
                        <select
                            name="idType"
                            className="mb-2 w-full rounded-xl border border-[#E7E7E7] px-3 py-4 text-[#121212] font-medium"
                            onChange={handleChange}
                            value={localData.idType}
                        >
                            <option value="">Select...</option>
                            <option value="Permanent Voters Card">
                                Permanent Voters Card
                            </option>
                            <option value="National ID Card">
                                National ID Card
                            </option>
                            <option value="International Passport">
                                International Passport
                            </option>
                            <option value="Drivers License">
                                Drivers License
                            </option>
                        </select>
                        {errors.idTypeError && (
                            <div className={`flex items-center gap-1`}>
                                <ErrorIcon />
                                <span className="text-sm font-medium text-red-600">
                                    Please enter a valid ID document.
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-base font-medium text-gray-800">
                            ID Number
                        </label>
                        <input
                            type="text"
                            name="idNumber"
                            placeholder="Enter your 10 digit number"
                            className={`mb-2 w-full rounded-xl border border-[#E7E7E7] px-3 py-2 text-[#121212] font-medium`}
                            value={localData.idNumber}
                            onChange={handleChange}
                        />
                        {errors.idNumberError && (
                            <div className={`flex items-center gap-1`}>
                                <ErrorIcon />
                                <span className="text-sm font-medium text-red-600">
                                    Please enter your ID number as it appears.
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Documents Upload Section */}
                    <div className="mb-6">
                        <label htmlFor="uploadDocuments" className="block text-base font-medium text-black mb-2">
                            Upload Documents ({uploadedDocuments.length}/{requiredDocs})
                        </label>
                        <div
                            className={`relative border-2 border-dashed border-purple rounded-xl p-6 text-center cursor-pointer text-gray-500 flex flex-col items-center ${uploadedDocuments.length >= requiredDocs ? "opacity-50 pointer-events-none" : ""
                                }`}
                        >
                            <Image
                                src="/images/saturn/icon.svg"
                                alt=""
                                width={32}
                                height={32}
                            />
                            <p className="font-medium">Click to upload</p>
                            <p className="text-xs">Supported file types: JPG, PNG, PDF</p>
                            <input
                                type="file"
                                id="uploadDocuments"
                                multiple
                                onChange={handleDocumentsChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Please upload {requiredDocs} documents</p>
                    </div>

                    <div className="space-y-4 mb-6">
                        {uploadedDocuments.map((fileObj, index) => (
                            <div key={index} className="border rounded-md p-3 flex items-center gap-3 relative w-full">
                                {/* Show preview for image files */}
                                {!fileObj.error && fileObj.previewUrl ? (
                                    <Image
                                        src={fileObj.previewUrl}
                                        alt={fileObj.file.name}
                                        className="w-12 h-12 object-cover rounded"
                                        width={32}
                                        height={48}
                                    />
                                ) : (
                                    <div className="w-12 h-12 flex items-center justify-center bg-gray-100 text-gray-500 rounded">
                                        {fileObj.file.type === "application/pdf" && !fileObj.error ? (
                                            <PdfErrorIcon />
                                        ) : (
                                            <ImageErrorIcon />
                                        )}
                                    </div>
                                )}
                                <div className="w-1/2 flex-1">
                                    <p className="text-sm font-medium text-gray-700 truncate">{fileObj.file.name}</p>
                                    <p className="text-xs text-gray-400">{(fileObj.file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    {fileObj.error ? (
                                        <p className="text-xs text-red-500 font-medium mt-1">{fileObj.error}</p>
                                    ) : (
                                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                            <div className="bg-[#8627FF] h-2 rounded-full" style={{ width: `${fileObj.progress}%` }} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center space-x-2 text-gray-500">
                                    <button
                                        className="focus:outline-none hover:text-red-600 cursor-pointer"
                                        title="Remove"
                                        onClick={() =>
                                            setUploadedDocuments((prev) => prev.filter((_, i) => i !== index))
                                        }
                                    >
                                        <TrashIcon />
                                    </button>
                                    {!fileObj.error && <span className="text-sm text-gray-400">{fileObj.progress}%</span>}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 px-4 ${complete() ? "bg-[#8627FF] cursor-pointer" : "bg-[#D9D9D9] cursor-not-allowed"} text-white rounded-md flex justify-center`}
                        disabled={!complete()}
                    >
                        {loading ? <ActivityIndicator /> : "Proceed"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export function UpgradeKycTwo({ data, onNext, setUpdateKyc }: UpdateKycProps) {
    const [localData, setLocalData] = useState({
        country: data.country || "",
        address: data.address || "",
        city: data.city || ""
    });

    const [errors, setErrors] = useState({
        countryError: false,
        addressError: false,
        cityError: false,
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        const newLocalData = { ...localData, [name]: value };

        if (name === "country") {
            if (value.trim() === "" || /\d/.test(value)) {
                setErrors((prev) => ({ ...prev, countryError: true }));
            } else {
                setErrors((prev) => ({ ...prev, countryError: false }));
            }
        }

        if (name === "address") {
            // if (!/^[0-9]*$/.test(value)) return;
            if (value.trim() === "") {
                setErrors((prev) => ({ ...prev, addressError: true }))
            } else {
                setErrors((prev) => ({ ...prev, addressError: false }))
            }
        }

        if (name === "city") {
            if (value.trim() === "" || /\d/.test(value)) {
                setErrors((prev) => ({ ...prev, cityError: true }));
            } else {
                setErrors((prev) => ({ ...prev, cityError: false }));
            }
        }

        setLocalData(newLocalData);
    };

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log("form two");
        onNext(localData)

    };

    function complete() {
        if (localData.address === "" || localData.country === "" || localData.city === "" || errors.addressError || errors.cityError || errors.countryError) {
            return false;
        }
        return true;
    }

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 mt-0 overflow-y-scroll"
            onClick={() => setUpdateKyc(prev => ({ ...prev, isUpdated: false }))}
        >
            <div
                className="bg-white rounded-2xl p-6 w-full max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem]"
                onClick={(e) => { e.stopPropagation() }}
            >
                <h2 className="text-xl font-bold mb-2">
                    Address Verification
                </h2>
                <p className="text-[#8C8B90] mb-4 text-sm">
                    Please provide your home address here for verification.
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="mb-2 block text-base font-medium text-gray-800">
                            Country
                        </label>
                        <select
                            name="country"
                            className="mb-2 w-full rounded-xl border border-[#E7E7E7] px-3 py-4 text-[#121212] font-medium"
                            onChange={handleChange}
                            value={localData.country}
                        >
                            <option value="">Select...</option>
                            <option value="Nigeria">
                                Nigeria
                            </option>
                        </select>
                        {errors.countryError && (
                            <div className={`flex items-center gap-1`}>
                                <ErrorIcon />
                                <span className="text-sm font-medium text-red-600">
                                    Please select a valid country.
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-base font-medium text-gray-800">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            className={`mb-2 w-full rounded-xl border border-[#E7E7E7] px-3 py-2 text-[#121212] font-medium`}
                            value={localData.address}
                            onChange={handleChange}
                        />
                        {errors.addressError && (
                            <div className={`flex items-center gap-1`}>
                                <ErrorIcon />
                                <span className="text-sm font-medium text-red-600">
                                    Please enter your city or state.
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-base font-medium text-gray-800">
                            City/State
                        </label>
                        <input
                            type="text"
                            name="city"
                            className={`mb-2 w-full rounded-xl border border-[#E7E7E7] px-3 py-2 text-[#121212] font-medium`}
                            value={localData.city}
                            onChange={handleChange}
                        />
                        {errors.cityError && (
                            <div className={`flex items-center gap-1`}>
                                <ErrorIcon />
                                <span className="text-sm font-medium text-red-600">
                                    Please enter your address.
                                </span>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 px-4 ${complete() ? "bg-[#8627FF] cursor-pointer" : "bg-[#D9D9D9] cursor-not-allowed"} text-white rounded-md`}
                        disabled={!complete()}
                    >
                        Proceed
                    </button>
                </form>
            </div>
        </div>
    )
}

export function UpgradeKycThree({ data, onNext, setUpdateKyc }: UpdateKycProps) {
    const requiredDocs = 1;
    const [uploadedDocuments, setUploadedDocuments] = useState<UploadedFile[]>([]);
    const [localData, setLocalData] = useState({
        billType: data.billType || "",
        billTypeFile: data.billTypeFile || ""
    });

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({
        billTypeError: false,
        billTypeFileError: false,
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        const newLocalData = { ...localData, [name]: value };

        if (name === "billType") {
            if (value.trim() === "" || /\d/.test(value)) {
                setErrors((prev) => ({ ...prev, billTypeError: true }));
            } else {
                setErrors((prev) => ({ ...prev, billTypeError: false }));
            }
        }

        setLocalData(newLocalData);
    };

    const handleDocumentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (!files) return;

        const newDocs: UploadedFile[] = [];
        Array.from(files).forEach((file) => {
            // Validate file type
            if (!ALLOWED_FILE_TYPES.includes(file.type)) {
                newDocs.push({
                    file,
                    previewUrl: "",
                    progress: 0,
                    error: "Unsupported file type",
                });
                return;
            }
            // Validate file size
            if (file.size > MAX_FILE_SIZE) {
                newDocs.push({
                    file,
                    previewUrl: "",
                    progress: 0,
                    error: "File size exceeds limit",
                });
                return;
            }
            // Create a preview URL for image files
            let previewUrl = "";
            if (file.type.startsWith("image/")) {
                previewUrl = URL.createObjectURL(file);
            }
            newDocs.push({
                file,
                previewUrl,
                progress: 100,
            });
        });

        // Only allow up to requiredDocs
        setUploadedDocuments((prev) => {
            const combined = [...prev, ...newDocs];
            return combined.slice(0, requiredDocs);
        });
        e.target.value = "";
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

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        handleProceed();
    };

    const handleProceed = async () => {
        setLoading(true)
        const finalFiles = [
            ...uploadedDocuments.map(doc => doc.file)
        ];

        try {
            // Upload all files to Cloudinary
            const uploadedUrls = await Promise.all(finalFiles.map((file) => uploadToCloudinary(file)));

            // Map the URLs to the expected payload structure

            const newLocalData = { ...localData, billTypeFile: uploadedUrls[0] };

            setLocalData(newLocalData);
            console.log("Local Data is: ", newLocalData)

            if (complete()) {
                onNext(newLocalData);
            }
        } catch (error) {
            console.error("Error during file upload and API submission:", error);
            alert("Something went wrong with the submission \nCheck and try again")
        } finally {
            setLoading(false)
        }
    };

    function complete() {
        if (localData.billTypeFile === "" || localData.billType === "" || uploadedDocuments.length < requiredDocs) {
            return false;
        }
        return true;
    }

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 mt-0 overflow-y-scroll"
            onClick={() => setUpdateKyc(prev => ({ ...prev, isUpdated: false }))}
        >
            <div
                className="bg-white rounded-2xl p-6 w-full max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem] mt-20"
                onClick={(e) => { e.stopPropagation() }}
            >
                <h2 className="text-xl font-bold mb-2">
                    Proof of Address
                </h2>
                <p className="text-[#8C8B90] mb-4 text-sm">
                    Upload a proof of address matching your Teir 1 address; document must be under 3 months old.
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="mb-2 block text-base font-medium text-gray-800">
                            Select Document Type
                        </label>
                        <select
                            name="billType"
                            className="mb-2 w-full rounded-xl border border-[#E7E7E7] px-3 py-4 text-[#121212] font-medium"
                            onChange={handleChange}
                            value={localData.billType}
                        >
                            <option value="">Select...</option>
                            <option value="Utility Bill">
                                Utility Bill
                            </option>
                            <option value="Electricity Bill">
                                Electricity Bill
                            </option>
                            <option value="Water Bill">
                                Water Bill
                            </option>
                            <option value="Waste Bill">
                                Waste Bill
                            </option>
                            <option value="Bank Statement (USA Residents Only)">
                                Bank Statement (USA Residents Only)
                            </option>
                        </select>
                        {errors.billTypeError && (
                            <div className={`flex items-center gap-1`}>
                                <ErrorIcon />
                                <span className="text-sm font-medium text-red-600">
                                    Please select a valid document.
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Documents Upload Section */}
                    <div className="mb-6">
                        <label htmlFor="uploadDocuments" className="block text-base font-medium text-black mb-2">
                            Upload Documents ({uploadedDocuments.length}/{requiredDocs})
                        </label>
                        <div
                            className={`relative border-2 border-dashed border-purple rounded-xl p-6 text-center cursor-pointer text-gray-500 flex flex-col items-center ${uploadedDocuments.length >= requiredDocs ? "opacity-50 pointer-events-none" : ""
                                }`}
                        >
                            <Image
                                src="/images/saturn/icon.svg"
                                alt=""
                                width={32}
                                height={32}
                            />
                            <p className="font-medium text-[#8627FF]">
                                Click to upload
                            </p>
                            <p className="text-xs">
                                Supported file types: JPG, PNG, PDF
                            </p>
                            <input
                                type="file"
                                id="uploadDocuments"
                                multiple
                                onChange={handleDocumentsChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            Note: Acceptable document must be less than 3 month
                        </p>
                    </div>

                    <div className="space-y-4 mb-6">
                        {uploadedDocuments.map((fileObj, index) => (
                            <div key={index} className="border rounded-md p-3 flex items-center gap-3 relative w-full">
                                {/* Show preview for image files */}
                                {!fileObj.error && fileObj.previewUrl ? (
                                    <Image
                                        src={fileObj.previewUrl}
                                        alt={fileObj.file.name}
                                        className="w-12 h-12 object-cover rounded"
                                        width={32}
                                        height={48}
                                    />
                                ) : (
                                    <div className="w-12 h-12 flex items-center justify-center bg-gray-100 text-gray-500 rounded">
                                        {fileObj.file.type === "application/pdf" && !fileObj.error ? (
                                            <PdfErrorIcon />
                                        ) : (
                                            <ImageErrorIcon />
                                        )}
                                    </div>
                                )}
                                <div className="w-1/2 flex-1">
                                    <p className="text-sm font-medium text-gray-700 truncate">
                                        {fileObj.file.name}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {(fileObj.file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                    {fileObj.error ? (
                                        <p className="text-xs text-red-500 font-medium mt-1">{fileObj.error}</p>
                                    ) : (
                                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                            <div className="bg-[#8627FF] h-2 rounded-full" style={{ width: `${fileObj.progress}%` }} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center space-x-2 text-gray-500">
                                    <button
                                        className="focus:outline-none hover:text-red-600 cursor-pointer"
                                        title="Remove"
                                        onClick={() =>
                                            setUploadedDocuments((prev) => prev.filter((_, i) => i !== index))
                                        }
                                    >
                                        <TrashIcon />
                                    </button>
                                    {!fileObj.error && <span className="text-sm text-gray-400">{fileObj.progress}%</span>}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 px-4 ${complete() ? "bg-[#8627FF] cursor-pointer" : "bg-[#D9D9D9] cursor-not-allowed"} text-white rounded-md flex justify-center`}
                        disabled={!complete()}
                    >
                        {loading ? <ActivityIndicator /> : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export function UpgradeKycZero({ data, onNext, setUpdateKyc }: UpdateKycProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [localData, setLocalData] = useState({
        country: data.country,
        address: data.address,
        city: data.city
    });

    function handleSubmit() {
        onNext(localData)
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 mt-0 overflow-y-scroll"
            onClick={() => setUpdateKyc(prev => ({ ...prev, isUpdated: false }))}
        >
            <div
                className="bg-white rounded-2xl p-6 w-full max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem]"
                onClick={(e) => { e.stopPropagation() }}
            >
                <h2 className="text-xl font-bold mb-2">
                    Upgrade Account to KYC 2
                </h2>
                <p className="text-[#8C8B90] mb-4 text-sm">
                    Upload the following documents to verify your KYC.
                </p>

                <h2 className="text-base font-semibold mb-2">
                    Documents required
                </h2>

                <ul className="list-disc ml-5 space-y-1 text-gray-700 text-sm mb-12">
                    <li>Government ID</li>
                    <li>Proof of Address</li>
                </ul>

                <button
                    className={`w-full py-2 px-4 bg-[#8627FF] cursor-pointer text-white rounded-md`}
                    onClick={() => handleSubmit()}
                >
                    Proceed
                </button>
            </div>
        </div>
    )
}