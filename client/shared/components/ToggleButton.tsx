import { useState, useRef, useEffect } from "react";
import { Toggle } from "@base-ui/react/toggle";
import clsx from "clsx";

type Visibility = "public" | "private";

export const VisibilityToggle = () => {
  const [selected, setSelected] = useState<Visibility>("public");
  const publicRef = useRef<HTMLButtonElement>(null);
  const privateRef = useRef<HTMLButtonElement>(null);
  const [sliderStyle, setSliderStyle] = useState({ width: 0, translateX: 0 });

  useEffect(() => {
    const publicBtn = publicRef.current;
    const privateBtn = privateRef.current;
    if (!publicBtn || !privateBtn) return;

    if (selected === "public") {
      setSliderStyle({ width: publicBtn.offsetWidth, translateX: 0 });
    } else {
      setSliderStyle({
        width: privateBtn.offsetWidth,
        translateX: publicBtn.offsetWidth,
      });
    }
  }, [selected]);

  return (
    <div className="relative inline-flex h-10 bg-zinc-200 rounded-[18px] p-0.5">
      <div
        className="absolute top-0.5 bottom-0.5 bg-white rounded-2xl inset-shadow-button transition-all duration-200"
        style={{
          width: sliderStyle.width,
          transform: `translateX(${sliderStyle.translateX}px)`,
          left: "2px",
        }}
      />

      <Toggle
        ref={publicRef}
        pressed={selected === "public"}
        onPressedChange={() => setSelected("public")}
        className={clsx(
          "relative z-10 px-3 w-auto py-1.5 text-sm rounded-2xl transition-colors duration-200",
          selected === "public"
            ? "font-semibold text-zinc-600"
            : "text-zinc-600",
        )}
      >
        공개
      </Toggle>

      <Toggle
        ref={privateRef}
        pressed={selected === "private"}
        onPressedChange={() => setSelected("private")}
        className={clsx(
          "relative z-10 px-3 w-auto py-1.5 text-sm rounded-2xl transition-colors duration-200",
          selected === "private"
            ? "font-semibold text-zinc-600"
            : "text-zinc-600",
        )}
      >
        비공개
      </Toggle>
    </div>
  );
};
