export default function MainHeading({
  mainText,
  secondText,
}: {
  mainText: string;
  secondText: string;
}) {
  return (
    <div className="mb-10">
      <p className="text-foreground text-center text-[2.3148vw] leading-[2.7199vw] font-medium tracking-tight uppercase whitespace-pre-line">
        {mainText}
      </p>
      <p className="text-secondary mt-6 text-center text-sm leading-[1.1574vw]">
        {secondText}
      </p>
    </div>
  );
}
