import * as StreamZip from 'node-stream-zip';
import * as fs from 'fs';
import * as unrar from 'node-unrar-js';
import { IComic } from '../interfaces';

export class Extractor {
  public read(dir: string, files: string[]): void {
    files.forEach((fileName) => {
      const file = dir + '/' + fileName; // this can now run into double /
      const fileParts = fileName.split('.');
      const extension = fileParts[fileParts.length - 1];
      switch (extension) {
        case 'cbz':
          this.extractZip(file);
          break;
        case 'cbr':
          this.extractRar(file);
          break;
        default:
          throw new Error(`Unrecognized file format ${extension}`);
      }
    });
  }

  private async extractZip(file: string): Promise<IComic> {
    let zip;
    try {
      // read the archive
      zip = new StreamZip.async({ file });
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
      await zip.extract(firstEntry.name, location);

      // close the file once done
      await zip.close();

      // return payload
      return {
        type: 'comic',
        file: firstEntry.name,
        fileLocation,
        coverPage,
        numPages,
      };
    } catch (err) {
      // close the file to prevent memory leak
      if (zip) await zip.close();

      // throw error
      throw new Error(err);
    }
  }

  private async extractRar(file: string): Promise<IComic> {
    try {
      // read the archive
      const archive = await fs.promises.readFile(file);
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
        file: firstEntry.name,
        fileLocation,
        coverPage,
        numPages,
      };
    } catch (err) {
      // throw error
      throw new Error(err);
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
        // sort alphabetically case-insensitive
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      });
  }
}
