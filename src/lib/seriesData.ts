import path from "path";
import fileCache from "@/lib/cache";
import { ISeriesItem, INode, IPaginatedSeries } from "@/types";

/**
 * Fetches series data from the file system
 * 
 * @param filePath - Path to the JSON file
 * @param page - Current page number
 * @param limit - Number of items per page
 * @returns Paginated series data
 */
export function seriesData(filePath: string, page: number, limit: number): IPaginatedSeries {
  const jsonData: INode = fileCache.get(filePath);

  // Helper function to filter directories with file children
  // TODO: The api should do this parsing and filtering

  /**
   * Recursively finds directories with files in the directory structure
   * 
   * @param node - The current node in the directory structure
   * @returns Array of series items
   */
  function filterDirsWithFiles(node: INode): ISeriesItem[] {
    if (node.children?.some((child) => child.file)) {
      const dirPath = path.join(node.dir || "").replace(/\\/g, "/"); // Normalize path
      const id = Buffer.from(dirPath).toString("base64"); // Base64 encode path
      const paths = dirPath.split("/"); // Split into segments
      const title = paths[paths.length - 1]; // Last segment is the path
      const named = dirPath.replace('mounts/comics/', ''); // Remove base prefix
      const sort = named.replace(/^The\s+/g, ''); // Remove leading "The" for sorting
      const subSeriesOf = dirPath
        .replace("mounts/comics/", "") // Remove base prefix
        .split("/") // Split into segments
        .slice(0, -1) // Remove the last segment (current directory)
        .map(entry => entry.replace(/\(\d+\)/g, "")) // Remove year patterns like '(YYYY)'
        .reduce<string[]>((acc, entry, i) => {
          const filtered = entry.replace(new RegExp(`^${acc[0]} - `, "i"), "") // Remove preceding entry (case-insensitive)
            .replace(/^\s*-\s*/, "") // Remove leading hyphen and spaces
            .replace(/[\s-]+$/, ""); // Remove trailing spaces or hyphens
          acc.push(filtered);
          return acc;
        }, []);
      const numOfBooks = node.children.length; // Number of books in the series
      const uri = `series/${id}/books`; // URI to the series

      return [
        {
          id,
          path: dirPath,
          title,
          sort,
          subSeriesOf,
          numOfBooks,
          image: `placeholder-series-image.png`, // TODO: Replace with actual series cover
          description: `description`,
          uri,
        },
      ];
    }

    // Recursively process children
    if (node.children) {
      return node.children.flatMap(filterDirsWithFiles);
    }

    return [];
  }

  // Flatten and filter directories
  const allItems = filterDirsWithFiles(jsonData);
  allItems.sort((a, b) => a.sort.localeCompare(b.sort));

  // TODO: de-duplicate code from all api hooks

  // Pagination logic
  const totalCount = allItems.length;
  const totalPages = Math.ceil(totalCount / limit);
  const safePage = Math.min(Math.max(page, 1), totalPages || 1);
  const startIndex = (safePage - 1) * limit;
  const endIndex = startIndex + limit;
  const items = allItems.slice(startIndex, endIndex);

  return {
    items,
    totalCount,
    currentPage: safePage,
    pageSize: limit,
    totalPages: totalPages || 1,
  };
}
