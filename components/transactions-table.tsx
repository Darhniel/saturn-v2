import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/data-table"
import { format } from "date-fns"
import { NumericFormat } from "react-number-format"
import { MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { EyeIcon } from "./saturn/SVG";
import { PlusIcon, ArrowUpRightIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react"


export type Transaction = {
    id: string
    amountInvested: number
    type: string
    paymentMethod: string
    currentAmount: number
    payoutDate: Date
    status: string
    // status: "Active" | "Closed" | "Pending"
    startDate: Date
    maturityDate: Date
    totalEarnings: number
    earningsWithdrawn: number
    recentInvestments: {
        amountInvested: number
        totalEarning: number
        date: Date
        status: string
    }[]
}

interface TransactionsTableProps {
    data: Transaction[]
    onViewDetails: (investment: Transaction) => void
    onTopUp: (investment: Transaction) => void
    onRequest: (investment: Transaction) => void
    onDownload: (investment: Transaction) => void
}

export function TransactionsTable({ data, onViewDetails, onTopUp, onRequest, onDownload }: TransactionsTableProps) {
    const columns = useMemo<ColumnDef<Transaction>[]>(() => [
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
            accessorKey: "paymentMethod",
            header: "Payment Method",
            cell: ({ row }) => `${row.getValue("paymentMethod")}`,
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