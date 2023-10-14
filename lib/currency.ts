export const formatCurrency = (amount: number, currency: string) => {
    const currentLocale = Currency[currency].locale
    return new Intl.NumberFormat(
        currentLocale,
        {
            style: "currency",
            currency: currency,
        }
    ).format(amount)

}

type CurrencyType = {
    [key:string]: {
        symbol: string,
        name: string,
        locale: string
    }
}

const Currency : CurrencyType = {
    "PEN": {
        symbol: "S/.",
        name: "Peruvian Sol",
        locale: "es-PE"
    },
    "USD": {
        symbol: "$",
        name: "US Dollar",
        locale: "en-US"
    }
}