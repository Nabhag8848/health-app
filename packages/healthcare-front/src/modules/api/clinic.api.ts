import {
  FindNearbyClinicParams,
  ClinicPaginationResponse,
} from '@/clinic/@types/clinic';

const API_BASE_URL = import.meta.env.SERVER_URL || 'http://localhost:3000';

export async function fetchNearbyClinics(
  params: FindNearbyClinicParams
): Promise<ClinicPaginationResponse> {
  const { lat, lng, radius, cursor } = params;
  const url = new URL(`${API_BASE_URL}/v1/clinic/nearby`);
  url.searchParams.set('lat', lat.toString());
  url.searchParams.set('lng', lng.toString());
  url.searchParams.set('radius', radius.toString());
  if (cursor) {
    url.searchParams.set('cursor', cursor);
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`${response.statusText}`);
  }
  return response.json();
}
