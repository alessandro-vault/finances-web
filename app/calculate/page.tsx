"use client";
import AppLayout from "@/components/shared/layouts/app-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";
import CalculatorForm from "@/components/calculate/form";

export default function CalculatePage() {
  return (
    <AppLayout>
      <section className="p-10 w-full h-full flex flex-col items-start lg:justify-center">
        <h1 className="text-4xl mb-10">Nuevo cálculo</h1>
        <section className="w-full flex flex-col items-center lg:flex-row justify-between gap-y-10 lg:gap-y-0 lg:gap-x-24">
          <Card className="w-full lg:w-1/2">
            <CardHeader>
              <CardTitle>Datos de entrada</CardTitle>
              <CardDescription>
                Datos iniciales para empezar el cálculo del plan de pagos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CalculatorForm />
            </CardContent>
          </Card>
          <Card className="w-full lg:w-1/2">
            <CardHeader>
              <CardTitle>Datos Intermedios</CardTitle>
              <CardDescription>
                Datos generados por los datos de entrada
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
      </section>
    </AppLayout>
  );
}
