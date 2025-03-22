"use client";

import React, { useState, useEffect, useRef } from "react";

export default function PaginatorDropdown(
    { handlePageChange, currentPage, totalPages, isBottom = false }:
    { handlePageChange: (selected: { selected: number }) => void, currentPage: number, totalPages: number, isBottom?: boolean }
) {
    const dropdownRef = useRef<HTMLSpanElement>(null);
    const [showDropdown, setShowDropdown] = useState<"LEFT" | "RIGHT" | null>(null);

    const handleDropdownSelect = (page: number) => {
        setShowDropdown(null);
        handlePageChange({ selected: page - 1 });
    };

    const handleBreakLabelClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        const target = e.target as HTMLElement;
        const parentLink = target.closest("a");
        if (parentLink) {
            const ariaLabel = parentLink.getAttribute("aria-label");
            if (ariaLabel === "Jump backward") {
                setShowDropdown((prev) => (prev === "LEFT" ? null : "LEFT"));
            } else if (ariaLabel === "Jump forward") {
                setShowDropdown((prev) => (prev === "RIGHT" ? null : "RIGHT"));
            }
        }
    };

    const getLeftList = () => {
        const breakMap: Record<number, number[]> = {
            [totalPages - 2]: [totalPages - 9, 3],
            [totalPages - 1]: [totalPages - 9, 3],
            [totalPages]: [totalPages - 9, 3],
        };
        const breakPos = breakMap[currentPage] || [totalPages - (totalPages - currentPage) - 6, 3];
        return Array.from({ length: breakPos[0] }, (_, i) => i + breakPos[1]).map((page) => (
            <li
                key={page}
                className="cursor-pointer min-w-[39px] text-center px-2 py-1 hover:bg-gray-700 rounded"
                onClick={() => handleDropdownSelect(page)}
            >
                {page}
            </li>
        ));
    }

    const getRightList = () => {
        const breakMap: Record<number, number[]> = {
            1: [totalPages - 9, 8],
            2: [totalPages - 10, 9],
            3: [totalPages - 10, 9],
            4: [totalPages - 10, 9],
        };
        const breakPos = breakMap[currentPage] || [totalPages - (currentPage + 5), currentPage + 4];
        return Array.from({ length: breakPos[0] }, (_, i) => i + breakPos[1]).map((page) => (
            <li
                key={page}
                className="cursor-pointer min-w-[39px] text-center px-2 py-1 hover:bg-gray-700 rounded"
                onClick={() => handleDropdownSelect(page)}
            >
                {page}
            </li>
        ))
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <span
            ref={dropdownRef}
            className="block text-center bg-gray-800 text-gray-400 rounded cursor-pointer !select-none"
            onClick={(e) => handleBreakLabelClick(e)}
        >
            ...
            {showDropdown === "LEFT" && (
                <ul className="thin-scroll thin-scroll-inline absolute left-[-24px] max-h-[200px] overflow-y-scroll pr-1 pl-2 pt-2 pb-2 bg-gray-800 text-gray-200 rounded shadow-lg z-10">
                    { getLeftList() }
                </ul>
            )}
            {showDropdown === "RIGHT" && (
                <ul className="thin-scroll thin-scroll-inline absolute left-[-24px] max-h-[200px] overflow-y-scroll pr-1 pl-2 pt-2 pb-2 bg-gray-800 text-gray-200 rounded shadow-lg z-10">
                    { getRightList()}
                </ul>
            )}
        </span>
    );
}
