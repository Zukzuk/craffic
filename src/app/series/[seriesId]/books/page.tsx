"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useFetchBooks } from "@/hooks/useFetchBooks";
import { usePagination } from "@/contexts/PaginationContext";
import BookCard from "@/components/card/BookCard";
import NumericalPaginator from "@/components/paginator/NumericalPaginator";
import { IBookItem } from "@/types";

export default function BooksPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const seriesId = params.seriesId as string;
  const pageNumber = Number(searchParams.get("page")) || 1;
  const { currentPage, setPage, totalPages, setTotalPages } = usePagination();
  const { items, totalPages: fetchedTotalPages, isLoading, error } = useFetchBooks(seriesId, pageNumber);
  const [displayedItems, setDisplayedItems] = useState<IBookItem[]>([]);
  const [showBottomPaginator, doShowBottomPaginator] = useState(false);

  useEffect(() => {
    if (items.length > 0) {
      setDisplayedItems(items);
      doShowBottomPaginator(true);
    } else {
      doShowBottomPaginator(false);
    }
  }, [items]);

  useEffect(() => {
    if (currentPage !== pageNumber) {
      setPage(pageNumber);
    }
  }, [pageNumber]);

  useEffect(() => {
    if (fetchedTotalPages !== null && fetchedTotalPages !== totalPages) {
      setTotalPages(fetchedTotalPages);
    }
  }, [fetchedTotalPages]);

  return (
    <>
      <div className="sticky top-0 h-9 pt-1 bg-gray-800 z-20 shadow-md">
        <NumericalPaginator />
      </div>
      <div className="pl-4 pr-10 mt-2 mb-4 grid grid-cols-elastic-cards gap-2">
        {error && <p className="text-red-500">{error}</p>}
        {!error &&
          displayedItems.map((item) => (
            <BookCard
              key={item.id}
              {...item}
            />
          ))}
      </div>
      {showBottomPaginator && totalPages > 1 &&
        <div className="bottom-0 h-9 pt-1 bg-gray-800 z-20 drop-shadow-top">
          <NumericalPaginator isBottom={true} />
        </div>
      }
    </>
  );
}
