"use client"

import CalculatorForm, {formSchema} from "@/components/calculate/form";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {formatCurrency} from "@/lib/currency";
import {useEffect, useState} from "react";
import {PMT} from "@/lib/finances";
import {Skeleton} from "@/components/ui/skeleton";


interface PreviewProps {
  values: CalculatorForm
}

const groupErrors = (errors): Object => {
  const groupedErrors = {};

  errors.forEach((e) => {
    const path = e.path[0]

    if (!groupedErrors[path]) {
      groupedErrors[path] = []
    }

    groupedErrors[path].push(e.message)
  })

  return groupedErrors
}

const attributeText = {
  title: 'Titulo',
  loanAmount: 'Monto total',
  downPaymentPercentage: 'Cuota inicial',
  interestRate: 'Tasa de interes',
  lifeInsurance: 'Seguro de desgravamen',
  carInsurance: 'Seguro vehicular'
}

const CalculatePreview = ({values}) => {
  const [pmt, setPMT] = useState(0.0);
  const [irr, setIRR] = useState(0.0)

  const validation = formSchema.safeParse(values)
  const validSchema = validation.success ?? false
  let errors;

  useEffect(() => {
    const interestRate = parseFloat(values.interestRate) / 100
    const loanTerm = parseInt(values.loanTerm)
    const loanAmount = parseFloat(values.loanAmount)
    const downPaymentPercentage = parseFloat(values.downPaymentPercentage) / 100
    const lifeInsurance = parseFloat(values.lifeInsurance) / 100
    const carInsurance = parseFloat(values.carInsurance) / 100
    const postage = parseFloat(values.postage) ?? 0.0

    setPMT(
      PMT(
        (Math.pow(1 + interestRate, 30 / 360) - 1) + lifeInsurance,
        loanTerm,
        -loanAmount * (1 - downPaymentPercentage),
        0,
        false
      ) + postage + (loanAmount * carInsurance)
    )
  }, [values]);

  if (validation.error) {
    errors = groupErrors(JSON.parse(formSchema.safeParse(values).error))
  }

  if (validSchema) {
    return (
      <div className="container h-full mx-auto py-44">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mb-6">
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
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </CardHeader>
            <CardContent>
              <div className="w-full text-2xl font-bold">
                {formatCurrency(
                  values.loanAmount,
                  values.currency,
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Cuota Inicial
                <span className="text-xs ml-1">({values.downPaymentPercentage}%)</span>
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
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">
                {formatCurrency(
                  values.loanAmount * values.downPaymentPercentage / 100,
                  values.currency,
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
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-400 dark:text-emerald-300">
                {formatCurrency(
                  values.loanAmount - values.loanAmount * values.downPaymentPercentage / 100,
                  values.currency,
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  isNaN(pmt) ? <Skeleton className="h-6"/> : formatCurrency(
                    pmt,
                    values.currency,
                  )
                }
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
                <rect width="20" height="14" x="2" y="5" rx="2"/>
                <path d="M2 10h20"/>
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  isNaN(pmt) ? <Skeleton className="h-6"/> : formatCurrency(
                    pmt,
                    values.currency,
                  )
                }
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tasa Interna de Retorno
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
                <rect width="20" height="14" x="2" y="5" rx="2"/>
                <path d="M2 10h20"/>
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  } else {
    return (
      <section className="h-full">
        <h1 className="my-5 text-xl">Para previsualizar los datos faltan los siguientes errores</h1>
        <div className="flex flex-col justify-">
          {
            Object.keys(errors).map(e => {
              return (
                <div c>
                  <h2 className="text-black dark:text-white my-2">
                    {attributeText[e]}
                  </h2>
                  <div>
                    {
                      errors[e].map(m => <Badge
                        className="bg-rose-50 text-rose-400 border-rose-500 dark:bg-black dark:text-gray-200 dark:border-rose-400">{m}</Badge>)
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>
    )
  }
}

export default CalculatePreview