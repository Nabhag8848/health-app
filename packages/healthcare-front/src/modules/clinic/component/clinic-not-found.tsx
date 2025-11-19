export const NoClinicsFound = () => {
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
};
