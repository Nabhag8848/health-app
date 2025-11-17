import '@tanstack/react-query';

type QueryKey = ['app', ...ReadonlyArray<unknown>];

declare module '@tanstack/react-query' {
  interface Register {
    queryKey: QueryKey;
    mutationKey: QueryKey;
  }
}
