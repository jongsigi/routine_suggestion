import { SkinTypeElement } from "./SkinTypeElement";
import { SkinTypesProps, SkinTypesListProps } from '@/types/SkinTypeListDocument';

export async function SkinTypeList({ skintypes }: SkinTypesListProps) {

  return (
    <ul
      role="list"
      data-testid="ProductList"
      className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
    >
      {skintypes.map((skintype : SkinTypesProps, index) => (
        <SkinTypeElement
          key={skintype.id}
          skintype={skintype}
          priority={index < 2}
          loading={index < 3 ? "eager" : "lazy"}
        />
      ))}
    </ul>
  );
}
