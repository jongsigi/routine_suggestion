import { ExternalLink } from "@/ui/components/external-link";
// import { SkinTypesProps } from "@/types/SkinTypeListDocument";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";
import typesDescriptions from "@public/SkinTypeDescriptions.json";

const navItem = [
  "/img/DRPW.webp",
  "/img/DRNT.webp",
  "/img/ORPW.webp",
  "/img/DSPT.webp",
];

export function SkinTypeHeader({ matchingType }: { matchingType: any }) {
  const SkinTypeDescription = typesDescriptions?.find((typeDescription) => {
    return typeDescription.type === matchingType.slug;
  });

  return (
    <div className="mx-auto max-w-2xl px-4 mt-4">
      <div className="flex flex-col gap-2 rounded-2xl bg-zinc-50 sm:p-8 p-4 text-sm sm:text-base">
        <h1 className="text-2xl sm:text-2xl tracking-tight font-bold max-w-fit inline-block capitalize">
          {SkinTypeDescription?.id} : {SkinTypeDescription?.type}
        </h1>
        <p>
          한국의 <span className="text-blue-500">{SkinTypeDescription?.percentage}</span>에 해당하는 피부 타입으로,
          {SkinTypeDescription?.summary}
        </p>
        <p className="leading-normal text-zinc-900">
          더 자세한 사항은{" "}
          <ExternalLink
            href={
              "https://skintypesolutions.com/blogs/skincare/baumann-skin-" +
              SkinTypeDescription?.id +
              "-" +
              SkinTypeDescription?.type
            }
          >
            <span className="font-semibold">
              {" "}
              {SkinTypeDescription?.type} 피부타입 설명(English)
            </span>
          </ExternalLink>
          를 통해 확인하실 수 있습니다.
        </p>
        <h1 className="text-2xl sm:text-2xl tracking-tight font-bold max-w-fit inline-block capitalize mt-4">
          {SkinTypeDescription?.type} 피부타입의 장단점
        </h1>
        <p>{SkinTypeDescription?.pros}</p>
        <p>{SkinTypeDescription?.cons}</p>
        <h1 className="text-2xl sm:text-2xl tracking-tight font-bold max-w-fit inline-block capitalize mt-4">
          {SkinTypeDescription?.type}이 쓰면 좋은 성분들
        </h1>
        <p>{SkinTypeDescription?.recommendedIngredients}</p>
      </div>
      <div className="flex flex-col gap-2 rounded-2xl bg-zinc-50 sm:p-8 p-4 text-sm sm:text-base mt-4">
        <div className="morning-routine">
          <h1 className="text-2xl sm:text-2xl tracking-tight font-bold max-w-fit inline-block capitalize mt-4">
            {matchingType.slug} 추천 모닝루틴
          </h1>

          <div className="whitespace-nowrap overflow-x-auto flex">
            {navItem.map((item, index) => {
              return (
                <ProductImageWrapper
                  key={index}
                  src={item}
                  alt={""}
                  width={8}
                  height={8}
                  sizes={"256px"}
                />
              );
            })}
          </div>
        </div>
        <div className="night-routine">
          <h1 className="text-2xl sm:text-2xl tracking-tight font-bold max-w-fit inline-block capitalize mt-4">
            {matchingType.slug} 추천 나이트루틴
          </h1>
          <div className="whitespace-nowrap overflow-x-auto flex">
            {navItem.map((item, index) => {
              return (
                <ProductImageWrapper
                  key={index}
                  src={item}
                  alt={""}
                  width={8}
                  height={8}
                  sizes={"256px"}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
