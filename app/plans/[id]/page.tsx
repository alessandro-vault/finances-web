"use client";

import { useEffect, useState } from "react";
import { Plan } from "@/types/plan";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/currency";
import { DataTable } from "@/components/plans/show/data-table";
import { columns } from "@/components/plans/show/columns";
import { Payment } from "@/types/payment";

export default function PlanDetailsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [state, setState] = useState<{
    plan: Plan | null;
    loading: boolean;
    error: any;
  }>({ plan: null, loading: true, error: null });

  const sanitizePayments = (plan: Plan): Plan => {
    if (plan.payments.length > 0) {
      plan.payments.unshift({
        number: 0,
        balance:
          (plan.loan.totalAmount * (100 - plan.loan.downPaymentPercentage)) /
          100,
      } as Payment);

      plan.payments = plan.payments.map((payment: Payment) => ({
        ...payment,
        currency: plan.loan.currency,
      }));
    }
    return plan;
  };

  useEffect(() => {
    fetch(`/api/plans/${id}`)
      .then((response) => response.json())
      .then(({ plan }: { plan: Plan }) => {
        if (plan)
          setState({
            plan: sanitizePayments(plan),
            loading: false,
            error: null,
          });
      })
      .catch((error) => {
        setState({ plan: null, loading: false, error });
        console.log(error);
      });
  }, []);

  const handleGeneratePayments = async (e: MouseEvent) => {
    fetch(`/api/plans/${id}/payments`, { method: "POST" })
      .then((response) => response.json())
      .then(({ payments }) => {
        if (payments)
          setState({
            plan: sanitizePayments({ ...state.plan!, payments }),
            loading: false,
            error: null,
          });
      })
      .catch((error) => {
        setState({ plan: null, loading: false, error });
      });
  };

  if (state.loading) return <div>Loading...</div>;

  if (state.plan != null)
    return (
      <div className="container h-full mx-auto p-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor total</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(
                  state.plan.stats.totalAmount,
                  state.plan.loan.currency,
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Cuota Inicial ({state.plan.stats.downPaymentPercentage})
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">
                {formatCurrency(
                  state.plan.stats.downPayment,
                  state.plan.loan.currency,
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Monto del prestamo
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-400 dark:text-emerald-300">
                {formatCurrency(
                  state.plan.stats.remainingAmount,
                  state.plan.loan.currency,
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Cuota simple mensual
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(
                  state.plan.stats.monthlyPayment,
                  state.plan.loan.currency,
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tasa Efectiva Anual
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {state.plan.stats.APR.toFixed(2)}%
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        {state.plan.payments != null ? (
          <DataTable
            columns={columns}
            data={state.plan.payments}
            handleClick={handleGeneratePayments}
          />
        ) : null}

        <span className="mt-5 text-gray-300">Payment: {id}</span>
      </div>
    );
}
