# @healthcare/shared

A minimal TypeScript utility library providing shared functionality used across all packages in the monorepo. This package ensures consistency and reduces code duplication between frontend and backend.

## 🎯 Purpose

The shared package serves as the foundation for:

- **Utility Functions**: Reusable helper functions
- **Type Definitions**: Common TypeScript types (when needed)

## 🚀 Technology Stack

### Core Technologies

- **TypeScript 5.8.2**: Strict type definitions and utilities
- **Nx Build System**: Optimized library builds
- **Lodash**: Utility functions (re-exported)

### Supported Environments

- **Node.js 20+**: Server-side usage in NestJS applications
- **Modern Browsers**: ES2022+ compatible for frontend applications
- **Build Tools**: Compatible with Vite, Webpack, and other bundlers

## 🏗️ Project Structure

```
packages/healthcare-shared/
├── src/
│   ├── util/                   # Utility functions
│   │   ├── isNonEmpty.ts      # Non-empty value checker
│   │   └── index.ts           # Utility exports
│   └── index.ts               # Main export file
├── project.json               # Nx project configuration
├── tsconfig.lib.json          # TypeScript library config
├── tsconfig.json              # Base TypeScript config
├── package.json               # Package metadata
└── README.md                  # This file
```

## 🎯 Available Targets

### Development

```bash
# Build the library
nx build healthcare-shared

# Type checking
nx typecheck healthcare-shared

# Code linting
nx lint healthcare-shared
```

## 📦 Utility Functions

### isNonEmpty

Checks if a value is non-empty by negating lodash's `isEmpty` function.

```typescript
import { isNonEmpty } from '@healthcare/shared';

// String validation
isNonEmpty('hello'); // true
isNonEmpty(''); // false
isNonEmpty('   '); // false

// Array validation
isNonEmpty([1, 2, 3]); // true
isNonEmpty([]); // false

// Object validation
isNonEmpty({ key: 'value' }); // true
isNonEmpty({}); // false

// Null/undefined
isNonEmpty(null); // false
isNonEmpty(undefined); // false
```

### isNull

Re-exported from lodash for checking null values.

```typescript
import { isNull } from '@healthcare/shared';

isNull(null); // true
isNull(undefined); // false
isNull(0); // false
```

## 🔄 Usage Examples

### In Frontend Applications

```typescript
// React component example
import { isNonEmpty } from '@healthcare/shared';

function UserDisplay({ name }: { name: string | null }) {
  return <div>{isNonEmpty(name) ? name : 'Unknown User'}</div>;
}
```

### In Backend Applications

```typescript
// NestJS service example
import { Injectable } from '@nestjs/common';
import { isNonEmpty } from '@healthcare/shared';

@Injectable()
export class UserService {
  validateName(name: string | null): boolean {
    return isNonEmpty(name);
  }
}
```

## 📦 Build and Distribution

### Building the Library

```bash
# Build for production
nx build healthcare-shared

# Build output structure
packages/healthcare-shared/dist/
├── src/
│   ├── util/
│   │   ├── isNonEmpty.js
│   │   └── index.js
│   └── index.js
└── *.d.ts               # TypeScript declarations
```

### Package.json Configuration

```json
{
  "name": "@healthcare/shared",
  "version": "1.0.0",
  "main": "./src/index.js",
  "types": "./src/index.d.ts",
  "exports": {
    ".": {
      "import": "./src/index.js",
      "require": "./src/index.js",
      "types": "./src/index.d.ts"
    }
  },
  "files": ["src", "*.d.ts"],
  "sideEffects": false
}
```

## 🔧 Development Guidelines

### Adding New Utilities

1. Create function in `src/util/` directory
2. Add comprehensive TypeScript types
3. Export from `src/util/index.ts`
4. Export from main `src/index.ts` file
5. Update documentation

### Type Definition Standards

- Use strict TypeScript configurations
- Prefer interfaces over types for object shapes
- Document complex types with JSDoc comments

## 🤝 Contributing

### Development Workflow

1. Create feature branch from `main`
2. Implement utility with tests (if applicable)
3. Run quality checks:
   ```bash
   nx lint healthcare-shared
   nx typecheck healthcare-shared
   ```
4. Build and verify output:
   ```bash
   nx build healthcare-shared
   ```
5. Submit pull request

### Code Standards

- Use TypeScript strict mode
- Follow functional programming patterns
- Avoid external dependencies when possible
- Write pure functions without side effects
- Use JSDoc for complex functions

## 📚 Resources

- [TypeScript Handbook](https://typescriptlang.org/docs)
- [Nx Library Guide](https://nx.dev/concepts/more-concepts/library-types)
- [Lodash Documentation](https://lodash.com/docs)
