import path from "path";
import fileCache from "@/lib/cache";
import { INode, IBookItem, IPaginatedBooks } from "@/types";

/**
 * Fetches books data from the JSON file
 * 
 * @param filePath - Path to the JSON file
 * @param seriesId - Base64 encoded series ID
 * @param page - Current page number
 * @param limit - Number of items per page
 * @returns Paginated books data
 * @throws Error if books are not found for the series
 */
export function booksData(filePath: string, seriesId: string, page: number, limit: number): IPaginatedBooks {
    const jsonData: INode = fileCache.get(filePath);
    const decodedDir = Buffer.from(seriesId, "base64").toString("utf-8");

    /**
     * Recursively finds books in the directory structure
     * 
     * @param node - The current node in the directory structure
     * @returns Array of book items or null if not found
     */
    function findBooks(node: INode): IBookItem[] | null {
        if (node.dir === decodedDir) {
            return node.children!
                .filter((child: INode) => child.file)
                .map((child) => {
                    const dirPath = path.join(node.dir as string, child.file as string).replace(/\\/g, "/"); // Normalize path
                    const id = Buffer.from(child.file as string).toString("base64"); // Base64 encode path
                    const seriesTitle = node.dir!.split("/")[node.dir!.split("/").length - 1] // Everything but last segment is the path
                    const title = path.basename(child.file || "", path.extname(child.file || "")); // File name without extension
                    const sort = title.replace(/^The\s+/g, ''); // Remove leading "The" for sorting
                    const extension = path.extname(child.file || ""); // File extension
                    const uri = `/series/${seriesId}/books/${child.file}`; // URI to the book

                    return {
                        id,
                        path: dirPath,
                        seriesTitle,
                        title,
                        sort,
                        extension,
                        numOfPages: 1, // TODO: Implement page count
                        image: "placeholder-book.png", // TODO: Replace with actual book cover
                        description: `description`,
                        uri,
                    }
                }) || [];
        }

        if (node.children) {
            for (const child of node.children) {
                const books = findBooks(child);
                if (books) return books;
            }
        }

        return null;
    }

    const books = findBooks(jsonData);
    if (!books) {
        throw new Error(`Books not found for series: ${decodedDir}`);
    }

    // TODO: de-duplicate code from all api hooks

    // Pagination logic
    const totalCount = books.length;
    const totalPages = Math.ceil(totalCount / limit);
    const safePage = Math.min(Math.max(page, 1), totalPages || 1);
    const startIndex = (safePage - 1) * limit;
    const endIndex = startIndex + limit;

    return {
        items: books.slice(startIndex, endIndex),
        totalCount,
        currentPage: safePage,
        pageSize: limit,
        totalPages: totalPages || 1,
    };
}
