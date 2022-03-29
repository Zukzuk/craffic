import * as glob from 'glob';

export class DirTreeService {
  constructor() {
    // async dirTree for offline syncing
    glob('../library/**/*/', (err, res) => {
      if (err) console.log('Error', err);
      else console.log('dirTree finds:', res);
    });
  }
}
