const ShadowCard = () => (
  <div className="w-full border rounded-lg bg-card animate-pulse">
    <div className="p-6 space-y-4">
      <div className="h-6 bg-muted rounded w-3/4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded w-1/2"></div>
        <div className="h-4 bg-muted rounded w-2/3"></div>
      </div>
      <div className="pt-2 border-t">
        <div className="h-3 bg-muted rounded w-full"></div>
      </div>
    </div>
  </div>
);

export default ShadowCard;
