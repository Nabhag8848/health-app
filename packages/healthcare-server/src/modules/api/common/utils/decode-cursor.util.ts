export const decodeCursor = (cursor: string) => {
  return JSON.parse(Buffer.from(cursor, 'base64').toString('utf-8'));
};
