export type Payment = {
  id?: string;
  number: number;
  paymentDate?: string;
  amortization?: number;
  interest?: number;
  lifeInsurance?: number;
  carInsurance?: number;
  postage?: number;
  balance: number;
  currency?: string;
  createdAt: string;
};
