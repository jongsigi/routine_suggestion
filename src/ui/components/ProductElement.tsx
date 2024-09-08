import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";

export async function ProductElement(typeData: any) {
  const product = await typeData.typeData;
  return (
    <li data-testid="ProductElement">
      <LinkWithChannel href={`/products/${product.slug}`} key={product.id}>
        <div>
          {product?.thumbnail?.url && (
            <ProductImageWrapper
              src={product.thumbnail.url}
              alt={product.thumbnail.alt ?? ""}
              width={256}
              height={256}
              sizes={"512px"}
            />
          )}
          <div className="mt-2 flex justify-between">
            <div>
              <h3 className="mt-1 text-sm font-semibold text-neutral-900">
                {product.name}
              </h3>
              {/* <p
                className="mt-1 text-sm text-neutral-500"
                data-testid="ProductElement_Category"
              >
                {product.category?.name}
              </p> */}
            </div>
          </div>
        </div>
      </LinkWithChannel>
    </li>
  );
}
