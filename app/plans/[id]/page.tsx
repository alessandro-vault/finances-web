import { AxiosResponse } from "axios";

import { getOne } from "@/services/plan-service";
import { DataTable } from "@/app/plans/[id]/data-table";
import { columns } from "@/app/plans/[id]/columns";
import { Payment } from "@/types/payment";
import { Loan } from "@/types/loan";

interface PlanResponse {
  plan: {
    id: string,
    loan: Loan,
    payments: Payment[]
  }
}
export default async function PlanDetailsPage(
    { params : { id } } : { params: { id: string } }
) {
  const { data }: AxiosResponse<PlanResponse> = await getOne(id)
  const { loan, payments } = data.plan

  payments.unshift({
    number: 0,
    balance: loan.totalAmount * (100 - loan.downPaymentPercentage) / 100
  } as Payment)

  return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={payments.sort((x, y) => x.number - y.number)} />
      </div>
  )
}