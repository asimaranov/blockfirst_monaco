export default function MainHeading({
  mainText,
  secondText,
}: {
  mainText: string;
  secondText: string;
}) {
  return (
    <div className="md:mb-[40px] mb-[32px]">
      <h1 className="text-center md:text-[40px] text-[28px] font-bold uppercase md:leading-[48px] leading-[28px] tracking-tight text-white">
        {mainText}
      </h1>
      <p className="mt-6 text-center text-[14px] leading-[20px] text-secondary">
        {secondText}
      </p>
    </div>
  );
}
