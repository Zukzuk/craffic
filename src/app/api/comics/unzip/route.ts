// app/api/getImage/route.ts

export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import unzipper from 'unzipper';
import { Readable } from 'stream';

/**
 * Supported image file extensions.
 */
const SUPPORTED_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];

/**
 * Handler for the /api/getImage endpoint.
 * 
 * Query Parameters:
 * - path: string (relative path to the .CBZ file within /public/cbzs/)
 * - page: number (1-based index, default is 1)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cbzPath = searchParams.get('path');
  let page = searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : 1;

  // Validate 'path' parameter
  if (!cbzPath) {
    return NextResponse.json({ error: 'Missing "path" query parameter.' }, { status: 400 });
  }

  // Validate 'page' parameter
  if (isNaN(page) || page < 1) {
    page = 1;
  }

  // Define the allowed base path (e.g., /public/cbzs)
  const allowedBasePath = path.resolve(process.cwd(), 'public', 'cbzs');

  // Resolve the .CBZ path relative to the allowed base path
  const resolvedCbzPath = path.resolve(allowedBasePath, cbzPath);

  // Ensure the resolved path is within the allowed base path to prevent directory traversal
  if (!resolvedCbzPath.startsWith(allowedBasePath)) {
    return NextResponse.json({ error: 'Invalid CBZ file path.' }, { status: 400 });
  }

  // Check if the .CBZ file exists
  if (!fs.existsSync(resolvedCbzPath)) {
    return NextResponse.json({ error: 'CBZ file not found.' }, { status: 404 });
  }

  try {
    // Open the .CBZ (ZIP) file
    const directory = await unzipper.Open.file(resolvedCbzPath);

    // Filter entries to include only image files
    const imageEntries = directory.files.filter(file => {
      const extension = path.extname(file.path).toLowerCase();
      return (
        !file.path.endsWith('/') && // Exclude directories
        SUPPORTED_IMAGE_EXTENSIONS.includes(extension)
      );
    });

    if (imageEntries.length === 0) {
      return NextResponse.json({ error: 'No image files found in the CBZ file.' }, { status: 404 });
    }

    // Sort image entries based on file names using natural sort order
    imageEntries.sort((a, b) => {
      const aName = path.basename(a.path);
      const bName = path.basename(b.path);
      return aName.localeCompare(bName, undefined, { numeric: true, sensitivity: 'base' });
    });

    // Validate page against available pages
    if (page > imageEntries.length) {
      return NextResponse.json({ error: `Page number ${page} exceeds the total number of pages (${imageEntries.length}).` }, { status: 400 });
    }

    // Get the specified page entry (1-based index)
    const selectedPageEntry = imageEntries[page - 1];

    // Determine the content type based on the image extension
    let contentType = 'application/octet-stream'; // default
    const extension = path.extname(selectedPageEntry.path).toLowerCase();
    if (extension === '.jpg' || extension === '.jpeg') {
      contentType = 'image/jpeg';
    } else if (extension === '.png') {
      contentType = 'image/png';
    } else if (extension === '.gif') {
      contentType = 'image/gif';
    } else if (extension === '.webp') {
      contentType = 'image/webp';
    } else if (extension === '.bmp') {
      contentType = 'image/bmp';
    }

    // Set caching headers
    // Cache the image for 1 day
    const cacheMaxAge = 60 * 60 * 24; // in seconds

    // Convert Node.js Readable Stream to Web ReadableStream using the static method and type assertion
    const nodeReadableStream = selectedPageEntry.stream();
    const webReadableStream = Readable.toWeb(nodeReadableStream) as unknown as ReadableStream;

    return new NextResponse(webReadableStream, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': `public, max-age=${cacheMaxAge}`,
        'Content-Length': selectedPageEntry.uncompressedSize.toString(),
      },
    });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while processing the request.' },
      { status: 500 }
    );
  }
}
