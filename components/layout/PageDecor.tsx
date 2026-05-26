/**
 * Fixed atmospheric layer: warm gold & sage drift behind content.
 * Purely decorative; pointer-events none; respects reduced motion via CSS.
 */
export function PageDecor() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="animate-ambient-a absolute -left-[18%] top-[-12%] h-[min(85vw,52rem)] w-[min(85vw,52rem)] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.14),transparent_62%)] blur-3xl" />
      <div className="animate-ambient-b absolute -right-[12%] top-[28%] h-[min(70vw,42rem)] w-[min(70vw,42rem)] rounded-full bg-[radial-gradient(circle_at_70%_40%,rgba(122,158,140,0.09),transparent_58%)] blur-3xl" />
      <div className="animate-ambient-c absolute -bottom-[8%] left-[22%] h-[min(65vw,38rem)] w-[min(65vw,38rem)] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(28,46,69,0.06),transparent_55%)] blur-3xl" />
    </div>
  );
}
