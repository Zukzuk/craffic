import path from "path";
import fileCache from "@/lib/cache";
import { INode, IAlphabeticalMapping } from "@/types";

/**
 * Retrieves the alphabetical mapping of data from a JSON file.
 * 
 * @param filePath - Relative path to the JSON file within the /public/mounts/comics/ directory.
 * @param pageSize - The number of items per page.
 * @returns An object containing the alphabetical and numbered mappings.
 */
export function alphabeticalData(filePath: string, pageSize: number): IAlphabeticalMapping {
  const jsonData: INode = fileCache.get(filePath);

  /**
   * Recursively finds directories with files in the directory structure.
   * 
   * @param node - The current node in the directory structure.
   * @returns Array of directory names with files.
   */
  function filterDirsWithFiles(node: INode): string[] {
    if (node.children?.some((child) => child.file)) {
      const dirPath = path.join(node.dir || "").replace(/\\/g, "/");
      const named = dirPath.replace('mounts/comics/', '');
      const sort = named.replace(/^The\s+/g, '');
      return [ sort ];
    }

    // Recursively process children
    if (node.children) {
      return node.children.flatMap(filterDirsWithFiles);
    }

    return [];
  }

  // Flatten and filter directories
  const allItems = filterDirsWithFiles(jsonData);
  allItems.sort((a, b) => a.localeCompare(b));

  // TODO: de-duplicate code from all api hooks

  // Helper functions to improve readability
  const isNumeric = (char: string) => !isNaN(parseInt(char));
  const getCharacterKey = (char: string) => isNumeric(char) ? '#' : char.toUpperCase();

  // Mapping of alphabetical to numbered, taking into account pageSize
  return allItems.reduce((acc, item, index) => {
    const char = getCharacterKey(item[0]);
    const page = Math.ceil((index + 1) / pageSize);

    // Initialize arrays if they don't exist
    if (!acc.alphabet[char]) acc.alphabet[char] = [];
    if (!acc.numbered[page]) acc.numbered[page] = [];

    // Add page to alphabet mapping if not present
    if (!acc.alphabet[char].includes(page)) {
      acc.alphabet[char].push(page);
    }

    // Add character to numbered mapping if not present
    if (!acc.numbered[page].includes(char)) {
      acc.numbered[page].push(char);
    }

    return acc;
  }, { alphabet: {}, numbered: {} } as IAlphabeticalMapping);
}