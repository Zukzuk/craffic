import { ISeriesItem, IPaginatedSeries } from "@/types";
import { useState, useEffect } from "react";

export function useFetchSeries(page: number, limit: number = 100) {
  const [items, setItems] = useState<ISeriesItem[]>([]);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeries = async () => {
      setIsLoading(true);

      try {
        const apiUrl = "/api/comics/series";
        const res = await fetch(`${apiUrl}?page=${page}&limit=${limit}`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch series data");
        }

        const data: IPaginatedSeries = await res.json();
        setItems(data.items);
        setTotalPages(data.totalPages);
      } catch (error: any) {
        console.error("Fetch Error:", error);
        setError(error.message || "An error occurred while fetching series.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeries();
  }, [page, limit]);

  return { items, totalPages, isLoading, error };
}
