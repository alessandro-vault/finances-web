"use client"

import CalculatorForm, {formSchema} from "@/components/calculate/form";
import {Badge} from "@/components/ui/badge";


interface PreviewProps {
  values: CalculatorForm
}

const groupErrors = (errors) : Object => {
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
  downPaymentPercentage: 'Cuota inicial',
  interestRate: 'Tasa de interes',
  lifeInsurance: 'Seguro de desgravamen',
  carInsurance: 'Seguro vehicular'
}

const CalculatePreview = ({ values } : PreviewProps) => {
  const validSchema = formSchema.safeParse(values).success ?? false
  const errors = groupErrors(JSON.parse(formSchema.safeParse(values).error))

  if (validSchema) {

  } else {
    return (
      <section className="h-full">
        <h1 className="my-5 text-xl">Para previsualizar los datos faltan los siguientes errores</h1>
        <div className="flex flex-col">
          {
            Object.keys(errors).map(e => {
              return(
                <div>
                  <h2 className="text-black dark:text-white my-2">
                    {attributeText[e]}
                  </h2>
                  <div>
                    {
                      errors[e].map(m => <Badge className="bg-rose-50 text-rose-400 border-rose-500 dark:bg-black dark:text-gray-200 dark:border-rose-400">{m}</Badge>)
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