const encodeCursor = (distance: number, id: string): string => {
  return Buffer.from(`${distance}|${id}`).toString('base64');
};

export default encodeCursor;
