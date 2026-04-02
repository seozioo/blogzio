import * as React from "react";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import {
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@phosphor-icons/react";

export const PostToggleGroup = () => {
  return (
    <ToggleGroup
      defaultValue={["left"]}
      className="flex gap-1 bg-zinc-200 rounded-[18px] p-0.5"
    >
      <Toggle
        aria-label="Align left"
        value="left"
        className=" w-8 h-8 rounded-lg hover:bg-zinc-100"
      >
        <TextAlignLeftIcon size={24} weight="bold" />
      </Toggle>
      <Toggle aria-label="Align center" value="center">
        <TextAlignCenterIcon size={32} weight="bold" />
      </Toggle>
      <Toggle aria-label="Align right" value="right">
        <TextAlignRightIcon size={32} weight="bold" />
      </Toggle>
      <Toggle aria-label="Justify" value="justify">
        <TextAlignJustifyIcon size={32} weight="bold" />
      </Toggle>
    </ToggleGroup>
  );
};
