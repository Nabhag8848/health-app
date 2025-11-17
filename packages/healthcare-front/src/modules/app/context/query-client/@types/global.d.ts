import '@tanstack/react-query';

type QueryKey = ['clinic', 'nearby', ...ReadonlyArray<unknown>];

declare module '@tanstack/react-query' {
  interface Register {
    queryKey: QueryKey;
    mutationKey: QueryKey;
  }
}
