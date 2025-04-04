'use client';

import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';

export default function QrCode({ data }: { data: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [qrCode, setQrCode] = useState<QRCodeStyling>();

  useEffect(() => {
    const qrCode = new QRCodeStyling({
      type: 'svg',
      width: 300,
      height: 300,
      margin: 10,
      // image:
      //   '/images/misc/qr-logo.svg',
      dotsOptions: {
        color: '#01050D',
        type: 'rounded',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#01050D' },
            { offset: 1, color: '#01050D' },
          ],
        },
      },
      backgroundOptions: {
        color: '#f2f2f2',
        round: 0.2,
      },
      cornersSquareOptions: {
        type: 'rounded',
      },
      cornersDotOptions: {
        type: 'rounded',
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 10,
      },
    });

    if (ref.current) {
      qrCode.append(ref.current);
    }

    setQrCode(qrCode);
  }, []);

  useEffect(() => {
    if (qrCode) {
      qrCode.update({
        data: data,
      });
    }
  }, [data, qrCode]);

  return (
    <div
      className="h-[calc(100*100cqw/1626)] w-[calc(100*100cqw/1626)] [&>*]:h-[calc(100*100cqw/1626)] [&>*]:w-[calc(100*100cqw/1626)]"
      ref={ref}
    />
  );
}
