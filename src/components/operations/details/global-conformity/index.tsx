import { useTranslation } from "react-i18next";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GlobalConformityHeader } from "@/components/operations/details/global-conformity/global-conformity-header";
import { GlobalConformitySummary } from "@/components/operations/details/global-conformity/global-conformity-summary";
import { IssuesTable } from "@/components/operations/details/global-conformity/issues-table";
import { VerificationTable } from "@/components/operations/details/global-conformity/verification-table";
import type { GlobalConformityAnalysis } from "@/api/operations/schemas/conformity";

type GlobalConformitySectionProps = {
  globalConformity: GlobalConformityAnalysis | null;
  isAnalyzing: boolean;
  onAnalyze: () => void;
};

export function GlobalConformitySection({
  globalConformity,
  isAnalyzing,
  onAnalyze,
}: GlobalConformitySectionProps) {
  const { t } = useTranslation("operations");

  const handleDownload = () => {
    alert(t("globalConformity.downloadMock"));
  };

  const hasAnalysis = globalConformity !== null;

  return (
    <div className="space-y-8">
      {/* Analysis button */}
      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={onAnalyze}
          disabled={isAnalyzing || hasAnalysis}
          className="px-8 font-display font-semibold text-base leading-5 bg-[#007F72] hover:bg-[#007F72]/90 text-white"
        >
          {isAnalyzing && <Loader2 className="size-4 mr-2 animate-spin" />}
          {isAnalyzing
            ? t("globalConformity.analyzing")
            : t("globalConformity.launchAnalysis")}
        </Button>
      </div>

      {/* Results section */}
      {globalConformity && (
        <Card className="p-6 bg-surface/20 ring-0 rounded-[16px]">
          {/* Header */}
          <GlobalConformityHeader
            globalStatus={globalConformity.globalStatus}
            onDownload={handleDownload}
          />

          {/* Summary */}
          <GlobalConformitySummary summary={globalConformity.summary} />

          {/* Verification steps */}
          <div className="mt-6 space-y-4">
            <h3 className="font-display text-2xl font-medium leading-[140%] text-primary">
              {t("globalConformity.verificationStepsTitle")}
            </h3>
            <VerificationTable steps={globalConformity.verificationSteps} />
          </div>

          {/* Issues / Non-conformities */}
          <div className="mt-6 space-y-4">
            <h3 className="font-display text-2xl font-medium leading-[140%] text-primary">
              {t("globalConformity.nonConformitiesTitle")}
            </h3>
            <IssuesTable issues={globalConformity.nonConformities} />
          </div>

          {/* Download button at bottom */}
          <div className="flex justify-center mt-6">
            <Button
              size="lg"
              onClick={handleDownload}
              className="px-8 font-display font-semibold text-base leading-5 bg-[#007F72] hover:bg-[#007F72]/90 text-white"
            >
              <Download className="size-4 mr-2" />
              {t("globalConformity.downloadFull")}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
