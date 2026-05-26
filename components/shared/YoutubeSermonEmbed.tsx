import { cn } from "@/lib/utils";

type Props = {
  videoId: string;
  title: string;
  className?: string;
  priority?: boolean;
  autoplay?: boolean;
};

export function YoutubeSermonEmbed({
  videoId,
  title,
  className,
  priority,
  autoplay = false,
}: Props) {
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    iv_load_policy: "3",
    vq: "hd1080",
  });

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden bg-navy-950",
        className,
      )}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?${params.toString()}`}
        title={title}
        className="absolute inset-0 h-full w-full rounded-[inherit]"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  );
}
