// src/types/productTypes.ts

export type SkinTypesProps = {
    id: string;
    name: string;
    slug: string;
    category: Record<string, unknown>;
    thumbnail: Record<string, unknown>;
  };
  
  export type SkinTypesListProps = {
    types: SkinTypesProps[];
  };
  