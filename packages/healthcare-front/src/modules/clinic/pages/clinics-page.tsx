import { Button } from '@/ui/components/ui/button';
import { ClinicDoctorCard } from '@/clinic/component/clinic-card';
import { useNearbyClinics } from '@/clinic/hooks/use-nearby-clinics';
import { useGeolocation } from '@uidotdev/usehooks';

export function ClinicsPage() {
  const {
    latitude,
    longitude,
    error: geoError,
    loading: geoLoading,
  } = useGeolocation({
    enableHighAccuracy: true,
  });

  const {
    data: clinics,
    isLoading,
    error,
  } = useNearbyClinics(
    latitude && longitude
      ? {
          lat: latitude,
          lng: longitude,
          radius: 20, // 20 km radius
        }
      : null
  );

  const clinicDoctorPairs =
    clinics?.flatMap((clinic) =>
      clinic.doctors.length > 0
        ? clinic.doctors.map((doctor) => ({ clinic, doctor }))
        : []
    ) || [];

  if (geoLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-lg">Getting your location...</p>
          </div>
        </div>
      </div>
    );
  }

  if (geoError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <p className="text-lg text-destructive">Location Error</p>
            <p className="text-muted-foreground">{geoError.message}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-lg">Loading nearby clinics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <p className="text-lg text-destructive">Error loading clinics</p>
            <p className="text-muted-foreground">
              {error instanceof Error ? error.message : 'Unknown error'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (clinicDoctorPairs.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <p className="text-lg">No clinics found nearby</p>
            <p className="text-muted-foreground">
              Try expanding your search radius or check back later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Nearby Clinics</h1>
        <p className="text-muted-foreground">
          Showing clinics within 20 km of your location
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clinicDoctorPairs.map(({ clinic, doctor }) => (
          <ClinicDoctorCard
            key={`${clinic.id}-${doctor.id}`}
            clinic={clinic}
            doctor={doctor}
          />
        ))}
      </div>
    </div>
  );
}
