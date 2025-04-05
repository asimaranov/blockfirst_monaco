import { Tariff } from '~/app/lib/constants/tariff';
import Image from 'next/image';
import Link from 'next/link';
import TariffFeatureList from './TariffFeatureList';

// Component for tariff section
export default function TariffSection({
  tariff,
  showFeatures = true,
}: {
  tariff: Tariff;
  showFeatures?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <div className="relative h-20 border-t border-[#282D33] bg-[#01050D] bg-[url(/images/misc/tariff-section-grid.svg)] bg-cover bg-right-bottom bg-no-repeat">
        <div className="pointer-events-none absolute inset-0 z-[1] opacity-50 mix-blend-soft-light">
          <div className="bg-gradient-radial h-full w-full from-gray-100 to-transparent" />
        </div>
        <div className="relative z-[2] px-5 py-5 sm:px-8">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-4">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-[#01050D]">
                <Image
                  src={tariff.bigIcon}
                  alt={tariff.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-base font-medium">{tariff.name}</span>
                  {tariff.sale && (
                    <span className="bg-error rounded-full px-2 py-1 text-xs">
                      Sale {tariff.sale.percent}%
                    </span>
                  )}
                </div>
                <div className="text-secondary text-xs">Платный тариф</div>
              </div>
            </div>
            <Link href="/pricing">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.901 4.46918C11.1939 4.17629 11.6688 4.17629 11.9617 4.46918L16.9617 9.46913C17.1023 9.60978 17.1814 9.80055 17.1814 9.99946C17.1814 10.1984 17.1023 10.3891 16.9617 10.5298L11.9617 15.5298C11.6688 15.8227 11.1939 15.8227 10.901 15.5298C10.6081 15.2369 10.6081 14.762 10.901 14.4691L14.6207 10.7495H3.57422C3.16001 10.7495 2.82422 10.4137 2.82422 9.99946C2.82422 9.58525 3.16001 9.24946 3.57422 9.24946H14.6207L10.901 5.52984C10.6081 5.23695 10.6081 4.76208 10.901 4.46918Z"
                  fill="#F2F2F2"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      {showFeatures && <TariffFeatureList features={tariff.shortFeatures} />}
    </div>
  );
}
