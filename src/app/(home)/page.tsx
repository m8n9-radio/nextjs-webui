import { StreamPlayerComponent } from "@/components/stream-player/stream-player.component";
import { metadata } from "@/libs/metadata.lib";

export function generateMetadata() {
  return metadata();
}

export default function HomePage() {
  return (
    <div className={"w-xs mx-auto pt-24"}>
      <StreamPlayerComponent />
    </div>
  );
}
