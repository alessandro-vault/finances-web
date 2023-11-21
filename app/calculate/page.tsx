"use client";
import AppLayout from "@/components/shared/layouts/app-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React, {useState} from "react";
import CalculatorForm , { type CalculatorForm as CalculatorFormType } from "@/components/calculate/form";
import CalculatePreview from "@/components/calculate/preview";
import {Separator} from "@/components/ui/separator";

export default function CalculatePage() {

  const [values, setValues] = useState({} as CalculatorFormType);

  const handleFormChange = (currentValues : CalculatorFormType) => {
    setValues(currentValues)
  }

  return (
    <AppLayout>
      <section className="p-10 w-full h-full flex flex-col items-start lg:justify-center relative">
        <h1 className="text-3xl mb-5">Nuevo cálculo</h1>
        <section className="w-full flex flex-col items-start lg:flex-row justify-between gap-y-10 lg:gap-y-0 lg:gap-x-24">
          <Card className="w-full lg:w-1/2">
            <CardHeader>
              <CardTitle>Datos de entrada</CardTitle>
              <CardDescription>
                Datos iniciales para empezar el cálculo del plan de pagos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CalculatorForm onFormChange={handleFormChange}/>
            </CardContent>
          </Card>
          <Card className="w-full lg:w-1/2 h-full">
            <CardHeader>
              <CardTitle>Datos Intermedios</CardTitle>
              <CardDescription>
                Datos generados por los datos de entrada
              </CardDescription>
              <Separator className="my-5"/>
              <CalculatePreview values={values} />
            </CardHeader>
          </Card>
        </section>
      </section>
    </AppLayout>
  );
}
