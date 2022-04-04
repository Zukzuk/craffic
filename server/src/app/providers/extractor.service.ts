import * as StreamZip from 'node-stream-zip';
import * as fs from 'fs';
import * as unrar from 'node-unrar-js';
import { ComicFileData, ComicFileExtractError } from './extractor.interface';

export class ExtractorService {
  public async sync(dir: string, files: string[]): Promise<string> {
    const promises: Promise<ComicFileData | ComicFileExtractError>[] = [];

    files.forEach((fileName) => {
      const bundle = dir + '/' + fileName; // this can now run into double /
      const fileParts = fileName.split('.');
      const extension = fileParts[fileParts.length - 1];
      const stats = fs.statSync(bundle);
      const fileSizeInBytes: number = stats.size;
      const extractor = {
        cbz: this.extractZip,
        cbr: this.extractRar,
        unrecognized: this.fileFormatError,
      };
      const result = extractor[extension]
        ? extractor[extension](bundle, fileSizeInBytes)
        : extractor.unrecognized(bundle, extension);
      promises.push(result);
    });

    const extractedList = await Promise.all(promises);
    return `Extracted all files: ${JSON.stringify(extractedList)}`;
  }

  private async fileFormatError(
    bundle: string,
    extension: string,
  ): Promise<ComicFileExtractError> {
    return {
      bundle,
      error: new Error(`Unrecognized file format ${extension}`),
    };
  }

  private async extractZip(
    bundle: string,
    fileSizeInBytes: number,
  ): Promise<ComicFileData | ComicFileExtractError> {
    let zip;
    try {
      // read the archive
      zip = new StreamZip.async({ file: bundle });
      const entries = await zip.entries();
      const list: Array<StreamZip.ZipEntry> = Object.values(entries);

      // filter and sort contents
      const normalizedList = this.normalizeList(list);

      // grab valuable data
      const numPages = normalizedList.length;
      const firstEntry = normalizedList[0];

      // extract cover page
      const coverPage = firstEntry.name.split('/').join('_');
      const fileLocation = `../library/${coverPage}`;
      await zip.extract(firstEntry.name, fileLocation);

      // close the file once done
      await zip.close();

      // return payload
      return {
        type: 'comic',
        bundle,
        file: firstEntry.name,
        format: 'cbz',
        fileSizeInBytes,
        fileLocation,
        coverPage,
        numPages,
      };
    } catch (err) {
      // close the file to prevent memory leak
      if (zip) await zip.close();

      // return error
      return {
        bundle,
        error: err,
      };
    }
  }

  private async extractRar(
    bundle: string,
    fileSizeInBytes: number,
  ): Promise<ComicFileData | ComicFileExtractError> {
    try {
      // read the archive
      const archive = await fs.promises.readFile(bundle);
      const data = Uint8Array.from(archive).buffer;
      const extractor = await unrar.createExtractorFromData({ data });
      const fileList = extractor.getFileList();
      const list = [...fileList.fileHeaders]; // load the file headers

      // filter and sort contents
      const normalizedList = this.normalizeList(list);

      // grab valuable data
      const numPages = normalizedList.length;
      const firstEntry = normalizedList[0];

      // extract cover page
      const coverPage = firstEntry.name.split('/').join('_');
      const extracted = extractor.extract({ files: [firstEntry.name] });
      const files = [...extracted.files]; //load the files
      const fileLocation = `../library/${coverPage}`;
      await fs.promises.writeFile(
        fileLocation,
        files[0].extraction, // Uint8Array content, createExtractorFromData only
      );

      // return payload
      return {
        type: 'comic',
        bundle,
        file: firstEntry.name,
        format: 'cbr',
        fileSizeInBytes,
        fileLocation,
        coverPage,
        numPages,
      };
    } catch (err) {
      // return error
      return {
        bundle,
        error: err,
      };
    }
  }

  private normalizeList<T extends { name: string }>(list: T[]): T[] {
    return list
      .filter((item) => {
        return (
          // filter out MACOSX jank
          !item.name.includes('__MACOSX/') &&
          !item.name.includes('DS_Store') &&
          // filter on allowed image types
          (item.name.includes('.jpg') ||
            item.name.includes('.jpeg') ||
            item.name.includes('.webp') ||
            item.name.includes('.png'))
        );
      })
      .sort(function (a, b) {
        // sort alphabetically and case-insensitively
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      });
  }
}
