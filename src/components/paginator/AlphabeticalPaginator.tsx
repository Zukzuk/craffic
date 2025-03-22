"use client";

import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useRouter, useSearchParams } from "next/navigation";
import { usePagination } from "@/contexts/PaginationContext";
import { useAlphabeticalToPageMapping } from "@/hooks/useAlphabeticalToPageMapping";

// TODO: Switch to https://mui.com/material-ui/react-pagination/

export default function AlphabeticalPaginator() {
  const { currentPage } = usePagination();
  const { mapping, isLoading, error } = useAlphabeticalToPageMapping();
  const [current, setCurrent] = useState<{ index: number, letter: string }>({ index: 0, letter: "#" });
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageCount = 27;

  const alphabeticalLabels = Array.from({ length: pageCount }, (_, i) =>
    i === 0 ? "#" : String.fromCharCode(64 + i)
  );

  const handlePageChange = (list: { selected: number }) => {
    const letter = alphabeticalLabels[list.selected];
    const index = alphabeticalLabels.indexOf(letter);
    const newPage = mapping.alphabet[letter][0];
    console.log('character::', current.letter, '->', letter);
    
    setCurrent({ index, letter });
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));

    router.push(`/series?${params.toString()}`);
  };

  const handleLabelBuilder = (pos: number) => {
    return alphabeticalLabels[pos - 1]
  }

  useEffect(() => {
    if (mapping && mapping.numbered[currentPage]) {
      const letters = mapping.numbered[currentPage];
      if (!letters.includes(current.letter)) {
        const letter = letters[0];
        const index = alphabeticalLabels.indexOf(letter);
        console.log('paginator::', current.letter, '->', letter);
        setCurrent({ index, letter });
      }
    }
  }, [currentPage, mapping]);

  if (isLoading || error) {
    return null;
  }

  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={handlePageChange}
      marginPagesDisplayed={0}
      pageRangeDisplayed={pageCount}
      pageLabelBuilder={handleLabelBuilder}
      forcePage={current.index}
      renderOnZeroPageCount={null}
      previousLabel=""
      nextLabel=""
      breakLabel=""
      containerClassName="flex flex-col space-y-1 text-sm"
      pageLinkClassName="block text-center px-1 bg-gray-800 text-gray-200 rounded transition-colors hover:bg-gray-700 !select-none"
      activeLinkClassName="bg-purple-600 text-white hover:bg-purple-400"
      disabledClassName="opacity-50 pointer-events-none"
    />
  );
}
