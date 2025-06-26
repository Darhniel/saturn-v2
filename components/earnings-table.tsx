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


export type Earning = {
    type: string
    amountInvested: number
    earnings: number
    roi: number
    maturityDate: Date
    status: string
    // status: "Active" | "Closed" | "Pending"
    startDate: Date
    totalEarnings: number
    earningsWithdrawn: number
    recentInvestments: {
        amountInvested: number
        totalEarning: number
        date: Date
        status: string
    }[]
}
interface EarningsTableProps {
    data: Earning[]
    onViewDetails: (investment: Earning) => void
    onTopUp: (investment: Earning) => void
    onRequest: (investment: Earning) => void
}

export function EarningsTable({ data, onViewDetails, onRequest, onTopUp }: EarningsTableProps) {
    const columns = useMemo<ColumnDef<Earning>[]>(() => [
        {
            accessorKey: "type",
            header: "Investment Type",
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
            accessorKey: "earnings",
            header: "Total Earning",
            cell: ({ row }) => (
                <NumericFormat
                    value={row.getValue("earnings")}
                    displayType="text"
                    thousandSeparator
                    prefix="$"
                />
            ),
        },
        {
            accessorKey: "roi",
            header: "Return Rate",
            cell: ({ row }) => `${row.getValue("roi")}%`,
        },
        {
            accessorKey: "maturityDate",
            header: "Maturity Date & Time",
            cell: ({ row }) => format(row.getValue("maturityDate"), "d MMM, yyyy h:mma"),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const value = row.getValue("status") as string;
                return (
                    <Badge variant="outline" className={`${value === "Withdrawn" || "Re-Invested" ? "text-green-600 bg-green-50" : ""} ${value === "Pending" ? "text-[#7A4F07] bg-[#E8B55D]" : ""} ${value === "Completed" ? "text-purple bg-[#F3E9FF]" : ""}`}>
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
                            <DropdownMenuItem className="text-sm cursor-pointer">
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