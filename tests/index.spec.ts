import { describe } from 'node:test';
import { Socket } from 'node:net';
import { server } from '../src/index';

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

describe.skip('nxtp-js', () => {
  let client: Socket;
  beforeEach(async () => {
    client = await createClient();
  });
  afterAll(() => {
    server.close();
  });

  it('should connect', (done) => {
    client.write('Hello', (err) => {
      console.log(err);
      done();
    });
  });
});
