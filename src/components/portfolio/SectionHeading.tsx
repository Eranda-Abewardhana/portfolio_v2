import { ArrowDownRight } from "lucide-react";

export default function SectionHeading({
  number,
  label,
  children,
  aside,
}: {
  number: string;
  label: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div className="p-section-heading">
      <div>
        <div className="p-section-label">
          <span>{number} /</span> {label}
        </div>
        <h2 className="p-display">{children}</h2>
      </div>
      {aside ? (
        <div className="p-section-aside">{aside}</div>
      ) : (
        <ArrowDownRight
          className="p-heading-arrow"
          strokeWidth={1}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
