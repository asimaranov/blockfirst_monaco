import Image from 'next/image';
import GridSvg from '../assets/grid.svg';
import Link from 'next/link';
import { Tariff, TARIFFS } from '~/app/lib/constants/tariff';

// Component for tariff card
export default function TariffCard({ tariff }: { tariff: Tariff }) {
  return (
    <div className="flex-1" key={tariff.name}>
      <div className="flex flex-col">
        {/* Dark header */}
        <div className="relative h-20 bg-[#01050D]">
          <div className="pointer-events-none absolute inset-0 z-[1] opacity-50 mix-blend-soft-light">
            <div className="bg-gradient-radial h-full w-full from-gray-100 to-transparent" />
          </div>
          <div className="relative z-[2] px-8 py-5">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#01050D]">
                  <Image
                    src={tariff.bigIcon}
                    alt=""
                    className="h-10 w-10 rounded-full"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-base">{tariff.name}</span>
                    {!!tariff.sale && (
                      <span className="bg-error rounded-full px-2 py-1 text-xs">
                        Sale {tariff.sale.percent}%
                      </span>
                    )}
                  </div>
                  <div className="text-secondary text-xs">Платный тариф</div>
                </div>
              </div>
              <Link href="/pricing">
                <div className="h-6 w-6 cursor-pointer hover:opacity-50">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.901 6.96967C13.1939 6.67678 13.6688 6.67678 13.9617 6.96967L18.9617 11.9696C19.1023 12.1103 19.1814 12.301 19.1814 12.4999C19.1814 12.6989 19.1023 12.8896 18.9617 13.0303L13.9617 18.0303C13.6688 18.3232 13.1939 18.3232 12.901 18.0303C12.6081 17.7374 12.6081 17.2625 12.901 16.9696L16.6207 13.25H5.57422C5.16001 13.25 4.82422 12.9142 4.82422 12.5C4.82422 12.0857 5.16001 11.75 5.57422 11.75H16.6207L12.901 8.03033C12.6081 7.73744 12.6081 7.26257 12.901 6.96967Z"
                      fill="#F2F2F2"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
          <Image
            className="absolute inset-0 right-0 bottom-0 z-[0] h-20.25 w-78.5"
            src={GridSvg}
            alt=""
          />
        </div>
        {/* Features list */}
        <div className="flex flex-col">
          {tariff.shortFeatures.map((feature) => (
            <div
              className="flex h-11 items-center px-8 odd:bg-[#14171C]"
              key={feature.text}
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
                <span className="text-xs">{feature.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
