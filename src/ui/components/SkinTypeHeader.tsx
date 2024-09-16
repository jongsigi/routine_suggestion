import { ExternalLink } from "@/ui/components/external-link";
// import { SkinTypesProps } from "@/types/SkinTypeListDocument";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";
import typesDescriptions from "@public/SkinTypeDescriptions_t.json";

const navItem = [
  "/img/DRPW.webp",
  "/img/DRNT.webp",
  "/img/ORPW.webp",
  "/img/DSPT.webp",
];

export function SkinTypeHeader({ matchingType }: { matchingType: any }) {
  const SkinTypeDescription = typesDescriptions?.find((typeDescription) => {
    return typeDescription.name === matchingType.slug;
  });

  const skintype = SkinTypeDescription?.name
  const percentage = SkinTypeDescription?.per
  const skintype_id = SkinTypeDescription?.id
  const kor_translate = SkinTypeDescription?.kor_translate
  const skin_barrier = SkinTypeDescription?.barrier

  return (
    <div className="mx-auto max-w-2xl px-4 mt-4">
      <div className="flex flex-col gap-2 rounded-2xl bg-zinc-50 sm:p-8 p-4 text-sm sm:text-base">
        <h1 className="text-2xl sm:text-2xl tracking-tight font-bold max-w-fit inline-block capitalize">
          {skintype_id} : {skintype}
        </h1>
        <p>
          한국의 <span className="text-xl font-semibold text-blue-500">{percentage}%</span>에 해당하는 피부타입이다. {' '}
          {skintype} 피부타입은 {' '}
          <span className="text-lg font-semibold text-blue-500">{kor_translate}</span>의 특성을 띄는 피부타입으로, 
          주요한 피부 건강 취약점으로는 <span className="text-lg font-semibold text-red-500">{skin_barrier}</span>이 있다.
        </p>
        <p className="leading-normal text-zinc-900">
          더 자세한 사항은{" "}
          <ExternalLink
            href={
              "https://skintypesolutions.com/blogs/skincare/baumann-skin-" +
              skintype_id +
              "-" +
              skintype
            }
          >
            <span className="font-semibold">
              {" "}
              {skintype} 피부타입 설명(English)
            </span>
          </ExternalLink>
          를 통해 확인하실 수 있습니다.
        </p>
        {/* <h1 className="text-2xl sm:text-2xl tracking-tight font-bold max-w-fit inline-block capitalize mt-4">
          {skintype} 피부타입의 장단점
        </h1>
        <p>{SkinTypeDescription?.pros}</p>
        <p>{SkinTypeDescription?.cons}</p>
        */}
        <h1 className="text-2xl sm:text-2xl tracking-tight font-bold max-w-fit inline-block capitalize mt-4">
          Enhancing Ingredients : {skintype}
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
