import { fetchNearbyClinics } from '@/api/clinic.api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useGeolocation } from '@uidotdev/usehooks';

const DISTANCE_RADIUS_KM = 20; // 20 km radius

export function useNearbyClinics() {
  const {
    latitude,
    longitude,
    error: geoError,
    loading: geoLoading,
  } = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: 0,
  });

  const query = useInfiniteQuery({
    queryKey: ['clinic', 'nearby', latitude, longitude],
    queryFn: ({ pageParam }) => {
      if (latitude === null || longitude === null) {
        throw new Error('Location not available');
      }

      return fetchNearbyClinics({
        lat: latitude,
        lng: longitude,
        radius: DISTANCE_RADIUS_KM,
        cursor: pageParam,
      });
    },
    enabled: !!latitude && !!longitude && !geoLoading && !geoError,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage ?? undefined;
    },
  });

  const clinics = query.data?.pages.flatMap((page) => page.data) ?? [];

  return {
    clinics,
    isLoading: geoLoading || query.isLoading,
    error: geoError || query.error,
    isError: !!geoError || query.isError,
    isSuccess: query.isSuccess,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isFetching: query.isFetching,
  };
}
