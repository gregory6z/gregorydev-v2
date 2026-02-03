import { useTranslation } from "react-i18next";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GlobalCoherenceHeader } from "@/components/operations/details/global-coherence/global-coherence-header";
import { GlobalCoherenceSummary } from "@/components/operations/details/global-coherence/global-coherence-summary";
import { IssuesTable } from "@/components/operations/details/global-coherence/issues-table";
import { VerificationTable } from "@/components/operations/details/global-coherence/verification-table";
import type { GlobalCoherenceAnalysis } from "@/api/operations/schemas";

type GlobalCoherenceSectionProps = {
  globalCoherence: GlobalCoherenceAnalysis | null;
  isAnalyzing: boolean;
  onAnalyze: () => void;
};

export function GlobalCoherenceSection({
  globalCoherence,
  isAnalyzing,
  onAnalyze,
}: GlobalCoherenceSectionProps) {
  const { t } = useTranslation("operations");

  const handleDownload = () => {
    alert(t("globalCoherence.downloadMock"));
  };

  const hasAnalysis = globalCoherence !== null;

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
            ? t("globalCoherence.analyzing")
            : t("globalCoherence.launchAnalysis")}
        </Button>
      </div>

      {/* Results section */}
      {globalCoherence && (
        <Card className="p-6 bg-surface/20 ring-0 rounded-[16px]">
          {/* Header */}
          <GlobalCoherenceHeader
            globalStatus={globalCoherence.globalStatus}
            onDownload={handleDownload}
          />

          {/* Summary */}
          <GlobalCoherenceSummary summary={globalCoherence.summary} />

          {/* Verification steps */}
          <div className="mt-6 space-y-4">
            <h3 className="font-display text-2xl font-medium leading-[140%] text-primary">
              {t("globalCoherence.verificationStepsTitle")}
            </h3>
            <VerificationTable steps={globalCoherence.verificationSteps} />
          </div>

          {/* Issues / Non-conformities */}
          <div className="mt-6 space-y-4">
            <h3 className="font-display text-2xl font-medium leading-[140%] text-primary">
              {t("globalCoherence.nonConformitiesTitle")}
            </h3>
            <IssuesTable issues={globalCoherence.nonConformities} />
          </div>

          {/* Download button at bottom */}
          <div className="flex justify-center mt-6">
            <Button
              size="lg"
              onClick={handleDownload}
              className="px-8 font-display font-semibold text-base leading-5 bg-[#007F72] hover:bg-[#007F72]/90 text-white"
            >
              <Download className="size-4 mr-2" />
              {t("globalCoherence.downloadFull")}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
