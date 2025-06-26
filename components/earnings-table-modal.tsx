import { Earning } from "./earnings-table";
import { format } from "date-fns";
import { NumericFormat } from "react-number-format";

interface EarningDetailsModalProps {
    investment: Earning | null
    isOpen: boolean
    onClose: () => void
}

export function EarningDetailsModal({ investment, isOpen, onClose }: EarningDetailsModalProps) {
    return (
        (investment && isOpen) ?
            <>
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0"
                    onClick={onClose}
                >
                    <div
                        className="bg-white rounded-2xl p-6 w-full max-w-[21rem] md:max-w-sm xl:max-w-[30rem]"
                        onClick={(e) => { e.stopPropagation() }}
                    >
                        <div className="p-4 flex flex-col items-center">
                            <h2 className="text-xl font-bold mb-1 text-center text-[#1C1B1F]">{investment.type}</h2>
                            <p className="text-purple text-sm text-center mb-1">{`${investment.roi}%`}</p>
                            <div className={`flex gap-1 text-xs p-2 rounded-xl ${investment.status === "Withdrawn" || "Re-invested" ? "text-green-600 bg-green-50" : ""} ${investment.status === "Pending" ? "text-[#7A4F07] bg-[#E8B55D]" : ""} ${investment.status === "Completed" ? "text-purple bg-[#F3E9FF]" : ""}`}>
                                {investment.status}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-6">
                            <div className="bg-white rounded border border-[#EBEBEB] p-2 flex flex-col">
                                <p className="text-[10px] text-[#606060]">
                                    Investment Amount
                                </p>
                                <NumericFormat
                                    value={investment.amountInvested}
                                    displayType="text"
                                    thousandSeparator
                                    prefix="$"
                                />
                            </div>
                            <div className="bg-white rounded border border-[#EBEBEB] p-2 flex flex-col">
                                <p className="text-[10px] text-[#606060]">
                                    Start Date
                                </p>
                                <p>
                                    {format(investment.startDate, "dd-MM-yyyy")}
                                </p>
                            </div>
                            <div className="bg-white rounded border border-[#EBEBEB] p-2 flex flex-col">
                                <p className="text-[10px] text-[#606060]">
                                    Maturity Date
                                </p>
                                <p>
                                    {format(investment.maturityDate, "dd-MM-yyyy")}
                                </p>
                            </div>
                            <div className="bg-white rounded border border-[#EBEBEB] p-2 flex flex-col">
                                <p className="text-[10px] text-[#606060]">
                                    Total Earnings
                                </p>
                                <NumericFormat
                                    value={investment.totalEarnings}
                                    displayType="text"
                                    thousandSeparator
                                    prefix="$"
                                />
                            </div>
                            <div className="bg-white rounded border border-[#EBEBEB] p-2 flex flex-col">
                                <p className="text-[10px] text-[#606060]">
                                    Earnings Withdrawn
                                </p>
                                <NumericFormat
                                    value={investment.earningsWithdrawn}
                                    displayType="text"
                                    thousandSeparator
                                    prefix="$"
                                />
                            </div>
                            <div className="bg-white rounded border border-[#EBEBEB] p-2 flex flex-col">
                                <p className="text-[10px] text-[#606060]">
                                    Earnings Balance
                                </p>
                                <NumericFormat
                                    value={investment.totalEarnings - investment.earningsWithdrawn}
                                    displayType="text"
                                    thousandSeparator
                                    prefix="$"
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            className={`py-2 px-4 bg-white border border-[#D6D6D6] text-[#1C1B1F] rounded-md w-40 mx-auto block`}
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </>
            :
            <></>

    )
}