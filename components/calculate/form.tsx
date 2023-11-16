import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { format } from "date-fns";
import { Input, PrefixedInput } from "@/components/ui/input";
import { getCurrencySymbol, SupportedCurrencies } from "@/lib/currency";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

const CalculatorForm = () => {
  const [currency, setCurrency] = React.useState("USD");
  const [rateType, setRateType] = React.useState({
    value: "EFFECTIVE",
    label: "Efectiva",
  });

  const formSchema = z.object({
    title: z.string().min(5).max(30),
    loanAmount: z.coerce
      .number({
        required_error: "El monto total es requerido",
      })
      .gte(10000, "El monto mínimo es de 10,000")
      .lte(1000000, "El monto máximo es de 1,000,000")
      .positive("El monto debe ser positivo"),
    downPaymentPercentage: z.coerce
      .number()
      .gte(0, "El porcentaje debe ser mayor que 0")
      .lte(100, "El porcentaje debe ser menor que 100"),
    interestRate: z.coerce.number().gte(0),
    rateType: z.enum(["EFFECTIVE", "NOMINAL"]),
    loanTerm: z.coerce.number().gte(1).lte(500),
    currency: z.string(),
    portage: z.coerce.number().gte(0),
    loanDate: z
      .date({
        required_error: "La fecha es requerida",
      })
      .min(new Date()),
    insurances: z.array(
      z.object({
        type: z.enum(["LIFE", "CAR"]),
        amount: z.coerce.number().gte(0),
      }),
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loanAmount: 10000,
      downPaymentPercentage: 10,
      interestRate: 10.0,
      rateType: "EFFECTIVE",
      loanTerm: 12,
      currency: "USD",
      portage: 0,
      loanDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      insurances: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    //console.log(form.getValues());
  };

  const handleRateTypeChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const rateTypeValue =
      e.currentTarget.getAttribute("data-state") === "checked"
        ? { value: "EFFECTIVE", label: "Efectiva" }
        : { value: "NOMINAL", label: "Nominal" };

    setRateType(rateTypeValue);
    form.setValue("rateType", rateTypeValue.value as "EFFECTIVE" | "NOMINAL");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Form {...form}>
        <section className="mb-5">
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titulo</FormLabel>
                <FormControl>
                  <Input type="text" />
                </FormControl>
              </FormItem>
            )}
          />
        </section>
        {/* CURRENCY SECTION */}
        <section>
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Moneda</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value: string) => {
                      setCurrency(value);
                      form.setValue("currency", value as SupportedCurrencies);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar Moneda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="USD">
                          Dólar estadounidense (USD)
                        </SelectItem>
                        <SelectItem value="PEN">Sol peruano (PEN)</SelectItem>
                        <SelectItem value="MXN">Peso mexicano (MXN)</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </section>
        {/* END CURRENCY SECTION */}
        <Separator className="my-4" />
        <section>
          {/* AMOUNT SECTION */}
          <section className="w-full flex gap-x-2 mb-4">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="loanAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monto total</FormLabel>
                    <FormControl>
                      <PrefixedInput
                        id="loanAmount"
                        type="number"
                        placeholder=""
                        prefix={getCurrencySymbol(currency)}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs px-2">
                      El monto total del préstamo.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="downPaymentPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cuota inicial (%)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute top-2 right-4">%</span>
                        <Input
                          id="downPaymentPercentage"
                          type="number"
                          placeholder=""
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="text-xs px-2">
                      Porcentaje de la cuota inicial.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>
          {/* END AMOUNT SECTION */}
          <section className="w-full flex gap-x-2">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="loanTerm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Período (meses)</FormLabel>
                    <FormControl>
                      <Input
                        id="loanTerm"
                        type="number"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs px-2">
                      Cantidad de meses.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="loanDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha del préstamo</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "d MMM - y")
                            ) : (
                              <span>Selecciona una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date.getTime() <
                            new Date(
                              new Date().setMonth(new Date().getMonth() + 1),
                            ).getTime()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription className="text-xs">
                      Fecha de desembolso.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>
        </section>

        <Separator className="my-4" />
        {/* RATE SECTION */}
        <section className="w-full flex gap-2 items-end">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="interestRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">
                    Tasa {rateType.label} Anual
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute top-2 right-4">%</span>
                      <Input
                        id="interestRate"
                        type="number"
                        placeholder=""
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2 flex justify-center py-3">
            <FormField
              control={form.control}
              name="rateType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="rateType"
                        {...field}
                        onClick={(e) => handleRateTypeChange(e)}
                      />
                      <Label htmlFor="rateType">{rateType.label}</Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <section className="mt-5">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="portage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portes</FormLabel>
                  <FormControl>
                    <PrefixedInput
                      id="portage"
                      type="number"
                      placeholder=""
                      prefix={getCurrencySymbol(currency)}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs px-2">
                    Coste de portes.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>
        {/* END RATE SECTION */}
        <Separator className="my-4" />
        {/* INSURANCES SECTION */}
        <section>
          <FormField
            control={form.control}
            name="interestRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">
                  Seguro de desgravamen
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute top-2 right-4">%</span>
                    <Input
                      id="interestRate"
                      type="number"
                      placeholder=""
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="interestRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">
                  Seguro vehicular
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute top-2 right-4">%</span>
                    <Input
                      id="interestRate"
                      type="number"
                      placeholder=""
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <Button className="mt-10" type="submit" onClick={() => console.log(form.getValues())}>
          Calcular
        </Button>
      </Form>
    </form>
  );
};

export default CalculatorForm;
