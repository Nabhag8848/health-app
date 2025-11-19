# @healthcare/server

A robust NestJS backend application providing REST APIs for a healthcare application. Built with modern Node.js patterns and production-ready features for managing clinics, doctors, users, and reviews.

## 🚀 Technology Stack

### Core Framework

- **NestJS 11.0.0**: Scalable Node.js server framework
- **TypeScript 5.8.2**: Type-safe server development
- **Node.js 20**: Latest LTS runtime environment

### Database & ORM

- **TypeORM 0.3.25**: Advanced ORM with migrations
- **PostgreSQL 15**: Primary relational database
- **PostGIS**: Geospatial extension for location-based queries
- **Database Migrations**: Version-controlled schema changes
- **Custom Schemas**: Multi-tenant database organization

### Caching & Queues

- **Redis**: High-performance caching and session storage
- **BullMQ**: Robust job queue processing (configured, ready for use)
- **IORedis**: Advanced Redis client with clustering support

### Development & Production

- **Hot Reload**: Development server with file watching
- **Environment Configuration**: Type-safe config management
- **Health Monitoring**: Application health endpoints
- **Structured Logging**: Production-ready logging

## 🏗️ Project Structure

```
packages/healthcare-server/
├── src/
│   ├── database/
│   │   ├── datasource/         # Database connection configuration
│   │   ├── entities/           # TypeORM entity definitions
│   │   │   ├── base.entity.ts  # Base entity with common fields
│   │   │   └── core/          # Core business entities
│   │   │       ├── clinic.entity.ts
│   │   │       ├── doctor.entity.ts
│   │   │       ├── user.entity.ts
│   │   │       └── review.entity.ts
│   │   ├── migrations/         # Database migration files
│   │   └── redis/             # Redis configuration and services
│   ├── modules/
│   │   ├── api/               # REST API modules
│   │   │   ├── clinic/        # Clinic endpoints
│   │   │   ├── doctor/        # Doctor endpoints
│   │   │   ├── user/          # User endpoints
│   │   │   ├── review/        # Review endpoints
│   │   │   └── common/        # Shared DTOs and utilities
│   │   ├── health/            # Health check endpoints
│   │   └── queue/             # Background job processing
│   ├── app.module.ts          # Root application module
│   └── main.ts                # Application bootstrap
├── project.json               # Nx project configuration
├── tsconfig.app.json          # TypeScript application config
├── tsconfig.json              # Base TypeScript config
└── README.md                  # This file
```

## 🎯 Available Targets

### Development & Runtime

```bash
# Start development server
nx start healthcare-server

# Build for production
nx build healthcare-server

# Type checking
nx typecheck healthcare-server
```

### Database Operations

```bash
# Deploy pending migrations
nx migration:deploy healthcare-server

# Revert last migration
nx migration:revert healthcare-server

# Generate migration from entity changes
nx migration:generate healthcare-server --name=CreateUserTable

# Create empty migration file
nx migration:create healthcare-server --name=AddIndexesToUserTable

# Show migration status
nx migration:show healthcare-server

# Sync schema (development only)
nx migration:schema:sync healthcare-server
```

### Quality Assurance

```bash
# Type checking
nx typecheck healthcare-server

# Code linting
nx lint healthcare-server

# Fix linting issues
nx lint healthcare-server --fix
```

## 🛠️ Development Setup

### Prerequisites

- Node.js 20+ (specified in root `.nvmrc`)
- Yarn 4.4.0+
- Docker & Docker Compose
- PostgreSQL 15+ with PostGIS extension
- Redis 6+

### Quick Start

```bash
# Install dependencies (from root)
yarn install

# Start infrastructure services
docker-compose up -d

# Run database migrations
nx migration:deploy healthcare-server

# Start development server
nx start healthcare-server

# API available at http://localhost:3000/v1
```

### Environment Configuration

Create `.env` file in the root directory:

```env
# Server Configuration
SERVER_PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:4173

# Database Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_NAME=postgres

# Redis Configuration
REDIS_HOST=127.0.0.1
REDIS_PORT=6378
REDIS_DB=0
REDIS_TLS=false
REDIS_TLS_INSECURE=true
```

## 🗄️ Database Architecture

### Schema Organization

The application uses multiple PostgreSQL schemas for logical separation:

- **`public`**: Default PostgreSQL schema
- **`core`**: Core business entities (Clinic, Doctor, User, Review)

