# @healthcare/front

A modern React frontend application built with React 19, Vite, and TypeScript. This application provides a beautiful, responsive user interface for finding nearby healthcare clinics and doctors with REST API integration and modern development tooling.

## 🚀 Technology Stack

### Core Framework

- **React 19.0.0**: Latest React with concurrent features
- **TypeScript 5.8.2**: Type-safe development
- **Vite 6.0.0**: Fast development server and optimized builds
- **React Router DOM 6.29.0**: Client-side routing

### Data Fetching

- **TanStack React Query 5.90.10**: Powerful data synchronization for React
- **TanStack React Query Devtools**: Development tools for React Query
- **REST API Integration**: Fetch-based API client

### UI & Styling

- **shadcn/ui**: Modern component primitives
- **Tailwind CSS 4.1.17**: Utility-first CSS framework
- **Lucide React**: Icon library
- **React Helmet Async**: Document head management

### Development Tools

- **Vite**: Development server with HMR
- **ESLint**: Code linting with React hooks rules
- **Prettier**: Code formatting
- **TypeScript**: Static type checking

## 🏗️ Project Structure

```
packages/healthcare-front/
├── src/
│   ├── modules/
│   │   ├── api/                 # API client functions
│   │   │   └── clinic.api.ts   # Clinic API endpoints
│   │   ├── app/                 # Application core
│   │   │   ├── components/      # App-level components
│   │   │   │   ├── app-router.tsx
│   │   │   │   ├── app-router-providers.tsx
│   │   │   │   └── app.tsx
│   │   │   ├── context/         # React context providers
│   │   │   │   └── query-client/ # TanStack Query provider
│   │   │   ├── enums/          # Application enums
│   │   │   └── hooks/          # Custom React hooks
│   │   ├── clinic/             # Clinic feature module
│   │   │   ├── @types/         # Type definitions
│   │   │   ├── component/      # Clinic components
│   │   │   ├── hooks/          # Clinic hooks
│   │   │   └── pages/          # Clinic pages
│   │   ├── navigation/         # Navigation components
│   │   ├── shadow/             # Loading skeleton components
│   │   ├── styles/             # Global styles
│   │   └── ui/                 # UI components
│   │       ├── components/     # shadcn/ui components
│   │       ├── layout/         # Layout components
│   │       └── utilities/     # UI utilities
│   ├── assets/                 # Static assets
│   ├── public/                 # Public assets
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global CSS
├── project.json               # Nx project configuration
├── tsconfig.app.json         # TypeScript config
├── tsconfig.json             # Base TypeScript config
├── vite.config.ts            # Vite configuration
└── README.md                 # This file
```

## 🎯 Available Targets

### Development

```bash
# Start development server
nx dev healthcare-front

# Development server with host binding
nx dev healthcare-front --host

# Development server on specific port
nx dev healthcare-front --port 4200
```

### Build & Preview

```bash
# Build for production
nx build healthcare-front

# Build with type checking
nx typecheck healthcare-front && nx build healthcare-front

# Preview production build
nx preview healthcare-front

# Serve static files
nx serve-static healthcare-front
```

### Quality Assurance

```bash
# Type checking
nx typecheck healthcare-front

# Linting
nx lint healthcare-front

# Fix linting issues
nx lint healthcare-front --fix
```

## 🛠️ Development Setup

### Prerequisites

- Node.js 20+ (specified in root `.nvmrc`)
- Yarn 4.4.0+
- Running backend server (healthcare-server)

### Quick Start

```bash
# Install dependencies (from root)
yarn install

# Start the development server
nx dev healthcare-front

# Open browser to http://localhost:4173
```

### Environment Configuration

Create `.env.local` in the package root for local development:

```env
# Backend API endpoint
SERVER_URL=http://localhost:3000

# Enable development features
VITE_NODE_ENV=development
```

## 🎨 Features & Architecture

### Routing & Navigation

- **React Router 6**: Modern routing with data loading
- **Nested Routes**: Hierarchical page structure
- **Dynamic Imports**: Code splitting for optimal performance

