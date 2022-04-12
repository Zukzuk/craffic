import * as dirTree from 'directory-tree';

export default class DirTreeService {
  constructor() {
    const tree = dirTree('/Volumes', {
      extensions: /\.(cbz|cbr|epub)$/,
      attributes: ['size', 'type', 'extension'],
    });
    console.log(JSON.stringify(tree));
  }
}