### Entity Structure

#### Clinic Entity

```typescript
@Entity({ schema: 'core', name: 'clinic' })
export class Clinic extends AbstractBaseEntity {
  @Column({ length: 64, nullable: false })
  name: string;

  @Column({
    type: 'geography',
    srid: 4326,
    spatialFeatureType: 'Point',
  })
  coordinates: Point;

  @OneToMany(() => Doctor, (doctor) => doctor.clinic)
  doctors: Doctor[];
}
```

#### Doctor Entity

```typescript
@Entity({ schema: 'core', name: 'doctor' })
export class Doctor extends AbstractBaseEntity {
  @Column({ length: 64, nullable: false })
  name: string;

  @Column()
  @Check(`"yoe" >= 0 AND "yoe" <= 100`)
  yoe: number; // Years of experience

  @ManyToOne(() => Clinic, (clinic) => clinic.doctors)
  clinic: Clinic;

  @OneToMany(() => Review, (review) => review.doctor)
  reviews: Review[];
}
```

#### User Entity

```typescript
@Entity({ schema: 'core', name: 'user' })
export class User extends AbstractBaseEntity {
  @Column({ length: 64, nullable: false })
  name: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
```

#### Review Entity

```typescript
@Entity({ schema: 'core', name: 'review' })
export class Review extends AbstractBaseEntity {
  @Column({ length: 1000, nullable: false })
  message: string;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => Doctor, (doctor) => doctor.reviews)
  doctor: Doctor;
}
```

### Migration Workflow

```bash
# 1. Modify entities
# 2. Generate migration
nx migration:generate healthcare-server --name=DescriptiveName

# 3. Review generated migration
# 4. Deploy to database
nx migration:deploy healthcare-server
```

## 📊 REST API

### API Base Path

All endpoints are prefixed with `/v1`:

- Base URL: `http://localhost:3000/v1`

### Clinic Endpoints

#### Create Clinic

```http
POST /v1/clinic
Content-Type: application/json

{
  "name": "City Medical Center",
  "lat": 40.7128,
  "lng": -74.0060
}
```

#### Find Nearby Clinics

```http
GET /v1/clinic/nearby?lat=40.7128&lng=-74.0060&radius=20&limit=10&cursor=optional_cursor
```

**Query Parameters:**

- `lat` (required): Latitude (-90 to 90)
- `lng` (required): Longitude (-180 to 180)
- `radius` (required): Search radius in kilometers
- `limit` (optional): Number of results (default: 10, max: 100)
- `cursor` (optional): Pagination cursor

**Response:**

```json
{
  "cursor": "current_page_cursor",
  "nextPage": "next_page_cursor_or_null",
  "data": [
    {
      "id": "uuid",
      "name": "Clinic Name",
      "coordinates": { "type": "Point", "coordinates": [lng, lat] },
      "distance": 1234.56,
      "doctors": [
        {
          "id": "uuid",
          "name": "Dr. Smith",
          "yoe": 10
        }
      ],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Create Doctor for Clinic

```http
POST /v1/clinic/:clinicId/doctor
Content-Type: application/json

{
  "name": "Dr. John Smith",
  "yoe": 10
}
```

### Geospatial Queries

The application uses PostGIS for efficient geospatial queries:

- **ST_Distance**: Calculate distance between points
- **ST_DWithin**: Find points within a radius
- **ST_SetSRID**: Set spatial reference system (4326 for WGS84)
- **ST_MakePoint**: Create point geometry

### Cursor-Based Pagination

The API uses cursor-based pagination for efficient data loading:

- Cursors encode the last item's distance and ID
- Prevents duplicate results when new data is added
- More efficient than offset-based pagination for large datasets

## 🔄 Background Jobs & Queues

### Queue Configuration

```typescript
@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: createRedisConfig(configService),
      }),
    }),
  ],
})
export class QueueModule {}
```

### Adding Job Processors

```typescript
@Processor('data-processing')
export class DataProcessor {
  @Process('process-data')
  async handleDataProcessing(job: Job<DataPayload>) {
    // Background job processing logic
    console.log('Processing data:', job.data);
  }
}
```

## 🏥 Health Monitoring

### Health Check Endpoints

```typescript
@Controller('health')
export class HealthController {
  @Get()
  health() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'healthcare-server',
    };
  }
}
```

### Available Endpoints

- `GET /v1/health` - General health status

## 🛡️ Security & Validation

### CORS Configuration

```typescript
// Configured in main.ts
app.enableCors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:4173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
```

### Input Validation

The application uses `class-validator` for DTO validation:

```typescript
export class CreateClinicDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  name: string;

  @IsNumber()
  @Min(-90)
  @Max(90)
  lat: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  lng: number;
}
```

### API Security

- Input validation with class-validator
- Type safety with TypeScript
- Environment-based configuration
- Structured error handling
- Global validation pipe

## 📈 Performance & Optimization

### Database Optimization

- Connection pooling with TypeORM
- PostGIS spatial indexing for geospatial queries
- Cursor-based pagination for efficient data loading
- Schema-based data isolation
- Migration-driven schema evolution

### Caching Strategy

Redis is configured and ready for use:

```typescript
@Injectable()
export class CacheService {
  constructor(private readonly redis: RedisService) {}

