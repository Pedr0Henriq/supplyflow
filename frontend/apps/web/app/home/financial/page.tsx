import { FinancialClient } from "../../../components/financial/financial-client";

export const metadata = {
  title: "Financeiro | SupplyFlow",
  description: "Gestão financeira do ERP",
};

export default function FinancialPage() {
  return (
    <div className="container mx-auto p-6">
      <FinancialClient />
    </div>
  );
}