import { useTranslation } from "react-i18next";

export const useFormatCurrency = () => {
  const { i18n } = useTranslation();

  return (value: number): string => {
    return new Intl.NumberFormat(i18n.language, {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };
};
