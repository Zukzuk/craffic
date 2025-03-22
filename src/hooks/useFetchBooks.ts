import { useState, useEffect } from "react";
import { IBookItem, IPaginatedBooks } from "@/types";

export function useFetchBooks(seriesId: string, page: number, limit: number = 100) {
  const [items, setItems] = useState<IBookItem[]>([]);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);

      try {
        const apiUrl = "/api/comics/books";
        const res = await fetch(`${apiUrl}?seriesId=${seriesId}&page=${page}&limit=${limit}`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch books data");
        }

        const data: IPaginatedBooks = await res.json();
        setItems(data.items);
        setTotalPages(data.totalPages);
      } catch (error: any) {
        console.error("Fetch Error:", error);
        setError(error.message || "An error occurred while fetching books.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [seriesId, page, limit]);

  return { items, totalPages, isLoading, error };
}
