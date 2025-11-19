# Health App

A production-ready Nx monorepo for building a healthcare application with React, NestJS, REST APIs, TypeORM, and modern development tools. This application helps users find nearby clinics and doctors.

## 🏗️ Architecture Overview

This monorepo follows a modular architecture with clear separation of concerns:

```
healthapp/
├── packages/
│   ├── healthcare-front/      # React frontend application
│   ├── healthcare-server/     # NestJS backend REST API
│   └── healthcare-shared/     # Shared utilities and types
├── docker-compose.yml          # Development infrastructure
├── Dockerfile                  # Production container
├── vercel.json                 # Frontend deployment config
└── nx.json                     # Nx workspace configuration
```

## 📦 Package Structure

### 🎨 Frontend Application (`healthcare-front`)

- **Type**: Application (`type:app`, `scope:front`)
- **Framework**: React 19 with Vite
- **Features**:
  - REST API integration with TanStack React Query
  - Modern React Router setup
  - Responsive design with Tailwind CSS
  - Component-driven architecture
  - Infinite scroll for clinic listings
  - Geolocation-based clinic search

### 🔧 Backend Application (`healthcare-server`)

- **Type**: Application (`type:app`, `scope:server`)
- **Framework**: NestJS with REST APIs
- **Features**:
  - Modular architecture with feature modules
  - Database integration with TypeORM and PostgreSQL
  - PostGIS for geospatial queries
  - Redis-backed job queues (configured, ready for use)
  - Health monitoring endpoints
  - Database migrations system
  - Cursor-based pagination
  - Core entities: Clinic, Doctor, User, Review

### 📚 Shared Library (`healthcare-shared`)

- **Type**: Library (`type:lib`, `scope:shared`)
- **Purpose**: Cross-package utilities and types
- **Features**:
  - Utility functions (`isNonEmpty`, `isNull`)
  - Shared type definitions

## 🎯 Available Targets

### Core Targets (All Packages)

```bash
# Type checking
nx typecheck <package>

# Code linting
nx lint <package>

# Build for production
nx build <package>
```

### Frontend-Specific Targets (`healthcare-front`)

```bash
# Development server
nx dev healthcare-front

# Build for production
nx build healthcare-front

# Preview production build
nx preview healthcare-front

# Serve static files
nx serve-static healthcare-front
```

### Backend-Specific Targets (`healthcare-server`)

```bash
# Start development server
nx start healthcare-server

# Build for production
nx build healthcare-server

# Database migrations
nx migration:deploy healthcare-server
nx migration:revert healthcare-server
nx migration:generate healthcare-server --name=CreateUsers
nx migration:create healthcare-server --name=AddIndexes
nx migration:show healthcare-server
nx migration:schema:sync healthcare-server
```

### Multi-Package Operations

```bash
# Build all packages
nx run-many -t build

# Type check all packages
nx run-many -t typecheck

# Lint all packages
nx run-many -t lint

# Run affected tasks only
nx affected -t build,test,lint
```

## 🛠️ Development Setup

### Prerequisites

- Node.js 20+ (specified in `.nvmrc`)
- Yarn 4.4.0+
- Docker & Docker Compose

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd monorepo-template

# Install dependencies
yarn install

# Start development infrastructure
docker-compose up -d

# Start backend development server
nx start healthcare-server

# Start frontend development server (in another terminal)
nx dev healthcare-front
```

### Environment Configuration

Create `.env` file in the root directory:

```env
# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_NAME=postgres

# Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6378
REDIS_DB=0

# Server
SERVER_PORT=3000
SERVER_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:4173

# Environment
NODE_ENV=development
```

## 🔧 Architecture Patterns

### Module Boundaries

The workspace enforces strict module boundaries:

- **Frontend** (`scope:front`): Can depend on `shared`
- **Backend** (`scope:server`): Can depend on `shared` only
- **Shared** (`scope:shared`): No external dependencies

### Database Schema Organization

- **`core`**: Application core entities (Clinic, Doctor, User, Review)
- **`public`**: Default PostgreSQL schema

### REST API Architecture

- RESTful endpoints with NestJS controllers
- Type-safe DTOs with class-validator
- Cursor-based pagination for efficient data loading
- PostGIS for geospatial queries (finding nearby clinics)
- Serialization interceptors for consistent responses

## 🐳 Docker & Deployment

### Development Environment

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Production Deployment

```bash
# Build production image
docker build -t monorepo-template .

# Run production container
docker run -p 3000:3000 monorepo-template
```

### Frontend Deployment (Vercel)

The frontend is configured for automatic deployment to Vercel:

- Build command: `yarn nx build healthcare-front`
- Output directory: `packages/healthcare-front/dist`
- Framework: Vite
- Supports SPA routing with rewrites

## 🧪 Testing

```bash
# Run all tests
nx run-many -t test

# Run tests for specific package
nx test healthcare-server
nx test healthcare-front

# Run tests in watch mode
nx test healthcare-server --watch

# Run tests with coverage
nx run-many -t test --coverage
```

## 📈 Performance & Optimization

### Build Optimization

- **SWC**: Fast TypeScript compilation
- **Vite**: Optimized frontend builds
- **Nx Caching**: Intelligent build caching
- **Tree Shaking**: Unused code elimination

### Development Experience

- **Hot Module Replacement**: Fast development iterations
- **TypeScript**: Type safety across the stack
- **ESLint**: Code quality enforcement
- **Prettier**: Consistent code formatting

## 🔄 Code Generation

### Adding New Components

```bash
# Generate React component
nx g @nx/react:component MyComponent --project=healthcare-front

# Generate NestJS module
nx g @nx/nest:module my-feature --project=healthcare-server

```

### Database Migrations

```bash
# Generate migration from entity changes
nx migration:generate healthcare-server --name=AddUserTable

# Create empty migration
nx migration:create healthcare-server --name=CustomMigration

# Run migrations
nx migration:deploy healthcare-server
```

## 📝 Customization Guide

### Adding New Packages

1. Create package directory: `packages/your-package/`
2. Add `project.json` with appropriate configuration
3. Update `tsconfig.json` references
4. Configure module boundaries in `eslint.config.mjs`

### Technology Replacements

- **Database**: Replace TypeORM configuration in `packages/healthcare-server/src/database/`
- **Styling**: Modify Tailwind configuration in `tailwind.preset.js`
- **UI Components**: Add shadcn/ui components directly in `packages/healthcare-front/src/modules/ui/`
- **Build Tool**: Update Vite configuration for frontend changes

## 🚀 Production Considerations

### Security

- Environment variable validation
- CORS configuration
- Authentication middleware ready
- Database connection security

### Scalability

- Horizontal scaling with Redis
- Database connection pooling
- CDN-ready static assets
- Microservice architecture support

### Monitoring

- Health check endpoints
- Structured logging
- Error tracking ready
- Performance monitoring hooks

## 📚 Additional Resources

- [Nx Documentation](https://nx.dev)
- [NestJS Documentation](https://docs.nestjs.com)
- [React Documentation](https://react.dev)
- [TypeORM Documentation](https://typeorm.io)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
