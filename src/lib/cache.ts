import fs from "fs";
import path from "path";
import { INode } from "@/types";

class FileCache {
  private cache: { [filePath: string]: INode } = {};
  private cacheTimestamps: { [filePath: string]: number } = {};
  private cacheDuration: number; // in milliseconds

  constructor(cacheDurationMinutes: number = 5) {
    this.cacheDuration = cacheDurationMinutes * 60 * 1000; // Default: 5 minutes
  }

  /**
   * Retrieves the cached data for a given filePath.
   * If the data is not cached or stale, it reads from the file system.
   * 
   * @param filePath The path to the file to read and cache.
   * @returns The parsed JSON data from the file.
   */
  get(filePath: string): INode {
    const fullPath = path.join(process.cwd(), filePath);
    const now = Date.now();

    // Check if cached and not stale
    if (
      this.cache[fullPath] &&
      this.cacheTimestamps[fullPath] &&
      now - this.cacheTimestamps[fullPath] < this.cacheDuration
    ) {
      return this.cache[fullPath];
    }

    // Read and parse the file
    if (!fs.existsSync(fullPath)) {
      throw new Error("Directory structure file not found.");
    }

    const fileContent = fs.readFileSync(fullPath, "utf-8");
    const jsonData: INode = JSON.parse(fileContent);

    // Update cache
    this.cache[fullPath] = jsonData;
    this.cacheTimestamps[fullPath] = now;

    return jsonData;
  }

  /**
   * Clears the cache for a specific filePath or the entire cache.
   * 
   * @param filePath The path to the file to clear from the cache.
   */
  clear(filePath?: string): void {
    if (filePath) {
      const fullPath = path.join(process.cwd(), filePath);
      delete this.cache[fullPath];
      delete this.cacheTimestamps[fullPath];
    } else {
      this.cache = {};
      this.cacheTimestamps = {};
    }
  }
}

// Export a singleton instance
const fileCache = new FileCache(24*60); // Cache duration: 1 day
export default fileCache;
