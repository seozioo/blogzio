import * as React from "react";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import {
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@phosphor-icons/react";

// 애니메이션 효과 넣기

export const PostToggleGroup = () => {
  return (
    <ToggleGroup
      defaultValue={["left"]}
      className="flex gap-1 bg-zinc-200 rounded-[10px] p-0.5"
    >
      <Toggle
        aria-label="Align left"
        value="left"
        className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-600 hover:bg-zinc-100 data-pressed:bg-white"
      >
        <TextAlignLeftIcon size={24} weight="bold" />
      </Toggle>
      <Toggle
        aria-label="Align center"
        value="center"
        className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-600 hover:bg-zinc-100 data-pressed:bg-white"
      >
        <TextAlignCenterIcon size={24} weight="bold" />
      </Toggle>
      <Toggle
        aria-label="Align right"
        value="right"
        className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-600 hover:bg-zinc-100 data-pressed:bg-white"
      >
        <TextAlignRightIcon size={24} weight="bold" />
      </Toggle>
      <Toggle
        aria-label="Justify"
        value="justify"
        className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-600 hover:bg-zinc-100 data-pressed:bg-white"
      >
        <TextAlignJustifyIcon size={24} weight="bold" />
      </Toggle>
    </ToggleGroup>
  );
};
