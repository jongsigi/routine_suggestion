import { ExternalLink } from "@/ui/components/external-link";
// import { SkinTypesProps } from "@/types/SkinTypeListDocument";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";
import ImageScroller  from "@/ui/atoms/ImageScroller";
import typesDescriptions from "@public/SkinTypeDescriptions.json";

export function SkinTypeDescription({ matchingType }: { matchingType: any }) {
  const SkinTypeDescription = typesDescriptions?.find((typeDescription) => {
    return typeDescription.name === matchingType.slug;
  });

  const skintype = SkinTypeDescription?.name;
  const percentage = SkinTypeDescription?.per;
  const skintype_id = SkinTypeDescription?.id;
  const kor_translate = SkinTypeDescription?.kor_translate;
  const skin_barrier = SkinTypeDescription?.barrier;
  const morning_routine = SkinTypeDescription?.recommendedMorningRoutine;
  const night_routine = SkinTypeDescription?.recommendedNightRoutine;

  return (
    <div className="mx-auto max-w-2xl px-4 mt-4">
      <div className="flex flex-col gap-2 rounded-2xl bg-zinc-50 sm:px-8 px-4 pb-4 text-sm sm:text-base mt-4">
        <h1 className="text-2xl sm:text-2xl tracking-tight font-bold max-w-fit inline-block capitalize mt-4">
          {skintype_id} : {skintype}
        </h1>
        <p>
          한국의{" "}
          <span className="text-xl font-semibold text-blue-500">
            {percentage}%
          </span>
          에 해당하는 피부타입입니다. {skintype} 피부타입은{" "}
          <span className="text-lg font-semibold text-blue-500">
            {kor_translate}
          </span>
          의 특성을 띄는 피부타입으로, 주요한 피부 건강 취약점은{" "}
          <span className="text-lg font-semibold text-red-500">
            {skin_barrier}
          </span>
          입니다.
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
      </div>
      <div className="flex flex-col gap-2 rounded-2xl bg-zinc-50 sm:px-8 px-4 pb-4 text-sm sm:text-base mt-4">
        <div className="morning-routine">
          <h1 className="text-2xl sm:text-2xl tracking-tight font-bold max-w-fit inline-block capitalize mt-4">
            {matchingType.slug} 추천 모닝루틴
          </h1>

          <ImageScroller routine={morning_routine} />
        </div>
        <div className="night-routine">
          <h1 className="text-2xl sm:text-2xl tracking-tight font-bold max-w-fit inline-block capitalize mt-4">
            {matchingType.slug} 추천 나이트루틴
          </h1>
          <ImageScroller routine={night_routine} />
          <div>
            <img className="size-1/2" src="/img/footer.png" alt="footer" />
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col gap-2 rounded-2xl bg-zinc-50 sm:px-8 px-4 text-sm sm:text-base mt-4">
        <div className="morning-routine">
          <h1 className="text-2xl sm:text-2xl tracking-tight font-bold max-w-fit inline-block capitalize mt-4">
            Enhancing Ingredients : {skintype}
          </h1>
          <p>
            {SkinTypeDescription?.recommendedIngredients}
          </p>
          <p>성분1</p>
          <p>성분2</p>
          <p>성분3</p>
          <p>성분4</p>
          <p>성분5</p>
        </div>
      </div> */}
    </div>
  );
}
