"use client";

import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { usePagination } from "@/contexts/PaginationContext";
import PaginatorDropdown from "./PaginatorDropdown";

// TODO: switch to https://mui.com/material-ui/react-pagination/

export default function NumericalPaginator({ isBottom = false }: { isBottom?: boolean }) {
  const { currentPage, totalPages } = usePagination();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (list: { selected: number }) => {
    const newPage = list.selected + 1;
    console.log('page::', currentPage, '->', newPage);
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));

    if (pathname.includes("/books")) {
      const seriesId = pathname.split("/")[2];
      router.push(`/series/${seriesId}/books?${params.toString()}`);
    } else {
      router.push(`/series?${params.toString()}`);
    }
  };

  useEffect(() => {
    const newIndex = currentPage - 1;
    console.log('paginator::', currentIndex, '->', newIndex);
    setCurrentIndex(currentPage - 1);
  }, [currentPage]);

  if (totalPages < 2) {
    return null;
  }

  return (
    <ReactPaginate
      pageCount={totalPages}
      onPageChange={handlePageChange}
      marginPagesDisplayed={2}
      pageRangeDisplayed={7}
      previousLabel="Prev"
      nextLabel="Next"
      breakLabel={<PaginatorDropdown isBottom={isBottom} handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />}
      renderOnZeroPageCount={null}
      forcePage={currentIndex}
      containerClassName="flex justify-self-center justify-between items-center gap-2 text-sm w-[678px]"
      pageLinkClassName="block min-w-[39px] text-center py-1 px-2 bg-gray-800 text-gray-200 rounded transition-colors hover:bg-gray-700 !select-none"
      activeLinkClassName="bg-purple-600 text-white hover:bg-purple-400"
      breakLinkClassName="block text-center py-1 bg-gray-800 text-gray-400 rounded !select-none relative"
      previousClassName="mr-auto"
      previousLinkClassName="block py-1 px-2 bg-gray-800 text-gray-200 rounded transition-colors hover:bg-gray-700 !select-none"
      nextClassName="ml-auto"
      nextLinkClassName="block py-1 px-2 bg-gray-800 text-gray-200 rounded transition-colors hover:bg-gray-700 !select-none"
      disabledClassName="opacity-50 pointer-events-none"
    />
  );
}
