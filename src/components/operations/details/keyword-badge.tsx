type KeywordBadgeProps = {
  keyword: string;
};

export function KeywordBadge({ keyword }: KeywordBadgeProps) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-darker/10 text-primary-darkest font-display text-base font-semibold leading-[140%]">
      {keyword}
    </span>
  );
}
