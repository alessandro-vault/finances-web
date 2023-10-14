"use client"

import { ColumnDef } from '@tanstack/react-table'
import { Payment } from "@/types/payment";
import { formatCurrency } from "@/lib/currency";

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: 'number',
        header: () => {
            return (
                <div className="text-center font-bold">
                    Cuota
                </div>
            )
        },
        cell: ({ row }) => {
            const number = row.getValue("number") as number
            return <div className="text-center font-bold text-base">{number}</div>
        }
    },
    {
        accessorKey: 'paymentDate',
        header: 'Fecha'
    },
    {
        accessorKey: 'amortization',
        header: 'Amortización',
        cell: ({ row }) => {
            const value = row.getValue("amortization") as number
            const currency = row.original.currency as string

            if (value === undefined) return null

            const amount = parseFloat((value).toFixed(2))

            return (
                <div className="text-right font-medium">
                    {formatCurrency(amount, currency)}
                </div>
            )
        }
    },
    {
        accessorKey: 'interest',
        header: 'Interés',
        cell: ({ row }) => {
            const value = row.getValue("interest") as number
            const currency = row.original.currency as string

            if (value === undefined) return null

            const amount = parseFloat((value).toFixed(2))

            return (
                <div className="text-right font-medium">
                    {formatCurrency(amount, currency)}
                </div>
            )
        }
    },
    {
        accessorKey: 'lifeInsurance',
        header: 'Desgravamen',
        cell: ({ row }) => {
            const value = row.getValue("lifeInsurance") as number
            const currency = row.original.currency as string

            if (value === undefined) return null

            const amount = parseFloat((value).toFixed(2))

            return (
                <div className="text-right font-medium">
                    {formatCurrency(amount, currency)}
                </div>
            )
        }
    },
    {
        accessorKey: 'carInsurance',
        header: 'Seguro vehicular',
        cell: ({ row }) => {
            const value = row.getValue("carInsurance") as number
            const currency = row.original.currency as string

            if (value === undefined) return null

            const amount = parseFloat((value).toFixed(2))

            return (
                <div className="text-right font-medium">
                    {formatCurrency(amount, currency)}
                </div>
            )
        }
    },
    {
        accessorKey: 'postage',
        header: 'Portes',
        cell: ({ row }) => {
            const value = row.getValue("postage") as number
            const currency = row.original.currency as string

            if (value === undefined) return null

            const amount = parseFloat((value).toFixed(2))

            return (
                <div className="text-right font-medium">
                    {formatCurrency(amount, currency)}
                </div>
            )
        }
    },
    {
        accessorKey: 'balance',
        header: 'Saldo',
        cell: ({ row }) => {

            const value = row.getValue("balance") as number
            const currency = row.original.currency as string

            if (value === undefined) return null

            const amount = parseFloat((value).toFixed(2))

            return (
                <div className="text-right font-medium">
                    {formatCurrency(amount, currency)}
                </div>
            )
        }
    }
]