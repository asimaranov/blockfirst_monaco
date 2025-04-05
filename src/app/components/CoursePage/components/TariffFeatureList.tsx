import { TariffFeature } from "~/app/lib/constants/tariff";

// Component for tariff features section
export default function TariffFeatureList({
  features,
  isAlternateRow = true,
}: {
  features: TariffFeature[];
  isAlternateRow?: boolean;
}) {
  return (
    <div className="flex flex-col">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`flex h-12 items-center px-5 sm:px-8 ${feature.bg || (isAlternateRow && index % 2 === 0) ? 'bg-[#14171C]' : ''}`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-5 w-5 items-center justify-center rounded-full">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
              >
                <g id="Check - Circle">
                  <path
                    id="Vector"
                    d="M5.44922 10.65L8.04922 13.25L14.5492 6.75"
                    stroke="#195AF4"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </div>
            <span className="text-sm text-gray-100">{feature.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
