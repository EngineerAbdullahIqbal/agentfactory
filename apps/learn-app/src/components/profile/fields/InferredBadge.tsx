import React from "react";

interface InferredBadgeProps {
  fieldPath: string;
  fieldSources?: Record<string, string>;
  onClick?: () => void;
}

export function InferredBadge({
  fieldPath,
  fieldSources,
  onClick,
}: InferredBadgeProps) {
  if (fieldSources?.[fieldPath] !== "inferred") return null;

  const label = "auto-set";
  const title = "This value was auto-set. Editing the field will override it.";

  if (!onClick) {
    return (
      <span
        title={title}
        className="text-xs border border-dashed border-muted-foreground/50 text-muted-foreground px-2 py-0.5 rounded-full"
      >
        {label}
      </span>
    );
  }

  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="text-xs border border-dashed border-muted-foreground/50 text-muted-foreground px-2 py-0.5 rounded-full cursor-pointer hover:border-primary hover:text-primary transition-colors"
    >
      {label}
    </button>
  );
}
