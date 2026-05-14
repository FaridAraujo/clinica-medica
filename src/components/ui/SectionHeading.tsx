interface SectionHeadingProps {
  label?: string;
  title: string;
  className?: string;
}

export default function SectionHeading({ label, title, className }: SectionHeadingProps) {
  return (
    <div className={className}>
      {label && <p>{label}</p>}
      <h2>{title}</h2>
    </div>
  );
}
