import moment from "moment";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

function normalizeLanguage(language?: string): "en" | "id" {
  return language?.toLowerCase().startsWith("id") ? "id" : "en";
}

export function useDateFormat() {
  const { i18n } = useTranslation();
  const language = normalizeLanguage(i18n.resolvedLanguage ?? i18n.language);
  const locale = language === "id" ? "id-ID" : "en-GB";

  return useMemo(() => {
    function dateFormat(value?: Date | string | null, format = "DD/MM/YYYY") {
      if (!value) return moment().locale(language).format(format);

      return moment(value).locale(language).format(format);
    }

    function formatCutOffDate(date: Date): string {
      return date.toLocaleString(locale, {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }

    function formatTransactionDate(date: Date): string {
      return date.toLocaleString(locale, {
        month: "long",
        year: "numeric",
      });
    }

    function formatTransactionDateShort(date: Date): string {
      return date.toLocaleString(locale, {
        month: "short",
        year: "numeric",
      });
    }

    function formatTransactionDateTime(date: Date | string): string {
      const parsedDate = typeof date === "string" ? new Date(date) : date;
      const formatted = parsedDate.toLocaleString(locale, {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });

      return `${formatted} WIB`;
    }

    function formatTransactionDetailsDate(date: Date | string): string {
      const parsedDate = typeof date === "string" ? new Date(date) : date;
      const formatted = parsedDate.toLocaleString(locale, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      return `${formatted}`;
    }

    function formatTransactionDetailsDateTime(date: Date | string): string {
      const parsedDate = typeof date === "string" ? new Date(date) : date;
      const formatted = parsedDate.toLocaleString(locale, {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      return `${formatted} WIB`;
    }

    return {
      dateFormat,
      formatCutOffDate,
      formatTransactionDate,
      formatTransactionDateShort,
      formatTransactionDateTime,
      formatTransactionDetailsDate,
      formatTransactionDetailsDateTime,
    };
  }, [language, locale]);
}

export function getCutOffDate(cutOffDay: number): Date {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), cutOffDay);
}
