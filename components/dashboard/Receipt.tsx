import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Image from 'next/image';
import { Transaction } from '../transactions-table';
import { NumericFormat } from 'react-number-format';
import { format } from 'date-fns';
import { CopyIcon } from '../saturn/SVG';
import { Investment } from '../investment-table';

interface ReceiptPageProps {
    data: Transaction;
    onClose: () => void;
}

export function TransactionsReceiptPage({ data, onClose }: ReceiptPageProps) {
    const receiptRef = useRef<HTMLDivElement>(null);

    const downloadPdf = async () => {
        if (!receiptRef.current) return;

        // 1. Render the receipt DIV into a canvas
        const canvas = await html2canvas(receiptRef.current, {
            scale: 2,            // increase resolution
            useCORS: true,       // if you have external images
        });

        // 2. Convert canvas to image and add to jsPDF
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4',
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, imgHeight);
        pdf.save(`receipt-${data.id}.pdf`);

        onClose();
    };

    function DetailRow({ label, value, icon }: { label: string, value: string | number, icon?: boolean }) {
        return (
            <div className="flex justify-between text-sm text-black mb-4">
                <span className="">{label}</span>
                <span className={`flex gap-2 items-center ${label === "Transaction ID" ? "font-bold text-purple text-base" : "font-semibold"}`}>
                    {
                        typeof value === 'number' ?
                            <NumericFormat
                                value={value}
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                            />
                            : value
                    }
                    {
                        icon && <CopyIcon />
                    }
                </span>
            </div>
        );
    }

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0 overflow-y-scroll"
            onClick={handleBackdropClick}
        >
            <div
                className="w-full mx-auto max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem] p-6 bg-white rounded-lg shadow  mt-24 mb-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Receipt preview */}
                <div
                    ref={receiptRef}
                    className=""
                >
                    {/* Replicate your Tailwind-styled receipt here */}
                    <header className='flex justify-between items-center mb-12'>
                        <Image
                            src={"/images/dashboard/logos.svg"}
                            width={112}
                            height={26}
                            alt=""
                            className=""
                        />
                        <p className='text-lg'>Transaction Details</p>
                    </header>
                    <div className="text-center mb-12">
                        <h2 className='text-[#1C1B1F] text-2xl font-bold'>
                            <NumericFormat
                                value={data.amountInvested}
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                            />
                        </h2>
                        <p className='text-green-500'>{data.status}</p>
                        <p className='text-[#A29999]'>
                            {format(data.startDate, "dd MM, yyyy hh:mm:ss")}
                        </p>
                    </div>

                    <div className="border border-[#E7E7E7] bg-#FBFBFB rounded-xl p-4 mt-6 space-y-2 text-left">
                        <DetailRow label="Transaction ID" value={data.id} />
                        <DetailRow label="Investment Name" value={data.type} />
                        <DetailRow label="Current Balance" value={data.currentAmount} />
                        <DetailRow label="New Balance" value={data.totalEarnings} />
                        <DetailRow label="Maturity Date" value={format(data.maturityDate, "dd-MM-yyyy")} />
                        <DetailRow label="Expected Returns" value={data.earningsWithdrawn} />
                        <DetailRow label="Payment Method" value={data.paymentMethod} />
                    </div>
                </div>

                {/* Download button */}
                <button
                    onClick={downloadPdf}
                    className="mt-6 bg-purple text-white px-6 py-2 rounded w-fit mx-auto block"
                >
                    Download Receipt
                </button>
            </div>
        </div>
    );
}

interface InvestmentReceiptProps {
    data: Investment;
    onClose: () => void;
}

export function InvestmentReceiptPage({ data, onClose }: InvestmentReceiptProps) {
    const receiptRef = useRef<HTMLDivElement>(null);

    const downloadPdf = async () => {
        if (!receiptRef.current) return;

        // 1. Render the receipt DIV into a canvas
        const canvas = await html2canvas(receiptRef.current, {
            scale: 2,            // increase resolution
            useCORS: true,       // if you have external images
        });

        // 2. Convert canvas to image and add to jsPDF
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4',
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, imgHeight);
        pdf.save(`receipt-${data.id}.pdf`);

        onClose();
    };

    function DetailRow({ label, value, icon }: { label: string, value: string | number, icon?: boolean }) {
        return (
            <div className="flex justify-between text-sm text-black mb-4">
                <span className="">{label}</span>
                <span className={`flex gap-2 items-center ${label === "Transaction ID" ? "font-bold text-purple text-base" : "font-semibold"}`}>
                    {
                        typeof value === 'number' ?
                            <NumericFormat
                                value={value}
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                            />
                            : value
                    }
                    {
                        icon && <CopyIcon />
                    }
                </span>
            </div>
        );
    }

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0 overflow-y-scroll"
            onClick={handleBackdropClick}
        >
            <div
                className="w-full mx-auto max-w-[22.5rem] md:max-w-sm xl:max-w-[30rem] p-6 bg-white rounded-lg shadow  mt-24 mb-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Receipt preview */}
                <div
                    ref={receiptRef}
                    className=""
                >
                    {/* Replicate your Tailwind-styled receipt here */}
                    <header className='flex justify-between items-center mb-12'>
                        <Image
                            src={"/images/dashboard/logos.svg"}
                            width={112}
                            height={26}
                            alt=""
                            className=""
                        />
                        <p className='text-lg'>Transaction Details</p>
                    </header>
                    <div className="text-center mb-12">
                        <h2 className='text-[#1C1B1F] text-2xl font-bold'>
                            <NumericFormat
                                value={data.amountInvested}
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                            />
                        </h2>
                        <p className='text-green-500'>{data.status}</p>
                        <p className='text-[#A29999]'>
                            {format(data.startDate, "dd MM, yyyy hh:mm:ss")}
                        </p>
                    </div>

                    <div className="border border-[#E7E7E7] bg-#FBFBFB rounded-xl p-4 mt-6 space-y-2 text-left">
                        <DetailRow label="Transaction ID" value={data.id} />
                        <DetailRow label="Investment Name" value={data.type} />
                        <DetailRow label="Current Balance" value={data.currentAmount} />
                        <DetailRow label="New Balance" value={data.totalEarnings} />
                        <DetailRow label="Maturity Date" value={format(data.maturityDate, "dd-MM-yyyy")} />
                        <DetailRow label="Expected Returns" value={data.earningsWithdrawn} />
                    </div>
                </div>

                {/* Download button */}
                <button
                    onClick={downloadPdf}
                    className="mt-6 bg-purple text-white px-6 py-2 rounded w-fit mx-auto block"
                >
                    Download Receipt
                </button>
            </div>
        </div>
    );
}