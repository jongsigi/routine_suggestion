import { ProductElement } from "./ProductElement";

export function ProductList({ types }) {
  const typelist = Array.isArray(types) ? types : [];

  return (
    <ul
      role="list"
      data-testid="ProductList"
      className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
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
