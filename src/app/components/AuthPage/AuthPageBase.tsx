"use client";

import RightFiller from "./RightFiller";
import Image from "next/image";
import LogoSvg from "./assets/logo.svg";

export default function AuthPageBase({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-row overflow-hidden bg-background">
      <div className="relative z-10 flex w-full max-w-[468px] flex-col p-[64px] outline outline-[1px] outline-accent">
        <div className="mb-[64px] flex w-full items-center justify-center">
          <Image src={LogoSvg} alt="logo" />
        </div>

        {children}
      </div>

      <RightFiller />
    </div>
  );
}
