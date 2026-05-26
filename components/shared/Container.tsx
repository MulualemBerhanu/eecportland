import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
};

export function Container({ children, className, narrow }: Props) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-10 2xl:max-w-[88rem] 2xl:px-14",
        narrow && "max-w-3xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