  async get<T>(key: string): Promise<T | null> {
    const cached = await this.redis.getClient().get(key);
    return cached ? JSON.parse(cached) : null;
  }

  async set<T>(key: string, value: T, ttl: number = 3600): Promise<void> {
    await this.redis.getClient().setex(key, ttl, JSON.stringify(value));
  }
}
```

### Build Optimization

- SWC for fast TypeScript compilation
- Tree shaking for smaller bundles
- Development vs production configurations

## 🐳 Docker & Deployment

### Development Environment

```yaml
# docker-compose.yml
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: postgres
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - '5432:5432'

  redis:
    image: redis/redis-stack:latest
    ports:
      - '6378:6379'
      - '8001:8001' # Redis Insight UI
```

### Production Deployment

```dockerfile
# Multi-stage build for optimized production image
FROM node:20-alpine

# Install dependencies
WORKDIR /app
COPY package*.json ./
RUN yarn install

# Build application
COPY . .
RUN yarn nx build healthcare-server --configuration=production

# Start application
EXPOSE 3000
CMD ["yarn", "nx", "start", "healthcare-server"]
```

## 🔧 Module Development

### Creating New Modules

```bash
# Generate new module
nx g @nx/nest:module feature-name --project=healthcare-server

# Generate controller
nx g @nx/nest:controller feature-name --project=healthcare-server

# Generate service
nx g @nx/nest:service feature-name --project=healthcare-server
```

### Module Structure

```typescript
@Module({
  imports: [
    // Module dependencies
  ],
  controllers: [
    // REST controllers
  ],
  providers: [
    // Services, etc.
  ],
  exports: [
    // Exported services
  ],
})
export class FeatureModule {}
```

### REST Controller Pattern

```typescript
@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Get()
  async findAll(): Promise<Resource[]> {
    return this.resourceService.findAll();
  }

  @Post()
  async create(@Body() createDto: CreateResourceDto): Promise<Resource> {
    return this.resourceService.create(createDto);
  }
}
```

## 📊 Monitoring & Logging

### Structured Logging

```typescript
import { Logger } from '@nestjs/common';

@Injectable()
export class MyService {
  private readonly logger = new Logger(MyService.name);

  async processData(data: any) {
    this.logger.log('Processing data', { dataId: data.id });

    try {
      // Processing logic
      this.logger.log('Data processed successfully', { dataId: data.id });
    } catch (error) {
      this.logger.error('Data processing failed', error.stack, {
        dataId: data.id,
      });
    }
  }
}
```

## 🤝 Contributing

### Development Workflow

1. Create feature branch from `main`
2. Implement changes with tests
3. Run quality checks:
   ```bash
   nx lint healthcare-server
   nx typecheck healthcare-server
   ```
4. Create database migration if needed
5. Update documentation
6. Submit pull request

### Code Standards

- Use TypeScript for type safety
- Follow NestJS architectural patterns
- Write comprehensive tests
- Use dependency injection
- Implement proper error handling
- Add logging for debugging

### Database Migration Guidelines

- Always create migrations for schema changes
- Use descriptive migration names
- Test migrations in development
- Include rollback logic
- Document complex migrations

## 📚 Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [PostGIS Documentation](https://postgis.net/documentation)
- [BullMQ Documentation](https://docs.bullmq.io)
- [PostgreSQL Documentation](https://postgresql.org/docs)
- [Redis Documentation](https://redis.io/documentation)
