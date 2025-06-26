import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/data-table"
import { format } from "date-fns"
import { NumericFormat } from "react-number-format"
import { MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { EyeIcon } from "./saturn/SVG";
import { PlusIcon, ArrowUpRightIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react"

export type Investment = {
    id: string
    amountInvested: number
    type: string
    roi: number
    currentAmount: number
    payoutDate: Date
    status: string
    // status: "Active" | "Closed" | "Pending"
    startDate: Date
    maturityDate: Date
    totalEarnings: number
    returnRate: number
    earningsWithdrawn: number
    recentInvestments: {
        amountInvested: number
        totalEarning: number
        date: Date
        status: string
    }[]
}

// export const columns: ColumnDef<Investment>[] = [
//     {
//         accessorKey: "id",
//         header: "Transaction ID",
//         cell: ({ row }) => {
//             const text = row.getValue("id") as string;
//             return (
//                 <span className="text-purple">
//                     {text}
//                 </span>
//             )
//         }
//     },
//     {
//         accessorKey: "amountInvested",
//         header: "Amt Invested",
//         cell: ({ row }) => (
//             <NumericFormat
//                 value={row.getValue("amountInvested")}
//                 displayType="text"
//                 thousandSeparator
//                 prefix="$"
//             />
//         ),
//     },
//     {
//         accessorKey: "type",
//         header: "Investment Type",
//     },
//     {
//         accessorKey: "roi",
//         header: "Current ROI (%)",
//         cell: ({ row }) => `${row.getValue("roi")}%`,
//     },
//     {
//         accessorKey: "currentAmount",
//         header: "Current Amt",
//         cell: ({ row }) => (
//             <NumericFormat
//                 value={row.getValue("currentAmount")}
//                 displayType="text"
//                 thousandSeparator
//                 prefix="$"
//             />
//         ),
//     },
//     {
//         accessorKey: "payoutDate",
//         header: "Monthly Date & Time",
//         cell: ({ row }) => format(row.getValue("payoutDate"), "d MMM, yyyy h:mma"),
//     },
//     {
//         accessorKey: "status",
//         header: "Status",
//         cell: ({ row }) => {
//             const value = row.getValue("status") as string;
//             return (
//                 <Badge variant="outline" className={`${value === "Active" || "Re-invested" ? "text-green-600 bg-green-50" : ""} ${value === "Pending" ? "text-[#7A4F07] bg-[#E8B55D]" : ""}`}>
//                     {row.getValue("status")}
//                 </Badge>
//             )
//         },
//     },
//     {
//         id: "actions",
//         enableHiding: false,
//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//         cell: ({ row }) => {
//             return (
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" className="h-8 w-8 p-0">
//                             <span className="sr-only">Open menu</span>
//                             <MoreVertical />
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                         {/* <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                          */}
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem
//                             className="text-sm cursor-pointer"
//                             onClick={() => onViewDetails(row.original)}
//                         >
//                             <EyeIcon />
//                             View Details
//                         </DropdownMenuItem>
//                         <DropdownMenuItem className="text-sm cursor-pointer">
//                             <PlusIcon
//                                 width={24}
//                                 height={24}
//                             />
//                             Top Up with Returns
//                         </DropdownMenuItem>
//                         <DropdownMenuItem className="text-sm cursor-pointer">
//                             <ArrowUpRightIcon
//                                 width={24}
//                                 height={24}
//                             />
//                             Request Payout
//                         </DropdownMenuItem>
//                         <DropdownMenuItem className="text-sm cursor-pointer">
//                             <ArrowDownTrayIcon
//                                 width={24}
//                                 height={24}
//                             />
//                             Download Receipt
//                         </DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             )
//         },
//     },
// ]

interface InvestmentsTableProps {
    data: Investment[]
    onViewDetails: (investment: Investment) => void
    onTopUp: (investment: Investment) => void
    onRequest: (investment: Investment) => void
    onDownload: (investment: Investment) => void
}

export function InvestmentsTable({ data, onViewDetails, onTopUp, onRequest, onDownload }: InvestmentsTableProps) {
    const columns = useMemo<ColumnDef<Investment>[]>(() => [
        {
            accessorKey: "id",
            header: "Transaction ID",
            cell: ({ row }) => {
                const text = row.getValue("id") as string;
                return (
                    <span className="text-purple">
                        {text}
                    </span>
                )
            }
        },
        {
            accessorKey: "amountInvested",
            header: "Amt Invested",
            cell: ({ row }) => (
                <NumericFormat
                    value={row.getValue("amountInvested")}
                    displayType="text"
                    thousandSeparator
                    prefix="$"
                />
            ),
        },
        {
            accessorKey: "type",
            header: "Investment Type",
        },
        {
            accessorKey: "roi",
            header: "Current ROI (%)",
            cell: ({ row }) => `${row.getValue("roi")}%`,
        },
        {
            accessorKey: "currentAmount",
            header: "Current Amt",
            cell: ({ row }) => (
                <NumericFormat
                    value={row.getValue("currentAmount")}
                    displayType="text"
                    thousandSeparator
                    prefix="$"
                />
            ),
        },
        {
            accessorKey: "payoutDate",
            header: "Monthly Date & Time",
            cell: ({ row }) => format(row.getValue("payoutDate"), "d MMM, yyyy h:mma"),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const value = row.getValue("status") as string;
                return (
                    <Badge variant="outline" className={`${value === "Active" || "Re-invested" ? "text-green-600 bg-green-50" : ""} ${value === "Pending" ? "text-[#7A4F07] bg-[#E8B55D]" : ""}`}>
                        {row.getValue("status")}
                    </Badge>
                )
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel>
                             */}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-sm cursor-pointer"
                                onClick={() => onViewDetails(row.original)}
                            >
                                <EyeIcon />
                                View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                className="text-sm cursor-pointer"
                                onClick={() => onTopUp(row.original)}
                            >
                                <PlusIcon
                                    width={24}
                                    height={24}
                                />
                                Top Up with Returns
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                className="text-sm cursor-pointer"
                                onClick={() => onRequest(row.original)}
                            >
                                <ArrowUpRightIcon
                                    width={24}
                                    height={24}
                                />
                                Request Payout
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                className="text-sm cursor-pointer"
                                onClick={() => onDownload(row.original)}
                            >
                                <ArrowDownTrayIcon
                                    width={24}
                                    height={24}
                                />
                                Download Receipt
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ], [onViewDetails])
    return <DataTable columns={columns} data={data} />
}