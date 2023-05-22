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
  // @todo: Add the time when it gets connected, remoted IP address and the timezone requested
  // I really keen to have some statistics on the server
  const { remoteAddress } = socket;
  console.log(`${remoteAddress}: new lient connected`);

  socket.on('data', async (data: Buffer) => {
    try {
      // Process request
      const nxtpTimezone = processRequest(data);
      console.log(`${remoteAddress}: Requesting time for ${nxtpTimezone}`);
      // Convert timezone to IANA
      const iana = nxtpToIana(nxtpTimezone);
      console.log(`${remoteAddress}: transformed to ${iana}`);
      // Generate response
      const response = generateResponse(iana);
      // Send response
      await sockerWritePromise(socket, response);
      // Close socket
      socket.destroy();
      console.log(`${remoteAddress}: close connection`);
    } catch (e: unknown) {
      console.log(`${remoteAddress}: ${(e as Error).message}`);
      socket.destroy();
    }
  });
}
