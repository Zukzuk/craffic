import * as dirTree from 'directory-tree';

export default class DirTreeService {
  constructor() {
    this.fullTree();
  }

  async fullTree() {
    const tree = await dirTree('../../library', {
      extensions: /\.(cbz|cbr|epub)$/,
      attributes: ['size', 'type', 'extension'],
    });
    console.log(JSON.stringify(tree, null, 2));
  }
}
