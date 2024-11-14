// import { ProductList } from "@/ui/components/ProductList";
import SkinTypesCollection from "@public/SkinTypesCollection.json";
import { SkinTypeList } from "@/ui/components/SkinTypeList";

export default function Page({ params }: { params: { channel: string } }) {
  if (!SkinTypesCollection.collection?.types) {
    return null;
  }

  const skintypes = SkinTypesCollection.collection?.types.edges.map(
    ({ node: type }) => type
  );

  return (
    <section className="mx-auto max-w-7xl pb-16 mt-4">
      <SkinTypeList skintypes={skintypes} />
    </section>
  );
}
