import { NotificationContentPromo } from './NotificationContent';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';

import { PromoNotification, Notification } from './types';
import { useCallback, useEffect, useState } from 'react';
import { cn } from '~/helpers';
import { PanInfo } from 'motion/react';

/*
  emblaRef,
  pauseAutoplay,
  resumeAutoplay,
  dismissNotification,
  selectedIndex,
  scrollTo,
*/

// Embla carousel options
const options: EmblaOptionsType = {
  loop: true,
  align: 'center',
  containScroll: 'trimSnaps',
  dragFree: false,
  duration: 25,
  skipSnaps: false,
};

const autoplayOptions = {
  delay: 6000,
  playOnInit: true,
  stopOnInteraction: true,
  stopOnMouseEnter: true,
  rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
};

export default function PromoCarousel({
  incomingNotifications,
  dismissNotification,
}: {
  incomingNotifications: Notification[];
  dismissNotification: (id: string) => void;
}) {
  // Embla carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay(autoplayOptions),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  // Autoplay control functions
  const pauseAutoplay = useCallback(() => {
    if (emblaApi) {
      const autoplay = emblaApi.plugins().autoplay;
      if (autoplay) autoplay.stop();
    }
  }, [emblaApi]);

  const resumeAutoplay = useCallback(() => {
    if (emblaApi) {
      const autoplay = emblaApi.plugins().autoplay;
      if (autoplay) autoplay.play();
    }
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // // Add swipe functionality for mobile
  // const handleSwipeComplete = (id: string, info: PanInfo) => {
  //   if (info.offset.x < -100) {
  //     dismissNotification(id);
  //   }
  // };

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

  return (
    <>
      {incomingNotifications.some((n) => n.type === 'promo') && (
        <div
          className="relative overflow-hidden"
          ref={emblaRef}
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
        >
          <div className="flex">
            {incomingNotifications
              .filter(
                (notification): notification is PromoNotification =>
                  notification.type === 'promo'
              )
              .map((notification) => (
                <NotificationContentPromo
                  key={notification.id}
                  notification={notification}
                  dismissNotification={dismissNotification}
                />
              ))}
          </div>
          {/* Pagination dots */}
          <div className="absolute right-0 bottom-4 left-0 flex justify-center space-x-1.5">
            {Array.from({
              length: incomingNotifications.filter((n) => n.type === 'promo')
                .length,
            }).map((_, index) => (
              <button
                key={index}
                className={cn(
                  'h-0.5 w-4 transition-all duration-200 ease-in-out',
                  index === selectedIndex
                    ? 'bg-primary'
                    : 'bg-[#282d33] hover:bg-[#3a3f47]'
                )}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
