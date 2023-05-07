import net, { ServerOpts } from 'node:net';

const port = process.env.PORT || 12300;

export function createServer(
  connectionListener: (socket: net.Socket) => void,
  options: ServerOpts = {},
): Promise<net.Server> {
  return new Promise((resolve, reject) => {
    const server = net.createServer(options, connectionListener);

    server.on('error', reject);
    server.listen(port, () => {
      console.log(`server listening on port ${port}`);
      resolve(server);
    });
  });
}
