import { Popover } from '@base-ui/react';
import { useApi } from '../hooks/use-api';
import { useEffect } from 'react';

const popover = Popover.createHandle();

export type BioBubble = Readonly<{
  children: React.ReactNode;
}>;

const BIO_BUBBLE_TRIGGER_ID = 'bio-bubble-trigger';

export const BioBubble = (props: BioBubble) => {
  const { data, isLoading } = useApi('/user/profileview');

  useEffect(() => {
    if (!isLoading && data) {
      popover.open(BIO_BUBBLE_TRIGGER_ID);

      const timer = setTimeout(() => {
        popover.close();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <>
      <Popover.Trigger
        id={BIO_BUBBLE_TRIGGER_ID}
        className="outline-none"
        handle={popover}
        openOnHover
        delay={0}
        closeDelay={0}
        render={<span />}
        nativeButton={false}
      >
        {props.children}
      </Popover.Trigger>
      <Popover.Root handle={popover}>
        <Popover.Portal>
          <Popover.Positioner
            className="h-(--positioner-height) w-(--positioner-width) max-w-(--available-width)"
            sideOffset={10}
            arrowPadding={16}
            collisionPadding={16}
          >
            <Popover.Popup
              className={`
              h-(--popup-height,auto)
              w-(--popup-width,auto) max-w-125
              origin-(--transform-origin) rounded-2xl bg-white
              px-4 py-2
              shadow-sm
              inset-ring
              inset-ring-zinc-300
              outline-none
              transition-[transform,scale,opacity]
              data-ending-style:scale-90
              data-ending-style:opacity-0
              data-starting-style:scale-90
              data-starting-style:opacity-0
              `}
            >
              <Popover.Arrow className="data-[side=bottom]:-top-2 data-[side=left]:-right-3 data-[side=left]:rotate-90 data-[side=right]:-left-3 data-[side=right]:-rotate-90 data-[side=top]:-bottom-3 data-[side=top]:rotate-180">
                <svg
                  width="14"
                  height="9"
                  viewBox="0 0 14 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 1L0 9H14L7 1Z" fill="white" />
                  <path d="M0 7.5H1L7 1L13 7.5H14" stroke="#D4D4D8" />
                </svg>
              </Popover.Arrow>
              <Popover.Title className="text-sm">{data?.bio}</Popover.Title>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
};
