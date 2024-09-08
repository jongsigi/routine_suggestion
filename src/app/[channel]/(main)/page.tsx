// import { ProductList } from "@/ui/components/ProductList";
import SkinTypeList from "@/../public/SkinTypeList.json";
import { ProductList } from "@/ui/components/ProductList";

export const metadata = {
  title: "SiGi SkinCare",
  description: "SiGi SkinCare",
};

export default function Page({ params }: { params: { channel: string } }) {
  const data = SkinTypeList;

  if (!data.collection?.types) {
    return null;
  }

  const types = data.collection?.types.edges.map(({ node: type }) => type);

  return (
    <section className="mx-auto max-w-7xl p-8 pb-16">
      <h2 className="sr-only">Product list</h2>
      <ProductList types={types} />
    </section>
  );
}
