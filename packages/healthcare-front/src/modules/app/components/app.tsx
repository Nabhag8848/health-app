import { cn } from '@/ui/lib/utils';
import { AppRouter } from './app-router';
import { Navbar } from '@/navigation/components/navbar';
import { getCalApi } from '@calcom/embed-react';
import { use } from 'react';

const initCal = (async () => {
  const cal = await getCalApi();
  await cal('ui', {
    theme: 'dark',
    styles: {
      branding: { brandColor: '#000000' },
    },
  });
  return cal;
})();

export function App() {
  use(initCal);

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
