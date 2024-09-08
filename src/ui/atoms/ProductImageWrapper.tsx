import NextImage, { type ImageProps } from "next/image";

export const ProductImageWrapper = (props: ImageProps) => {
  return (
    <div className="h-5/6 w-5/6 aspect-square overflow-hidden bg-neutral-50">
      <NextImage
        {...props}
        className="h-full w-full object-contain object-center p-2"
      />
    </div>
  );
};
