import { DashboardClient } from "../../../components/dashboard/dashboard-client";

export const metadata = {
  title: "Dashboard | SupplyFlow",
  description: "Visão geral do ERP",
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <DashboardClient />
    </div>
  );
}