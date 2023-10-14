import {AxiosResponse} from "axios";

import {getOne} from "@/services/plan-service";
import {DataTable} from "@/app/plans/[id]/data-table";
import {columns} from "@/app/plans/[id]/columns";
import {Payment} from "@/types/payment";
import {Loan} from "@/types/loan";
import {Card, CardContent, CardDescription, CardHeader} from "@/components/ui/card";

interface PlanResponse {
    plan: {
        id: string,
        loan: Loan,
        payments: Payment[]
        stats: any
    }
}

export default async function PlanDetailsPage(
    {params: {id}}: { params: { id: string } }
) {
    const {data}: AxiosResponse<PlanResponse> = await getOne(id)
    const {loan, payments, stats} = data.plan

    // Add the disbursement payment
    payments.unshift({
        number: 0,
        balance: loan.totalAmount * (100 - loan.downPaymentPercentage) / 100,
    } as Payment)

    const payload: Payment[] = payments.map((payment, index) => {
        return {...payment, currency: loan.currency}
    }).sort((x: Payment, y: Payment) => x.number - y.number)


    return (
        <div className="container mx-auto p-10">
            <h1 className="text-2xl font-bold">Payment plan Details</h1>
            <div className="flex items-center">
                <Card
                >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        Tasa Efectiva Anual
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {parseFloat(stats.APR).toFixed(2)}%
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        Datos de Entrada
                    </CardHeader>
                    <CardDescription>

                    </CardDescription>
                </Card>
            </div>
            <DataTable
                columns={columns}
                data={payload}
            />
            <span className="text-gray-300">Payment: {id}</span>
        </div>
    )
}
