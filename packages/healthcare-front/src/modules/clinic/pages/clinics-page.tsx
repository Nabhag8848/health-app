import { ClinicDoctorCard } from '@/clinic/component/clinic-card';
import { useNearbyClinics } from '@/clinic/hooks/use-nearby-clinics';
import { useOnInView } from 'react-intersection-observer';
import ShadowCard from '@/shadow/shadow-card';
import { ClinicErrorState } from '@/clinic/component/clinic-error-state';
import { NoClinicsFound } from '@/clinic/component/clinic-not-found';

export function ClinicsPage() {
  const {
    clinics,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useNearbyClinics();

  const ref = useOnInView(
    (inView) => {
      if (inView && !isFetchingNextPage && !isRefetching && hasNextPage) {
        fetchNextPage();
      }
    },
    {
      rootMargin: '200px 0px',
      threshold: 0,
    }
  );

  if (error) {
    return <ClinicErrorState error={error} />;
  }

  if (clinics.length === 0 && !isLoading) {
    return <NoClinicsFound />;
  }

  const clinicDoctorPairs =
    clinics?.flatMap((clinic) =>
      clinic?.doctors.length > 0
        ? clinic?.doctors.map((doctor) => ({ clinic, doctor }))
        : []
    ) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Nearby Clinics</h1>
        <p className="text-muted-foreground">
          Showing clinics within 20 km of your location
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clinicDoctorPairs.map(({ clinic, doctor }, index) => (
          <ClinicDoctorCard
            key={`${clinic.id}-${doctor.id}-${index}`}
            clinic={clinic}
            doctor={doctor}
          />
        ))}
        {isLoading &&
          Array.from({ length: 9 }).map((_, index) => (
            <ShadowCard key={`shadow-initial-${index}`} />
          ))}
        {isFetchingNextPage &&
          Array.from({ length: 3 }).map((_, index) => (
            <ShadowCard key={`shadow-next-${index}`} />
          ))}
      </div>
      {hasNextPage && <div ref={ref} className="h-8" />}
    </div>
  );
}
