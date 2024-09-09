// src/types/productTypes.ts

export type SkinTypesProps = {
    id: string;
    name: string;
    slug: string;
    category: {
      id: string;
      name: string;
    };
    thumbnail: {
      url: string;
      alt: string;
    };
  };
  
  export type SkinTypesListProps = {
    skintypes: SkinTypesProps[];
  };
  