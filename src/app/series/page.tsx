"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useFetchSeries } from "@/hooks/useFetchSeries";
import { usePagination } from "@/contexts/PaginationContext";
import SeriesCard from "@/components/card/SeriesCard";
import NumericalPaginator from "@/components/paginator/NumericalPaginator";
import AlphabeticalPaginator from "@/components/paginator/AlphabeticalPaginator";
import { ISeriesItem } from "@/types";

export default function PaginatedListPage() {
  const searchParams = useSearchParams();
  const pageNumber = Number(searchParams.get("page")) || 1;
  const { currentPage, setPage, totalPages, setTotalPages } = usePagination();
  const { items, totalPages: fetchedTotalPages, isLoading, error } = useFetchSeries(pageNumber);
  const [displayedItems, setDisplayedItems] = useState<ISeriesItem[]>([]);
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
    if (pageNumber && currentPage !== pageNumber) {
      setPage(pageNumber);
    }
  }, [pageNumber]);

  useEffect(() => {
    if (fetchedTotalPages !== null && fetchedTotalPages !== totalPages) {
      setTotalPages(fetchedTotalPages);
    }
  }, [fetchedTotalPages]);

  // TODO: Add anchors for scrolling to every first and last alphabetical card groups

  return (
    <>
      <div className="sticky top-0 h-9 pt-1 bg-gray-800 z-20 shadow-md">
        <NumericalPaginator />
      </div>
      <div className="fixed pt-2 right-5">
        <AlphabeticalPaginator />
      </div>
      <div className="pl-4 pr-10 mt-2 mb-4 grid grid-cols-elastic-cards gap-2">
        {error && <p className="text-red-500">{error}</p>}
        {!error &&
          displayedItems.map((item) => (
            <SeriesCard
              key={item.id}
              {...item}
            />
          ))}
      </div>
      {showBottomPaginator && totalPages > 1 &&
        <div className="bottom-0 h-9 pt-1 bg-gray-800 z-20 drop-shadow-top">
          <NumericalPaginator />
        </div>
      }
    </>
  );
}
