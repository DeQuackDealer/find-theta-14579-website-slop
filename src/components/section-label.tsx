export function SectionLabel({
  children,
  index,
}: {
  children: string;
  index?: string;
}) {
  return (
    <p className="label-mono mb-4 flex items-center gap-3 text-fg-faint">
      <span className="h-px w-6 bg-accent" aria-hidden="true" />
      {index ? <span>{index} /</span> : null}
      {children}
    </p>
  );
}
