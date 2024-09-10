// import { ProductList } from "@/ui/components/ProductList";
import SkinTypesCollection from "@public/SkinTypesCollection.json";
import { SkinTypeList } from "@/ui/components/SkinTypeList";

export const metadata = {
  title: "SiGi SkinCare",
  description: "SiGi SkinCare",
};

export default function Page({ params }: { params: { channel: string } }) {

  if (!SkinTypesCollection.collection?.types) {
    return null;
  }

  const skintypes = SkinTypesCollection.collection?.types.edges.map(({ node: type }) => type);

  return (
    <section className="mx-auto max-w-7xl p-8 pb-16">
      <h2 className="sr-only">Product list</h2>
      <SkinTypeList skintypes={skintypes} />
    </section>
  );
}
