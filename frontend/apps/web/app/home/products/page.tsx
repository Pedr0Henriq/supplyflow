import { ProductsClient } from "../../../components/products/products-client";

export const metadata = {
  title: "Produtos | SupplyFlow",
  description: "Gerenciamento de produtos do ERP",
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto p-6">
      <ProductsClient />
    </div>
  );
}