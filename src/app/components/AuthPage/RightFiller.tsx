import Image from "next/image";
import CodeSnippetSvg from "./assets/right-section/code_snippet.svg";
import AvatarsBgSvg from "./assets/right-section/avatars_bg.svg";
import AvatarsItems from "./assets/right-section/avatars_items.png";
import Reviews from "./assets/right-section/reviews.svg";

export default function RightFiller() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center bg-[url(/bg/planet.svg)] bg-cover bg-center bg-no-repeat">
      <div className="flex flex-col items-center justify-center">
        <div>
          <Image
            src={CodeSnippetSvg}
            alt={""}
            className="mb-[33px] ml-[70px]"
          ></Image>

          <div className="relative mb-[36px] flex h-[107px] w-[383px] items-center justify-center">
            <Image src={AvatarsBgSvg} alt={""} className="absolute z-0"></Image>
            <div className="z-10 flex h-[53px] w-[124px] flex-col justify-center">
              <span className="text-[25px] text-foreground">2310+</span>
              <span className="text-[14px] text-secondary">Прошли курс</span>
            </div>
            <Image
              src={AvatarsItems}
              alt={""}
              className="z-0 h-[53px] w-[145px]"
              width={145}
              height={53}
            ></Image>
          </div>
          <Image
            src={Reviews}
            alt={""}
            className="mb-[33px] ml-[98px] h-[74px] w-[244px]"
            width={244}
            height={74}
          ></Image>
        </div>
      </div>
    </div>
  );
}
