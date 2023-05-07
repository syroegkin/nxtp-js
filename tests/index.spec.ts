import { describe } from 'node:test';
import { Server, Socket } from 'node:net';
import { createServer } from '../src/server';

function createClient(): Promise<Socket> {
  return new Promise((resolve, reject) => {
    const client = new Socket();
    client.connect(12300, 'localhost', () => {
      console.log('Connected');
      resolve(client);
    });
    client.on('error', (err) => {
      reject(err);
    });
  });
}

let server: Server;

describe('nxtp-js', () => {
  let client: Socket;
  beforeEach(async () => {
    server = await createServer(() => {
      console.log('Connected');
    });
    client = await createClient();
  });
  afterAll(() => {
    server.close();
    client.destroy();
  });

  it('should connect', (done) => {
    client.write('Hello', (err) => {
      console.log(err);
      done();
    });
  });
});
