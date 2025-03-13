export default function MainHeading({
  mainText,
  secondText,
}: {
  mainText: string;
  secondText: string;
}) {
  return (
    <div className="mb-[32px] md:mb-[40px]">
      <h1 className="text-center text-3xl font-bold uppercase leading-[28px] tracking-tight text-white md:text-[40px] md:leading-[48px]">
        {mainText}
      </h1>
      <p className="mt-6 text-center text-sm leading-[20px] text-secondary">
        {secondText}
      </p>
    </div>
  );
}
