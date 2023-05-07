import net from 'node:net';
import { processRequest } from './nxtp/processRequest.js';
import { nxtpToIana } from './utils/nxtpToIana.js';
import { generateResponse } from './nxtp/generateResponse.js';

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
  console.log(`Client connected from ${socket.remoteAddress}`);

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
    } catch (e: unknown) {
      console.log(e);
      socket.destroy();
    }
  });
}
