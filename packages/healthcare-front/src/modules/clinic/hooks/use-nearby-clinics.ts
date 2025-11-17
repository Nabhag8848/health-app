import { fetchNearbyClinics } from '@/api/clinic.api';
import { FindNearbyClinicParams } from '@/clinic/@types/clinic';
import { useQuery } from '@tanstack/react-query';

export function useNearbyClinics(params: FindNearbyClinicParams | null) {
  return useQuery({
    queryKey: ['clinic', 'nearby', params],
    queryFn: () => fetchNearbyClinics(params!),
    enabled: !!params && params.lat !== null && params.lng !== null,
  });
}
