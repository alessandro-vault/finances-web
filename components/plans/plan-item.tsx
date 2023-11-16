import { formatCurrency } from "@/lib/currency";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Plan } from "@/types/plan";
import Link from "next/link";

interface PlanProps {
  plan: Plan
}

const PlanItem = ({ plan }: PlanProps) => (
  <TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Link
        href={`plans/${plan.id}`}
        className="duration-300"
      >
        <Card className="hover:bg-slate-50 dark:hover:bg-slate-900">
          <CardHeader>
            <CardTitle>Préstamo {plan.loan.id}</CardTitle>
            <CardDescription>
              Fecha de préstamo:{" "}
              {format(new Date(plan.loan.date), "PP")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-5">
            <section className="flex justify-between gap-x-10">
              <div className="flex flex-col items-center">
                <span className="text-gray-500 text-xs">
                  {" "}
                  Monto total
                </span>
                {formatCurrency(
                  plan.stats.totalAmount,
                  plan.loan.currency,
                )}
              </div>
              <div className="flex flex-col items-center">
                <span className="text-gray-500 text-xs">
                  {" "}
                  Cuota inicial
                </span>
                {formatCurrency(
                  plan.stats.downPayment,
                  plan.loan.currency,
                )}
              </div>
              <div className="flex flex-col items-center">
                <span className="text-red-500 text-xs">
                  {" "}
                  Monto restante
                </span>
                {formatCurrency(
                  plan.stats.remainingAmount,
                  plan.loan.currency,
                )}
              </div>
            </section>
            <Separator className="my" />
            <section className="flex gap-x-5">
              <div>
                <span className="text-gray-500 text-xs">
                  Seguro de desgravamen
                  <p>{plan.stats.lifeInsurance * 100} %</p>
                </span>
              </div>
              <div>
                <span className="text-gray-500 text-xs">
                  Seguro vehicular
                  <p>{plan.stats.carInsurance * 100} %</p>
                </span>
              </div>
            </section>
            <Separator className="my" />
            <section className="flex gap-x-3 justify-between">
              <div className="flex flex-col items-center">
                <span className="text-gray-500 text-xs">
                  {plan.loan.rateType === "EFFECTIVE" ? "TEA" : "TNA"}
                </span>
                {(plan.loan.rate * 100).toFixed(2)}%
              </div>
              <div className="flex flex-col items-center">
                <span className="text-gray-500 text-xs">
                  Cuota mensual
                </span>
                {formatCurrency(
                  plan.stats.monthlyPayment,
                  plan.loan.currency,
                )}
              </div>
              <div className="flex flex-col items-center">
                <span className="text-gray-500 text-xs">
                  Número de cuotas
                </span>
                {plan.stats.numberOfPayments}
              </div>
              <div className="flex flex-col items-center">
                <span className="text-gray-500 text-xs">Portes</span>
                {formatCurrency(plan.stats.postage, plan.loan.currency)}
              </div>
            </section>
          </CardContent>
        </Card>
      </Link>
    </TooltipTrigger>
    <TooltipContent className="flex flex-col" sideOffset={-20}>
      <span>TEA {(plan.loan.rate * 100).toFixed(2)}%</span>
      <span>TCEA {(plan.stats.EAR * 100).toFixed(2)}%</span>
      <Separator className="my" />
      <span>TEM {(plan.stats.MPR * 100).toFixed(2)}%</span>
      <span>TIR {(plan.stats.IRR * 100).toFixed(2)}%</span>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
);

export default PlanItem;
