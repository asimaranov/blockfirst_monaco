'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';

import { cn } from '@udecode/cn';
import { PlateElement, useElement } from '@udecode/plate/react';

const options: EmblaOptionsType = {
  loop: true,
  align: 'center',
  containScroll: 'trimSnaps',
  dragFree: false,
  duration: 25,
  skipSnaps: false,
};

export function ColumnGroupElement({
  children,
  className,
  ...props
}: React.ComponentProps<typeof PlateElement>) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  // Count the number of slides (children)
  useEffect(() => {
    if (!emblaApi) return;
    setSlideCount(emblaApi.slideNodes().length);
  }, [emblaApi]);

  // Update selected index when slide changes
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  return (
    <PlateElement className={cn(className, 'relative mb-4')} {...props}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex items-center [&_.inline-block]:block [&_.slate-img]:mt-0 [&_.slate-img]:mb-0">
          {children}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute right-0 bottom-4 left-0 flex justify-center space-x-1">
        {Array.from({ length: slideCount }).map((_, index) => (
          <button
            key={`slide-dot-${index}`}
            className={cn(
              'h-0.5 w-4 transition-all duration-200 ease-in-out',
              index === selectedIndex ? 'bg-[#195AF4]' : 'bg-[#282D33]'
            )}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </PlateElement>
  );
}
