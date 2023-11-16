export const formatCurrency = (amount: number, currency: string) => {

  if (currency) {
    const currentLocale = Currency[currency].locale;

    return new Intl.NumberFormat(currentLocale, {
      style: "currency",
      currency: currency,
    }).format(amount);
  }
  return amount;
};

export const getCurrencySymbol = (currency: string) => {
  return Currency[currency]?.symbol ?? currency;
};

type CurrencyType = {
  [key: string]: {
    symbol: string;
    name: string;
    locale: string;
  };
};

export const Currency: CurrencyType = {
  PEN: {
    symbol: "S/.",
    name: "Peruvian Sol",
    locale: "es-PE",
  },
  USD: {
    symbol: "$",
    name: "US Dollar",
    locale: "en-US",
  },
  MXN: {
    symbol: "$",
    name: "Mexican Peso",
    locale: "es-MX",
  },
};

export type SupportedCurrencies = "PEN" | "USD" | "MXN";
