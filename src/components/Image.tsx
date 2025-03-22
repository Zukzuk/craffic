import React from 'react';
import { useExtractPage } from '@/hooks/useUnzipper';

interface ComicImageProps {
  cbzPath: string;       // Relative path within /public/cbzs/ (e.g., "comic1.cbz")
  pageNumber?: number;   // 1-based index (default is 1)
  altText?: string;      // Alternative text for the image
}

const ComicImage: React.FC<ComicImageProps> = ({ cbzPath, pageNumber = 1, altText = `Page ${pageNumber}` }) => {
  const { imageUrl, loading, error } = useExtractPage(cbzPath, pageNumber);

  if (loading) {
    return <p>Loading page {pageNumber}...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!imageUrl) {
    return <p>No image available.</p>;
  }

  return (
    <div>
      <img
        src={imageUrl}
        alt={altText}
        style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ccc' }}
      />
    </div>
  );
};

export default ComicImage;
