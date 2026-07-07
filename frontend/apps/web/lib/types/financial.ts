export type FinancialType = 'INCOME' | 'EXPENSE';

export interface Financial {
  id: number;
  description: string;
  value: number;
  type: FinancialType;
  createdAt: string;
}