### State Management

- **TanStack React Query**: Server state management and caching
- **React Context**: Global application state
- **Local State**: Component-level state with hooks
- **URL State**: Router-managed state synchronization

### UI Components

- **shadcn/ui**: Modern component primitives
- **Responsive Design**: Mobile-first approach
- **Tailwind CSS**: Utility-first styling
- **Accessibility**: WCAG compliant components

### Performance Optimizations

- **Code Splitting**: Route-based lazy loading
- **Bundle Optimization**: Vite's optimized bundling
- **Infinite Scroll**: Efficient data loading with React Query
- **Caching Strategy**: TanStack React Query intelligent caching

## 📊 REST API Integration

### API Client Setup

The application uses fetch-based API clients:

```typescript
// modules/api/clinic.api.ts
const API_BASE_URL = import.meta.env.SERVER_URL || 'http://localhost:3000';

export async function fetchNearbyClinics(
  params: FindNearbyClinicParams
): Promise<ClinicPaginationResponse> {
  const { lat, lng, radius, cursor } = params;
  const url = new URL(`${API_BASE_URL}/v1/clinic/nearby`);
  url.searchParams.set('lat', lat.toString());
  url.searchParams.set('lng', lng.toString());
  url.searchParams.set('radius', radius.toString());
  if (cursor) {
    url.searchParams.set('cursor', cursor);
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`${response.statusText}`);
  }
  return response.json();
}
```

### TanStack React Query Configuration

```typescript
// modules/app/context/query-client/query-client-provider.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function QueryClientProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

### Infinite Query Example

```typescript
// modules/clinic/hooks/use-nearby-clinics.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchNearbyClinics } from '@/api/clinic.api';

export function useNearbyClinics() {
  const { latitude, longitude } = useGeolocation();

  return useInfiniteQuery({
    queryKey: ['clinic', 'nearby', latitude, longitude],
    queryFn: ({ pageParam }) => {
      return fetchNearbyClinics({
        lat: latitude,
        lng: longitude,
        radius: 20,
        cursor: pageParam,
      });
    },
    enabled: !!latitude && !!longitude,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage ?? undefined;
    },
  });
}
```

## 🧩 Component Architecture

### Page Components

```tsx
// modules/clinic/pages/clinics-page.tsx
import { ClinicDoctorCard } from '@/clinic/component/clinic-card';
import { useNearbyClinics } from '@/clinic/hooks/use-nearby-clinics';

export function ClinicsPage() {
  const {
    clinics,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNearbyClinics();

  // Infinite scroll implementation
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && !isFetching && hasNextPage) {
        fetchNextPage();
      }
    },
  });

  return (
    <div>
      {clinics.map((clinic) => (
        <ClinicDoctorCard key={clinic.id} clinic={clinic} />
      ))}
      {hasNextPage && <div ref={ref} />}
    </div>
  );
}
```

### Layout System

```tsx
// modules/app/components/app.tsx
import { AppRouter } from './app-router';
import { Navbar } from '@/navigation/components/navbar';

export function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <AppRouter />
      </main>
    </div>
  );
}
```

### Custom Hooks

```tsx
// modules/app/hooks/use-create-router.tsx
import { createBrowserRouter } from 'react-router-dom';
import { AppPath } from '@/app/enums/app-path';

export const useCreateRouter = () => {
  return createBrowserRouter([
    {
      path: AppPath.HOME,
      element: <ClinicsPage />,
    },
  ]);
};
```

## 🎯 Development Patterns

### Error Handling

```tsx
import { ClinicErrorState } from '@/clinic/component/clinic-error-state';

function ClinicsPage() {
  const { clinics, error } = useNearbyClinics();

  if (error) {
    return <ClinicErrorState error={error} />;
  }

  return <div>{/* Content */}</div>;
}
```

### Loading States

```tsx
import ShadowCard from '@/shadow/shadow-card';

