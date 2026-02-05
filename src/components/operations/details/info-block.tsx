import React from "react";

type InfoBlockProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function InfoBlock({ title, children, className }: InfoBlockProps) {
  const visibleChildren = React.Children.toArray(children).filter(Boolean);

  if (visibleChildren.length === 0) return null;

  return (
    <div className={className}>
      <h3 className="text-[24px] font-medium leading-[140%] text-primary font-display">
        {title}
      </h3>
      <dl>{children}</dl>
    </div>
  );
}
