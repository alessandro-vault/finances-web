import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import {format} from "date-fns";
import {Input, PrefixedInput} from "@/components/ui/input";
import {getCurrencySymbol, SupportedCurrencies} from "@/lib/currency";
import {Label} from "@/components/ui/label";
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
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Switch} from "@/components/ui/switch";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {CalendarIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {Calendar} from "@/components/ui/calendar";

export type CalculatorForm = {
  title: string,
  loanAmount: number,
  downPaymentPercentage: number,
  interestRate: number,
  rateType: string,
  loanTerm: number,
  currency: string,
  portage: number,
  loanDate: string,
  lifeInsurance: number,
  carInsurance: number
}

export const formSchema = z.object({
  title: z
    .string({
      required_error: "Es requerido",
    })
    .min(5, "El título debe tener al menos 5 caracteres")
    .max(30, "El título debe tener máximo 30 caracteres"),
  loanAmount: z.coerce
    .number({
      required_error: "El monto total es requerido",
    })
    .gte(10000, "El monto mínimo es de 10,000")
    .lte(1000000, "El monto máximo es de 1,000,000")
    .positive("El monto debe ser positivo")
    .default(10000),
  downPaymentPercentage: z.coerce
    .number()
    .gt(0, "El porcentaje debe ser mayor que 0")
    .lte(100, "El porcentaje debe ser menor que 100")
    .positive("El monto debe ser positivo")
    .default(0),
  interestRate: z.coerce
    .number()
    .gt(0, "El valor debe ser mayor de 0")
    .positive("El monto debe ser positivo")
    .default(0),
  rateType: z.enum(["EFFECTIVE", "NOMINAL"]).default("EFFECTIVE"),
  loanTerm: z.coerce
    .number()
    .gte(6, "El valor debe ser mayor a 6")
    .lte(500)
    .positive("El monto debe ser positivo")
    .default(12),
  currency: z.string().default("USD"),
  portage: z.coerce.number().gte(0).default(0),
  loanDate: z
    .date({
      required_error: "La fecha es requerida",
    })
    .min(new Date())
    .default(new Date()),
  lifeInsurance: z.coerce.number().gte(0,"El porcentaje debe ser mayor que 0").positive("El monto debe ser positivo").default(0),
  carInsurance: z.coerce.number().gte(0, "El porcentaje debe ser mayor que 0").positive("El monto debe ser positivo").default(0)
});

const CalculatorForm = ({onFormChange}: { onFormChange: any }) => {
  const [currency, setCurrency] = React.useState("USD");
  const [rateType, setRateType] = React.useState({
    value: "EFFECTIVE",
    label: "Efectiva",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      loanAmount: 0,
      downPaymentPercentage: 0,
      interestRate: 0.0,
      rateType: "EFFECTIVE",
      loanTerm: 12,
      currency: "USD",
      portage: 0,
      loanDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      lifeInsurance: 0.0,
      carInsurance: 0.0
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const handleRateTypeChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const rateTypeValue =
      e.currentTarget.getAttribute("data-state") === "checked"
        ? {value: "EFFECTIVE", label: "Efectiva"}
        : {value: "NOMINAL", label: "Nominal"};

    setRateType(rateTypeValue);
    form.setValue("rateType", rateTypeValue.value as "EFFECTIVE" | "NOMINAL");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} onChange={(e) => onFormChange(form.getValues())}>
      <Form {...form}>
        <section className="mb-5">
          <FormField
            control={form.control}
            name="title"
            render={({field}) => (
              <FormItem>
                <FormLabel>Titulo</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription className="text-xs px-2">
                  Un título para identificar el préstamo.
                </FormDescription>
                <FormMessage/>
              </FormItem>
            )}
          />
        </section>
        {/* CURRENCY SECTION */}
        <section>
          <FormField
            control={form.control}
            name="currency"
            render={({field}) => (
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
                      <SelectValue placeholder="Seleccionar Moneda"/>
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
        <Separator className="my-4"/>
        <section>
          {/* AMOUNT SECTION */}
          <section className="w-full flex gap-x-2 mb-4">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="loanAmount"
                render={({field}) => (
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
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="downPaymentPercentage"
                render={({field}) => (
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
                    <FormMessage/>
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
                render={({field}) => (
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
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="loanDate"
                render={({field}) => (
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
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
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
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
          </section>
        </section>

        <Separator className="my-4"/>
        {/* RATE SECTION */}
        <section className="w-full flex gap-2 items-end">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="interestRate"
              render={({field}) => (
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
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2 flex justify-center py-3">
            <FormField
              control={form.control}
              name="rateType"
              render={({field}) => (
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
                  <FormMessage/>
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
              render={({field}) => (
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
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
        </section>
        {/* END RATE SECTION */}
        <Separator className="my-4"/>

        {/* INSURANCES SECTION */}
        <section className="w-full flex gap-x-2">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="lifeInsurance"
              render={({field}) => (
                <FormItem>
                  <FormLabel className="text-sm">
                    Seguro de desgravamen
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute top-2 right-4">%</span>
                      <Input
                        id="lifeInsurance"
                        type="number"
                        placeholder=""
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="carInsurance"
              render={({field}) => (
                <FormItem>
                  <FormLabel className="text-sm">Seguro vehicular</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute top-2 right-4">%</span>
                      <Input
                        id="carInsurance"
                        type="number"
                        placeholder=""
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
        </section>
        <Button
          className="mt-10 fixed bottom-5 right-5 !bg-emerald-400 !text-black"
          type="submit"
          variant="outline"
        >
          Calcular
        </Button>
      </Form>
    </form>
  );
};

export default CalculatorForm;
