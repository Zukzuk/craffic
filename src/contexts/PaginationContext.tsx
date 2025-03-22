"use client";

import React, { createContext, useContext, useState } from "react";

interface PaginationContextProps {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
  setTotalPages: (total: number) => void;
}

const PaginationContext = createContext<PaginationContextProps | undefined>(undefined);

export const PaginationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        totalPages,
        setPage,
        setTotalPages,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export const usePagination = (): PaginationContextProps => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error("usePagination must be used within a PaginationProvider");
  }
  return context;
};
