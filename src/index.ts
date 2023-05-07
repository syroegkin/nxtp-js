import { createServer } from './server';
import { nxtp } from './nxtp';

async function main() {
  await createServer(nxtp);
}

main();
