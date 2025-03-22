import { IAlphabeticalMapping } from "@/types";
import { useState, useEffect } from "react";

export function useAlphabeticalToPageMapping(limit: number = 100) {
  const [mapping, setMapping] = useState<IAlphabeticalMapping>({ alphabet: {}, numbered: {} });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMapping = async () => {
      setIsLoading(true);

      try {
        const apiUrl = "/api/comics/alphabetical";
        const res = await fetch(`${apiUrl}?limit=${limit}`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch series data");
        }

        const data: IAlphabeticalMapping = await res.json();
        setMapping(data);
      } catch (error: any) {
        console.error("Fetch Error:", error);
        setError(error.message || "An error occurred while fetching alphabetical mapping data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMapping();
  }, [limit]);

  return { mapping, isLoading, error };
}
