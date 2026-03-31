import { BaseContainer } from "./BaseContainer";

// 높이는 calc(100svh-144px)로 고정한다.
export const MusicPlayer = () => {
  return (
    <BaseContainer className="flex flex-col justify-center items-center bg-blue-50 h-[calc(100svh-144px)] text-6xl font-black text-sky-500">
      <p className="text-2xl">-WIP-</p>
      Music Player
    </BaseContainer>
  );
};
