import { BadGatewayException } from '@nestjs/common';

export const decodeCursor = (cursor: string) => {
  const decoded = Buffer.from(cursor, 'base64').toString('utf-8');
  const [distanceRaw, id] = decoded.split('|');
  const distance = parseFloat(distanceRaw);

  if (!distanceRaw || Number.isNaN(distance) || !id) {
    throw new BadGatewayException('Invalid cursor');
  }

  return { distance, id };
};
