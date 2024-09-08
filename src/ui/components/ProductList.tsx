import { ProductElement } from "./ProductElement";

export async function ProductList(types: any) {
  const typelist = types.types;
  return (
    <ul
      role="list"
      data-testid="ProductList"
      className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
    >
      {typelist.map((typeData, index) => (
        <ProductElement
          key={typeData.id}
          typeData={typeData}
          priority={index < 2}
          loading={index < 3 ? "eager" : "lazy"}
        />
      ))}
    </ul>
  );
}
