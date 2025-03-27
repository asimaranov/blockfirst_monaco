export default function MainHeading({
  mainText,
  secondText,
}: {
  mainText: string;
  secondText: string;
}) {
  return (
    <div className="mb-8 sm:mb-10">
      <p className="text-foreground text-center text-3xl sm:text-4xl sm:leading-[2.7199vw] font-medium tracking-tight uppercase sm:whitespace-pre-line">
        {mainText}
      </p>
      <p className="text-secondary mt-6 text-center text-sm sm:leading-[1.1574vw]">
        {secondText}
      </p>
    </div>
  );
}