function ClinicsPage() {
  const { clinics, isLoading } = useNearbyClinics();

  if (isLoading) {
    return (
      <div>
        {Array.from({ length: 9 }).map((_, i) => (
          <ShadowCard key={i} />
        ))}
      </div>
    );
  }

  return <div>{/* Content */}</div>;
}
```

### Infinite Scroll

```tsx
import { useInView } from 'react-intersection-observer';

function ClinicsPage() {
  const { fetchNextPage, hasNextPage, isFetching } = useNearbyClinics();

  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && !isFetching && hasNextPage) {
        fetchNextPage();
      }
    },
  });

  return (
    <div>
      {/* Clinic cards */}
      {hasNextPage && <div ref={ref} className="h-8" />}
    </div>
  );
}
```

## 🚀 Deployment

### Build Configuration

```bash
# Production build
nx build healthcare-front

# Build output
packages/healthcare-front/dist/
├── assets/          # Bundled CSS, JS, and other assets
├── index.html      # Entry HTML file
└── ...             # Other static assets
```

### Vercel Deployment

The application is configured for automatic Vercel deployment:

```json
// vercel.json (in root)
{
  "buildCommand": "yarn nx build healthcare-front",
  "outputDirectory": "packages/healthcare-front/dist",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Environment Variables (Production)

```env
# Production environment
SERVER_URL=https://api.yourapp.com
VITE_NODE_ENV=production
```

## 🧪 Testing Strategy

### Unit Testing

```bash
# Run tests
nx test healthcare-front

# Coverage report
nx test healthcare-front --coverage

# Watch mode
nx test healthcare-front --watch
```

### Component Testing

```tsx
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MyComponent } from './MyComponent';

test('renders component correctly', () => {
  const queryClient = new QueryClient();
  
  render(
    <QueryClientProvider client={queryClient}>
      <MyComponent />
    </QueryClientProvider>
  );

  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

## 📈 Performance Monitoring

### Bundle Analysis

```bash
# Analyze bundle size
npm run build -- --analyze

# Lighthouse audit
npx lighthouse http://localhost:4173 --output html
```

### Performance Best Practices

- Route-based code splitting
- Image optimization with WebP
- Lazy loading for non-critical resources
- React Query caching for API responses
- Infinite scroll for efficient pagination

## 🔧 Customization

### Adding New Routes

```tsx
// 1. Define route enum
export enum AppPath {
  HOME = '/',
  ABOUT = '/about',
  NEW_ROUTE = '/new-route'
}

// 2. Create page component
export function NewRoutePage() {
  return <div>New Route</div>;
}

// 3. Add to router configuration
{
  path: AppPath.NEW_ROUTE,
  element: <NewRoutePage />
}
```

### Adding New API Endpoints

```typescript
// modules/api/new-feature.api.ts
const API_BASE_URL = import.meta.env.SERVER_URL || 'http://localhost:3000';

export async function fetchNewFeature(params: Params) {
  const url = new URL(`${API_BASE_URL}/v1/new-feature`);
  // Add query params
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`${response.statusText}`);
  }
  return response.json();
}
```

### Adding shadcn/ui Components

```bash
# Add component to the frontend package
cd packages/healthcare-front
npx shadcn@latest add button
npx shadcn@latest add card
```

## 🤝 Contributing

### Code Standards

- Use TypeScript for all new code
- Follow React functional component patterns
- Implement proper error boundaries
- Write comprehensive tests
- Follow accessibility guidelines

### Pull Request Process

1. Create feature branch from `main`
2. Implement changes with tests
3. Run quality checks: `nx lint healthcare-front && nx typecheck healthcare-front`
4. Build successfully: `nx build healthcare-front`
5. Submit PR with clear description

## 📚 Resources

- [React 19 Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TanStack React Query Documentation](https://tanstack.com/query/latest)
- [React Router Documentation](https://reactrouter.com)
- [TypeScript React Guide](https://react-typescript-cheatsheet.netlify.app)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Nx React Documentation](https://nx.dev/recipes/react)
