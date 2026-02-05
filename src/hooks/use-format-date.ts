import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const useFormatDate = () => {
  const { i18n } = useTranslation();

  return useCallback(
    (isoDate: string): string => {
      return new Intl.DateTimeFormat(i18n.language, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(isoDate));
    },
    [i18n.language]
  );
};
