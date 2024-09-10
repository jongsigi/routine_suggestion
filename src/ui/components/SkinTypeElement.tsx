import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";
import { SkinTypesProps } from '@/types/SkinTypeListDocument';


export function SkinTypeElement({skintype,	loading,
	priority,}: {skintype:SkinTypesProps} & { loading: "eager" | "lazy"; priority?: boolean }) { 
     
  return (
    <li data-testid="ProductElement">
      <LinkWithChannel href={`/skintypes/${skintype.slug}`} key={skintype.id}>
        <div className="grid place-items-center">
          {skintype?.thumbnail?.url && (
            <ProductImageWrapper
              src={skintype.thumbnail.url}
              alt={skintype.thumbnail.alt ?? ""}
              width={256}
              height={256}
              sizes={"256px"}
            />
          )}
          <div className="mt-2 flex justify-center">
            <div>
              <h3 className="mt-1 text-sm font-semibold text-neutral-900">
                {skintype.name}
              </h3>
            </div>
          </div>
        </div>
      </LinkWithChannel>
    </li>
  );
}
