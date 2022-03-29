import * as chokidar from 'chokidar';

export class ChokidarService {
  constructor() {
    // chokidar watcher for realtime syncing
    const watcher = chokidar.watch('../library', {
      ignored: /[\/\\]\./,
    });
    watcher.on('all', (event, path) => {
      console.log('chokidar finds:', event, path);
    });
  }
}
