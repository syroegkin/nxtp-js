export function processRequest(data: Buffer): string {
  // Read the very first byte
  // This must be the protocol version
  // And it must be exactly '1'
  const protocolVersion = data.readUInt8(0);
  if (protocolVersion !== 1) {
    throw Error(`Protocol version mismatch, the version sent is ${protocolVersion}`);
  }

  // Get the timezone length in bytes
  // and it must be between 0 and 60
  // Just one byute
  const timezoneCodeLength = data.readUInt8(1);
  if (timezoneCodeLength > 60) {
    throw Error(`Timezone code length is too long, it is ${timezoneCodeLength}`);
  }

  // Read the next n bytes as ascii string
  let timezoneCode = 'GMT';
  if (timezoneCodeLength > 0) {
    timezoneCode = data.toString('ascii', 2, 2 + timezoneCodeLength);
  }

  // Read the checksum
  const checksum = data.readUInt8(2 + timezoneCodeLength);
  // Calculate the checksum
  let requestChecksum = 123;

  for (let i = 0; i < data.length - 1; i++) {
    requestChecksum ^= data[i];
  }
  if (checksum !== requestChecksum) {
    throw Error(`Checksum mismatch: expected: ${checksum}, got: ${requestChecksum}`);
  }

  return timezoneCode;
}
