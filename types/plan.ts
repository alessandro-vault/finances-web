import { Loan } from "@/types/loan";
import { Payment } from "@/types/payment";

export type PlanStats = {
  totalAmount: number;
  downPaymentPercentage: string;
  downPayment: number;
  remainingAmount: number;
  APR: number;
  MPR: number;
  numberOfPayments: number;
  monthlyPayment: number;
  lifeInsurance: number;
  carInsurance: number;
  postage: number;
  IRR: number;
  EAR: number;
};

export type Plan = {
  id: string;
  title: string;
  loan: Loan;
  payments: Payment[];
  clientId: number;
  stats: PlanStats;
};
