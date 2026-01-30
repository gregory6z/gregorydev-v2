import { useState, useEffect } from "react";
import { mockExtractData } from "@/api/operations/mocks";
import type { ExtractedData } from "@/api/operations/schemas";

type UseExtractedDataReturn = {
  data: ExtractedData | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
};

export const useExtractedData = (enabled: boolean): UseExtractedDataReturn => {
  const [data, setData] = useState<ExtractedData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await mockExtractData();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to extract data"));
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch only when enabled becomes true
  useEffect(() => {
    if (enabled && !data && !isLoading) {
      fetchData();
    }
  }, [enabled]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
};
