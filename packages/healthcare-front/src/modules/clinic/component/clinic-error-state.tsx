import { Button } from '@/ui/components/ui/button';

export const ClinicErrorState = ({
  error,
}: {
  error: Error | GeolocationPositionError;
}) => {
  const errorMessage =
    error instanceof Error
      ? error.message
      : error instanceof GeolocationPositionError
      ? error.message
      : 'Unknown error';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <p className="text-lg text-destructive">Error</p>
          <p className="text-muted-foreground">{errorMessage}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    </div>
  );
};
