export interface Doctor {
  id: string;
  name: string;
  yoe: number;
}

export interface Clinic {
  id: string;
  name: string;
  coordinates: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  doctors: Doctor[];
}

export interface FindNearbyClinicParams {
  lat: number;
  lng: number;
  radius: number; // in kilometers
  cursor?: string;
}

export interface ClinicPaginationResponse {
  cursor: string | null;
  nextPage: string | null;
  data: Clinic[];
}
