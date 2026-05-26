"use client";

type HoneypotFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

/** Hidden spam trap — leave empty. */
export function HoneypotField({ value, onChange }: HoneypotFieldProps) {
  return (
    <input
      type="text"
      name="companyWebsite"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden
      className="absolute -left-[9999px] h-0 w-0 opacity-0"
      value={value}
      onChange={(ev) => onChange(ev.target.value)}
    />
  );
}
