"use client"

import { ColumnDef } from '@tanstack/react-table'
import { Payment } from "@/types/payment";

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: 'number',
        header: 'Número'
    },
    {
        accessorKey: 'paymentDate',
        header: 'Fecha de pago'
    },
    {
        accessorKey: 'amortization',
        header: 'Amortización',
        cell: ({ row }) => {
            const amount = parseFloat(
                (row.getValue("amortization") as number || 0).toFixed(2)
            )
            if (amount === 0) return <div className="text-right font-medium">-</div>

            const formatted = new Intl.NumberFormat('es-PE', {
                style: 'currency',
                currency: 'PEN'
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        }
    },
    {
        accessorKey: 'interest',
        header: 'Interés',
        cell: ({ row }) => {
            const amount = parseFloat(
                (row.getValue("interest") as number || 0).toFixed(2)
            )

            if (amount === 0) return <div className="text-right font-medium">-</div>

            const formatted = new Intl.NumberFormat('es-PE', {
                style: 'currency',
                currency: 'PEN'
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        }
    },
    {
        accessorKey: 'lifeInsurance',
        header: 'Seguro de desgravamen',
        cell: ({ row }) => {
            const amount = parseFloat(
                (row.getValue("lifeInsurance") as number || 0).toFixed(2)
            )

            if (amount === 0) return <div className="text-right font-medium">-</div>

            const formatted = new Intl.NumberFormat('es-PE', {
                style: 'currency',
                currency: 'PEN'
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        }
    },
    {
        accessorKey: 'carInsurance',
        header: 'Seguro vehicular',
        cell: ({ row }) => {
            const amount = parseFloat(
                (row.getValue("carInsurance") as number || 0).toFixed(2)
            )

            if (amount === 0) return <div className="text-right font-medium">-</div>

            const formatted = new Intl.NumberFormat('es-PE', {
                style: 'currency',
                currency: 'PEN'
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        }
    },
    {
        accessorKey: 'postage',
        header: 'Portes',
        cell: ({ row }) => {
            const amount = parseFloat(
                (row.getValue("postage") as number || 0).toFixed(2)
            )

            if (amount === 0) return <div className="text-right font-medium">-</div>

            const formatted = new Intl.NumberFormat('es-PE', {
                style: 'currency',
                currency: 'PEN'
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        }
    },
    {
        accessorKey: 'balance',
        header: 'Saldo',
        cell: ({ row }) => {
            const amount = parseFloat(
                (row.getValue("balance") as number || 0).toFixed(2)
            )
            const formatted = new Intl.NumberFormat('es-PE', {
                style: 'currency',
                currency: 'PEN'
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        }
    }
]