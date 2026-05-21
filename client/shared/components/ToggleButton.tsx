import { useState, useRef, useEffect, useCallback } from 'react';
import { Toggle } from '@base-ui/react/toggle';
import clsx from 'clsx';

type Visibility = 'public' | 'private';

export type VisibilityToggleProps = Readonly<{
  value?: Visibility;
  defaultValue?: Visibility;
  onChange?: (value: Visibility) => void;
}>;

export const VisibilityToggle = ({
  value,
  defaultValue = 'public',
  onChange,
}: VisibilityToggleProps) => {
  const [uncontrolledSelected, setUncontrolledSelected] =
    useState<Visibility>(defaultValue);
  const selected = value ?? uncontrolledSelected;
  const publicRef = useRef<HTMLButtonElement>(null);
  const privateRef = useRef<HTMLButtonElement>(null);
  const [sliderStyle, setSliderStyle] = useState({ width: 0, translateX: 0 });
  const [animate, setAnimate] = useState(false);

  const handleChange = (nextValue: Visibility) => {
    if (value === undefined) {
      setUncontrolledSelected(nextValue);
    }

    onChange?.(nextValue);
  };

  const updateSlider = useCallback(() => {
    const publicBtn = publicRef.current;
    const privateBtn = privateRef.current;
    if (!publicBtn || !privateBtn) return;

    if (selected === 'public') {
      setSliderStyle({ width: publicBtn.offsetWidth, translateX: 0 });
    } else {
      setSliderStyle({
        width: privateBtn.offsetWidth,
        translateX: publicBtn.offsetWidth,
      });
    }
  }, [selected]);

  useEffect(() => {
    setAnimate(true);
    updateSlider();
  }, [selected]);

  useEffect(() => {
    const publicBtn = publicRef.current;
    const privateBtn = privateRef.current;
    if (!publicBtn || !privateBtn) return;

    const observer = new ResizeObserver(() => {
      setAnimate(false);
      updateSlider();
    });
    observer.observe(publicBtn);
    observer.observe(privateBtn);
    return () => observer.disconnect();
  }, [updateSlider]);

  return (
    <div className="relative flex h-10 bg-zinc-200 rounded-[18px] p-0.5 -my-0.5">
      <div
        className={clsx(
          'absolute top-0.5 bottom-0.5 bg-white border-ring border-border rounded-2xl inset-shadow-button',
          animate && 'transition-all duration-200',
        )}
        style={{
          width: sliderStyle.width,
          transform: `translateX(${sliderStyle.translateX}px)`,
          left: '2px',
        }}
      />

      <Toggle
        ref={publicRef}
        pressed={selected === 'public'}
        onPressedChange={() => {
          handleChange('public');
        }}
        className={clsx(
          'relative z-10 flex-1 min-w-fit px-3 py-1.5 text-sm rounded-2xl transition-colors duration-200',
          selected === 'public'
            ? 'font-semibold text-zinc-600'
            : 'text-zinc-600',
        )}
      >
        공개
      </Toggle>

      <Toggle
        ref={privateRef}
        pressed={selected === 'private'}
        onPressedChange={() => {
          handleChange('private');
        }}
        className={clsx(
          'relative z-10 flex-1 min-w-fit px-3 py-1.5 text-sm rounded-2xl transition-colors duration-200',
          selected === 'private'
            ? 'font-semibold text-zinc-600'
            : 'text-zinc-600',
        )}
      >
        비공개
      </Toggle>
    </div>
  );
};
