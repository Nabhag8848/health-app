const encodeCursor = (distance: number, id: string): string => {
  return Buffer.from(JSON.stringify({ distance, id })).toString('base64');
};

export default encodeCursor;
