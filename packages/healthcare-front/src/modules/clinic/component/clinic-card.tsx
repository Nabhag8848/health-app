import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/ui/components/ui/card';
import { cn } from '@/ui/lib/utils';
import { Clinic, Doctor } from '@/clinic/@types/clinic';

interface ClinicDoctorCardProps {
  clinic: Clinic;
  doctor: Doctor;
  className?: string;
}
export function ClinicDoctorCard({
  clinic,
  doctor,
  className,
}: ClinicDoctorCardProps) {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-xl">{clinic.name}</CardTitle>
        <CardDescription>Clinic Information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">Doctor</h3>
            <div className="space-y-1">
              <p className="text-sm font-medium">{doctor.name}</p>
              <p className="text-sm text-muted-foreground">
                {doctor.yoe} years of experience
              </p>
            </div>
          </div>
          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              Location: {clinic.coordinates.coordinates[1].toFixed(4)},{' '}
              {clinic.coordinates.coordinates[0].toFixed(4)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
