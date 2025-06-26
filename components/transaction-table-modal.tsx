import { Transaction } from "./transactions-table";
import { format } from "date-fns";
import { NumericFormat } from "react-number-format";

interface TransactionDetailsModalProps {
    investment: Transaction | null
    isOpen: boolean
    onClose: () => void
}

export function TransactionDetailsModal({ investment, isOpen, onClose }: TransactionDetailsModalProps) {
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
                            <p className="text-purple text-sm text-center mb-1">{investment.id}</p>
                            <div 
                                className={`flex gap-1 text-xs p-2 rounded-xl ${investment.status === "Active" ? "text-green-600 bg-green-50" : ""} ${investment.status === "Pending" ? "text-[#7A4F07] bg-[#E8B55D]" : ""}`}
                            >
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
                                    Payment Method
                                </p>
                                <p>
                                    {`${investment.paymentMethod}`}
                                </p>
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

// export function InvestmentDetailsModal({ investment, isOpen, onClose }: InvestmentDetailsModalProps) {
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="">
//         {investment && (
//           <>
//             <DialogHeader>
//               <div className="flex flex-col md:flex-row bg-red-500 justify-between items-start w-full">
//                 <div className="flex flex-col">
//                   <DialogTitle className="text-2xl">{investment.type}</DialogTitle>
//                   <p className="text-muted-foreground mt-1 text-purple">{investment.id}</p>
//                 </div>
//                 <Badge variant="outline" className="text-green-600 bg-green-50 text-sm">
//                   {investment.status}
//                 </Badge>
//               </div>
//             </DialogHeader>

//             <div className="space-y-6">
//               <div className="flex gap-4">
//                 <Button variant="outline" className="flex-1">
//                   Request Payout
//                 </Button>
//                 <Button variant="outline" className="flex-1">
//                   Fund Investment
//                 </Button>
//               </div>

//               <div className="grid grid-cols-2 gap-6">
//                 <DetailItem label="Amount Investment" value={investment.amountInvested} isCurrency />
//                 <DetailItem label="Start Date" value={format(investment.startDate, "dd-MM-yyyy")} />
//                 <DetailItem label="Maturity Date" value={format(investment.maturityDate, "dd-MM-yyyy")} />
//                 <DetailItem label="Total Earnings" value={investment.totalEarnings} isCurrency />
//                 <DetailItem label="Return Rate" value={`${investment.returnRate}%`} />
//                 <DetailItem label="Earnings Withdrawn" value={investment.earningsWithdrawn} isCurrency />
//               </div>

//               <div className="border-t pt-4">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="font-semibold">Recent Investments</h3>
//                   <select className="border rounded px-3 py-1 text-sm">
//                     <option>Sort By</option>
//                   </select>
//                 </div>

//                 <div className="border rounded-lg">
//                   <div className="grid grid-cols-4 bg-gray-50 px-4 py-2 text-sm font-medium">
//                     <span>Amt Invested</span>
//                     <span>Total Earning</span>
//                     <span>Date & Time</span>
//                     <span>Status</span>
//                   </div>

//                   {investment.recentInvestments.map((item, index) => (
//                     <div key={index} className="grid grid-cols-4 px-4 py-3 text-sm border-t">
//                       <NumericFormat
//                         value={item.amountInvested}
//                         displayType="text"
//                         thousandSeparator
//                         prefix="$"
//                       />
//                       <NumericFormat
//                         value={item.totalEarning}
//                         displayType="text"
//                         thousandSeparator
//                         prefix="$"
//                       />
//                       <span>{format(item.date, "d MMM, yyyy")}</span>
//                       <Badge variant="outline" className="justify-self-start">
//                         {item.status}
//                       </Badge>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="flex justify-end mt-4 text-sm text-muted-foreground">
//                   1-2 of 2
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </DialogContent>
//     </Dialog>
//   )
// }

// function DetailItem({ label, value, isCurrency }: { label: string; value: string | number; isCurrency?: boolean }) {
//     return (
//         <div className="space-y-1">
//             <p className="text-sm text-muted-foreground">{label}</p>
//             {isCurrency ? (
//                 <NumericFormat
//                     value={value}
//                     displayType="text"
//                     thousandSeparator
//                     prefix="$"
//                     className="text-sm font-medium"
//                 />
//             ) : (
//                 <p className="text-sm font-medium">{value}</p>
//             )}
//         </div>
//     )
// }