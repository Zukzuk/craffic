import { useState, useEffect } from 'react';

interface UseExtractPageResult {
  imageUrl: string | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom React hook to extract a specific page image from a CBZ file via the API endpoint.
 * 
 * @param cbzPath - Relative path to the CBZ file within the /public/cbzs/ directory (e.g., "comic1.cbz").
 * @param page - The page number to extract (1-based index, default is 1).
 * @returns An object containing the image URL, loading status, and any error message.
 */
export function useExtractPage(cbzPath: string, page: number = 1): UseExtractPageResult {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cbzPath) {
      setError('CBZ path is required.');
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const fetchImage = async () => {
      setLoading(true);
      setError(null);
      setImageUrl(null);

      try {
        const response = await fetch(`/api/comics/unzip?path=${encodeURIComponent(cbzPath)}&page=${page}`, { signal });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to fetch image.');
        }

        // The response is a streamed image; create an object URL
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } catch (err) {
        if (err instanceof Error) {
          if (err.name !== 'AbortError') { // Ignore abort errors
            setError(err.message);
          }
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchImage();

    // Cleanup function to abort fetch and revoke object URL
    return () => {
      controller.abort();
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cbzPath, page]);

  return { imageUrl, loading, error };
}
