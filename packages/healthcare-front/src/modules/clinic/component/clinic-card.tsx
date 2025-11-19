import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/ui/components/ui/card';
import { cn } from '@/ui/lib/utils';
import { Clinic, Doctor } from '@/clinic/@types/clinic';
import { MapPin } from 'lucide-react';

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
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="space-y-1">
              <p className="text-sm font-medium">{doctor.name}</p>
              <p className="text-sm text-muted-foreground">
                {doctor.yoe} years of experience
              </p>
            </div>
          </div>
          <div className="pt-2 border-t">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span>
                <span className="font-medium">{clinic.distance}</span> km away
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
