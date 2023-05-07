import { processRequest } from '../../src/nxtp/processRequest';

describe('processRequest', () => {
  it('should return the timezone code from the buffer', () => {
    const data = Buffer.from([1, 3, 71, 77, 84, 127]);

    const result = processRequest(data);

    expect(result).toBe('GMT');
  });

  it('should throw an error if the protocol version is incorrect', () => {
    const data = Buffer.from([2, 3, 71, 77, 84, 127]);

    expect(() => {
      processRequest(data);
    }).toThrowError('Protocol version mismatch, the version sent is 2');
  });

  it('should throw an error if the timezone code length is too long', () => {
    const data = Buffer.from([1, 61, 71, 77, 84, 127]);

    expect(() => {
      processRequest(data);
    }).toThrowError('Timezone code length is too long, it is 61');
  });

  it('should throw an error if the checksum is incorrect', () => {
    const data = Buffer.from([1, 3, 71, 77, 84, 128]);

    expect(() => {
      processRequest(data);
    }).toThrowError('Checksum mismatch: expected: 128, got: 123');
  });
});