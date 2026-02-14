import { BaseContainer } from "@/shared/components/BaseContainer";
import { NavigationBar } from "@/shared/components/NavigationBar";

export default function Home() {
  return (
    <div>
      <BaseContainer className="music bg-blue-400 h-[calc(100svh-200px)]">
        노래
      </BaseContainer>
      <main>
        <NavigationBar />
      </main>
    </div>
  );
}
