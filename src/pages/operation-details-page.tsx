import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@/components/icons";
import { DetailsHeader } from "@/components/operations/details/details-header";
import { InfoBlock } from "@/components/operations/details/info-block";
import { InfoField } from "@/components/operations/details/info-field";
import { KeywordBadge } from "@/components/operations/details/keyword-badge";
import { FilesTable } from "@/components/operations/details/files-table";
import { GlobalCoherenceSection } from "@/components/operations/details/global-coherence";
import { useOperationDetails, operationsKeys } from "@/api/operations/queries";
import { useRunGlobalAnalysis } from "@/api/operations/mutations";
import { useFormatDate } from "@/hooks/use-format-date";
import { useFormatCurrency } from "@/hooks/use-format-currency";

export function OperationDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation("operations");
  const queryClient = useQueryClient();
  const formatDate = useFormatDate();
  const formatCurrency = useFormatCurrency();

  const { data, isLoading, isError } = useOperationDetails(id!);
  const analysisMutation = useRunGlobalAnalysis();

  const handleBack = () => navigate("/operations");

  const handleAnalysis = () => {
    analysisMutation.mutate(id!, {
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: operationsKeys.detail(id!),
        });
      },
    });
  };

  const handleUploadNewVersion = (fileId: string) => {
    // TODO: Ouvrir un file picker et appeler la mutation
    console.log("Upload new version for file:", fileId);
  };

  const handleAddFile = () => {
    // TODO: Ouvrir un file picker et appeler la mutation
    console.log("Add new file");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-muted-foreground">{t("details.loadError")}</p>
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeftIcon className="size-4 mr-2" />
          {t("details.backToList")}
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <DetailsHeader
        beneficiaryName={data.beneficiary?.name ?? null}
        reference={data.reference}
        conformity={data.conformity}
        onBack={handleBack}
      />

      {/* Main content: 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-[553px_minmax(0,1fr)] gap-5 mb-8 items-stretch">
        {/* Left column: General info */}
        <Card className="p-6 space-y-[22px] bg-primary/10 ring-0 shadow-none rounded-[16px] gap-0">
          <InfoField
            label={t("details.creationDate")}
            value={data.creationDate ? formatDate(data.creationDate) : null}
            vertical
          />
          <InfoField
            label={t("details.engagementDate")}
            value={data.engagementDate ? formatDate(data.engagementDate) : null}
            vertical
          />
          <InfoField
            label={t("details.fostCode")}
            value={data.fostCode}
            vertical
          />

          {data.keywords && data.keywords.length > 0 && (
            <div className="space-y-2">
              <span className="text-sm font-medium text-primary">
                {t("details.keywords")}
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.keywords.map((keyword) => (
                  <KeywordBadge key={keyword} keyword={keyword} />
                ))}
              </div>
            </div>
          )}

          <InfoField
            label={t("details.summary")}
            value={data.summary}
            vertical
          />
        </Card>

        {/* Right column: Multiple blocks */}
        <Card className="p-6 space-y-[22px] bg-primary/10 ring-0 shadow-none rounded-[16px] gap-0">
          {/* Mentions opération */}
          <InfoBlock title={t("details.mentionsOperation")}>
            <InfoField
              label={t("details.amountTTC")}
              value={
                data.amountTTC !== null ? formatCurrency(data.amountTTC) : null
              }
            />
            <InfoField
              label={t("details.primeCEE")}
              value={
                data.primeCEE !== null ? formatCurrency(data.primeCEE) : null
              }
            />
            <InfoField
              label={t("details.quoteSignatureDate")}
              value={
                data.quoteSignatureDate
                  ? formatDate(data.quoteSignatureDate)
                  : null
              }
            />
            <InfoField
              label={t("details.workAddress")}
              value={data.workAddress}
            />
          </InfoBlock>

          {/* Bénéficiaire */}
          <InfoBlock title={t("details.beneficiary")}>
            <InfoField
              label={t("details.beneficiaryName")}
              value={data.beneficiary?.name}
            />
            <InfoField
              label={t("details.beneficiaryAddress")}
              value={data.beneficiary?.address}
            />
            <InfoField
              label={t("details.beneficiaryEmail")}
              value={data.beneficiary?.email}
            />
            <InfoField
              label={t("details.beneficiaryPhone")}
              value={data.beneficiary?.phone}
            />
          </InfoBlock>

          {/* Professionnel RGE */}
          <InfoBlock title={t("details.professionalRGE")}>
            <InfoField
              label={t("details.siret")}
              value={data.professionalRGE?.siret}
            />
            <InfoField
              label={t("details.professionalAddress")}
              value={data.professionalRGE?.address}
            />
          </InfoBlock>

          {/* Obligé/Délégataire */}
          {data.obligee && (
            <InfoBlock title={t("details.obligee")}>
              <dd className="text-sm text-foreground">{data.obligee}</dd>
            </InfoBlock>
          )}
        </Card>
      </div>

      {/* Files table */}
      <FilesTable
        files={data.files}
        onUploadNewVersion={handleUploadNewVersion}
        onAddFile={handleAddFile}
      />

      {/* Global Coherence Section */}
      <div className="mt-8">
        <GlobalCoherenceSection
          globalCoherence={data.globalCoherence}
          isAnalyzing={analysisMutation.isPending}
          onAnalyze={handleAnalysis}
        />
      </div>
    </>
  );
}
