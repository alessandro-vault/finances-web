"use client";
import AppLayout from "@/components/shared/layouts/app-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PrefixedInput } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

export default function CalculatePage() {
  return (
    <AppLayout>
      <section className="p-10 w-full h-full flex flex-col items-start">
        <h1 className="text-4xl mb-2">Nuevo cálculo</h1>
        <section className="w-full flex justify-between">
          <Card>
            <CardHeader>
              <CardTitle>Datos de entrada</CardTitle>
              <CardDescription>
                Datos iniciales para empezar el cálculo del plan de pagos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="loanAmount">Monto total</Label>
                    <PrefixedInput
                      id="loanAmount"
                      type="number"
                      placeholder="Monto total del préstamo"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="loanAmount">Monto total</Label>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Seleccionar Moneda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="apple">
                            Dólar estadounidense
                          </SelectItem>
                          <SelectItem value="banana">Sol peruano</SelectItem>
                          <SelectItem value="blueberry">
                            Peso mexicano
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          <Card>Section 2</Card>
        </section>
      </section>
    </AppLayout>
  );
}
