import { cn } from '@/ui/lib/utils';
import { AppRouter } from './app-router';
import { Navbar } from '@/navigation/components/navbar';

export function App() {
  return (
    <div className={cn('min-h-screen bg-background text-foreground')}>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <AppRouter />
      </main>
    </div>
  );
}

export default App;
