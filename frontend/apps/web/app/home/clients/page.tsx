import { ClientsClient } from "../../../components/clients/clients-client";

export const metadata = {
  title: "Clientes | SupplyFlow",
  description: "Gerenciamento de clientes do ERP",
};

export default function ClientsPage() {
  return (
    <div className="container mx-auto p-6">
      <ClientsClient />
    </div>
  );
}