import { useTranslation } from "react-i18next";

type GlobalConformitySummaryProps = {
  summary: string;
};

export const GlobalConformitySummary = ({
  summary,
}: GlobalConformitySummaryProps) => {
  const { t } = useTranslation("operations");

  return (
    <div className="space-y-2">
      <h3 className="font-display text-2xl font-medium leading-[140%] text-primary">
        {t("globalConformity.summaryTitle")}
      </h3>
      <p className="text-sm text-foreground leading-relaxed max-w-[947px]">
        {summary}
      </p>
    </div>
  );
};
