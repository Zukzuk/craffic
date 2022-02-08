import * as StreamZip from 'node-stream-zip';
import { IBook } from '../interfaces';

export class Cbz {
    constructor() {}

    public async read(): Promise<IBook> {
        let zip;
        try {
            // read the archive
            zip = new StreamZip.async({ file: '../library/FearAgentFolders.cbz' });
            const entries = await zip.entries();
            const list: Array<StreamZip.ZipEntry> = Object.values(entries);

            // filter and sort contents
            const normalizedList = list
                .filter((item) => {
                    return (
                        // filter out MACOSX jank
                        !item.name.includes("__MACOSX/") && 
                        !item.name.includes("DS_Store") &&
                        (
                            // filter on allowed image types
                            item.name.includes(".jpg") ||
                            item.name.includes(".jpeg") ||
                            item.name.includes(".webp") ||
                            item.name.includes(".png")
                        )
                    )
                })
                .sort(function (a, b) {
                    // sort alphabetically case-insensitive
                    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
                });

            // grab valuable data
            const numPages = normalizedList.length;
            const firstEntry = normalizedList[0];

            // extract cover page
            const coverPage = firstEntry.name.split('/').join("_");
            await zip.extract(firstEntry.name, `../library/${coverPage}`);

            // close the file once done
            await zip.close();

            // return payload
            return { 
                name: firstEntry.name, 
                numPages, 
                coverPage
            };
        } catch (err) {
            // close the file once done
            await zip.close();

            // throw error
            throw new Error(err);
        }
    }
}