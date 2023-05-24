import net from 'node:net';
import { processRequest } from './nxtp/processRequest';
import { nxtpToIana } from './utils/nxtpToIana';
import { generateResponse } from './nxtp/generateResponse';

function sockerWritePromise(
  socket: net.Socket,
  data: string | Uint8Array,
): Promise<void> {
  return new Promise((resolve, reject) => {
    socket.write(data, (err?: Error) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function nxtp(socket: net.Socket) {
  const { remoteAddress } = socket;

  socket.on('data', async (data: Buffer) => {
    try {
      // Process request
      const nxtpTimezone = processRequest(data);
      // Convert timezone to IANA
      const iana = nxtpToIana(nxtpTimezone);
      // Generate response
      const response = generateResponse(iana);
      // Send response
      await sockerWritePromise(socket, response);
      // Close socket
      socket.destroy();
      console.log(`${remoteAddress}: Requested time for ${nxtpTimezone}, resolved to ${iana[0]}`);
    } catch (e: unknown) {
      console.log(`${remoteAddress}: ${(e as Error).message}`);
      socket.destroy();
    }
  });
}
