# TypeScript Migration Plan

## Migration Status

**Last Updated:** 2025-01-19

### Completed Phases

- ✅ Phase 1: Setup and Configuration (COMPLETE)
  - TypeScript and related dependencies installed
  - `tsconfig.json` and `tsconfig.node.json` created
  - `vite.config.ts` migrated from JavaScript
  - `eslint.config.mjs` updated with TypeScript support
  - `package.json` scripts updated with `type-check` command
  - lint-staged configuration updated to handle TypeScript files

### In Progress

- 🔄 Phase 2: Type Definitions (NEXT)

### Pending

- ⏳ Phase 3-9: Implementation phases

---

## Executive Summary

This document outlines a comprehensive plan to migrate the Carbon React Router Starter project from JavaScript to TypeScript. The migration will be performed incrementally to minimize disruption and ensure type safety throughout the codebase.

## Current Project Analysis

### Project Structure

- **Framework**: React 19 with Vite 7
- **Routing**: React Router 7
- **UI Library**: Carbon Design System (@carbon/react v1.73.0)
- **Build Tool**: Vite with SWC plugin
- **Testing**: Vitest with React Testing Library
- **Server**: Express with SSR support
- **Styling**: SCSS with Carbon tokens

### Key Files Identified

- Entry points: `src/entry-client.jsx`, `src/entry-server.jsx`
- Routing: `src/routes/index.jsx`, `src/routes/config.js`
- Context: `src/context/ThemeContext.jsx`
- Components: ~10 components in `src/components/`
- Utilities: `src/utils/local-storage.js`
- Tests: `src/__tests__/` (5 test files)

### Current Dependencies

- React type definitions already installed: `@types/react`, `@types/react-dom`
- PropTypes currently used for runtime type checking
- ESLint configured for JavaScript files only

## Migration Strategy

### Phase 1: Setup and Configuration (Foundation)

#### 1.1 Install TypeScript Dependencies

```bash
npm install --save-dev typescript @types/node @types/express @types/compression
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

#### 1.2 Create TypeScript Configuration Files

**tsconfig.json** (Root configuration)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": false,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "types": ["vite/client", "vitest/globals", "@testing-library/jest-dom"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**tsconfig.node.json** (Node/build configuration)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "skipLibCheck": true,
    "types": ["node"]
  },
  "include": ["vite.config.ts", "src/server.ts"]
}
```

#### 1.3 Update Build Configuration

**vite.config.ts** (Rename from .js)

- Add TypeScript support
- Update plugin configuration
- Add path aliases

**eslint.config.js** → **eslint.config.mjs**

- Add TypeScript parser and plugin
- Update file patterns to include `.ts` and `.tsx`
- Configure TypeScript-specific rules

#### 1.4 Update Package.json

- Update scripts to handle TypeScript files
- Update lint-staged configuration
- Add type-check script

### Phase 2: Type Definitions (Type Safety Foundation)

#### 2.1 Create Global Type Definitions

**src/types/global.d.ts**

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // Add other env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

#### 2.2 Create Domain Type Definitions

**src/types/routes.ts**

```typescript
import { ComponentType } from 'react';

export interface RouteConfig {
  path: string;
  element?: ComponentType;
  label?: string;
  icon?: ComponentType;
  showInNav?: boolean;
  showInHeader?: boolean;
}

export type RouteConfigArray = RouteConfig[];
```

**src/types/theme.ts**

```typescript
export type ThemeSetting = 'system' | 'light' | 'dark';
export type CarbonTheme = 'g10' | 'g100';

export interface ThemeContextValue {
  themeSetting: ThemeSetting;
  setThemeSetting: (value: ThemeSetting) => void;
  themeMenuCompliment: boolean;
  setThemeMenuCompliment: (value: boolean) => void;
  theme: CarbonTheme;
  themeMenu: CarbonTheme;
  ready: boolean;
}

export interface LocalStorageValues {
  themeSetting: ThemeSetting;
  headerInverse: boolean;
}
```

**src/types/server.ts**

```typescript
import { RenderToPipeableStreamOptions } from 'react-dom/server';

export interface RenderResult {
  pipe: (res: NodeJS.WritableStream) => void;
  head: string;
  abort: () => void;
  statusCode: number;
}

export type RenderFunction = (
  url: string,
  options?: RenderToPipeableStreamOptions,
) => RenderResult;
```

### Phase 3: Core Files Migration (Critical Path)

#### 3.1 Utilities (No Dependencies)

**Priority: HIGH** - Foundation for other files

1. `src/utils/local-storage.js` → `src/utils/local-storage.ts`
   - Add type definitions for storage keys and values
   - Type the return values and parameters

#### 3.2 Context Providers

**Priority: HIGH** - Used throughout the app

1. `src/context/ThemeContext.jsx` → `src/context/ThemeContext.tsx`
   - Replace PropTypes with TypeScript interfaces
   - Type all hooks and state
   - Export typed context value

#### 3.3 Route Configuration

**Priority: HIGH** - Core routing logic

1. `src/routes/utils.js` → `src/routes/utils.ts`
   - Type route utility functions
2. `src/routes/config.js` → `src/routes/config.ts`
   - Type route configuration array
   - Ensure all routes have proper types

3. `src/routes/index.jsx` → `src/routes/index.tsx`
   - Type Router component
   - Type route mapping logic

#### 3.4 Entry Points

**Priority: HIGH** - Application bootstrap

1. `src/entry-client.jsx` → `src/entry-client.tsx`
   - Type hydration logic

2. `src/entry-server.jsx` → `src/entry-server.tsx`
   - Type SSR render function
   - Add proper return types

3. `src/server.js` → `src/server.ts`
   - Type Express server configuration
   - Type middleware functions

### Phase 4: Layouts Migration

**Priority: MEDIUM** - Shared layout components

1. `src/layouts/theme-layout.jsx` → `src/layouts/theme-layout.tsx`
2. `src/layouts/page-layout.jsx` → `src/layouts/page-layout.tsx`

### Phase 5: Components Migration (Incremental)

**Priority: MEDIUM** - Can be done incrementally

#### 5.1 Navigation Components

1. `src/components/nav/Nav.jsx` → `src/components/nav/Nav.tsx`
2. `src/components/nav/NavHeaderItems.jsx` → `src/components/nav/NavHeaderItems.tsx`
3. `src/components/nav/NavSideItems.jsx` → `src/components/nav/NavSideItems.tsx`

#### 5.2 Header Components

1. `src/components/commonHeader/CommonHeader.jsx` → `src/components/commonHeader/CommonHeader.tsx`

#### 5.3 Other Components

1. `src/components/footer/Footer.jsx` → `src/components/footer/Footer.tsx`
2. `src/components/profilePanel/ProfilePanel.jsx` → `src/components/profilePanel/ProfilePanel.tsx`
3. Remaining components in order of complexity

### Phase 6: Pages Migration

**Priority: MEDIUM** - Page components

1. `src/pages/welcome/Welcome.jsx` → `src/pages/welcome/Welcome.tsx`
2. `src/pages/welcome/WelcomeHeader.jsx` → `src/pages/welcome/WelcomeHeader.tsx`
3. `src/pages/dashboard/Dashboard.jsx` → `src/pages/dashboard/Dashboard.tsx`
4. `src/pages/not-found/NotFound.jsx` → `src/pages/not-found/NotFound.tsx`
5. `src/pages/placeholder/Placeholder.jsx` → `src/pages/placeholder/Placeholder.tsx`

### Phase 7: Services and API

**Priority: LOW** - External integrations

1. `src/api/message.js` → `src/api/message.ts`
2. `src/service/message.js` → `src/service/message.ts`

### Phase 8: Tests Migration

**Priority: LOW** - Can be done last

1. Update test setup: `src/test/setup.js` → `src/test/setup.ts`
2. Migrate test utilities: `src/test/test-utils.jsx` → `src/test/test-utils.tsx`
3. Migrate individual test files:
   - `src/__tests__/local-storage.test.js` → `src/__tests__/local-storage.test.ts`
   - `src/__tests__/ThemeContext.test.jsx` → `src/__tests__/ThemeContext.test.tsx`
   - `src/__tests__/ProfilePanel.test.jsx` → `src/__tests__/ProfilePanel.test.tsx`
   - `src/__tests__/routes.config.test.js` → `src/__tests__/routes.config.test.ts`
   - `src/__tests__/routes.utils.test.js` → `src/__tests__/routes.utils.test.ts`
   - `src/__tests__/Welcome.test.jsx` → `src/__tests__/Welcome.test.tsx`

### Phase 9: Cleanup and Optimization

**Priority: LOW** - Final polish

1. Remove PropTypes dependencies
2. Enable stricter TypeScript checks
3. Add JSDoc comments where beneficial
4. Review and optimize type definitions
5. Update documentation

## Migration Guidelines

### General Principles

1. **Incremental Migration**: Migrate files one at a time, ensuring each compiles before moving to the next
2. **Type Safety First**: Prefer explicit types over `any`
3. **Maintain Functionality**: Ensure all existing functionality works after migration
4. **Test Coverage**: Run tests after each migration phase
5. **PropTypes Removal**: Remove PropTypes only after TypeScript types are in place

### TypeScript Best Practices

#### Component Props

```typescript
// Before (JavaScript with PropTypes)
import PropTypes from 'prop-types';

const MyComponent = ({ title, count, onAction }) => {
  // component logic
};

MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number,
  onAction: PropTypes.func.isRequired,
};

// After (TypeScript)
interface MyComponentProps {
  title: string;
  count?: number;
  onAction: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({
  title,
  count,
  onAction,
}) => {
  // component logic
};
```

#### Event Handlers

```typescript
// Type event handlers properly
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  // handler logic
};

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  // handler logic
};
```

#### Hooks

```typescript
// Type useState
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);

// Type useRef
const inputRef = useRef<HTMLInputElement>(null);

// Type useCallback
const handleSubmit = useCallback((data: FormData) => {
  // logic
}, []);
```

#### Context

```typescript
// Create typed context
const MyContext = createContext<MyContextValue | undefined>(undefined);

// Create typed hook
export const useMyContext = (): MyContextValue => {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
};
```

### Common Patterns

#### Carbon Component Props

```typescript
import { ButtonProps } from '@carbon/react';

interface CustomButtonProps extends ButtonProps {
  customProp?: string;
}
```

#### Route Configuration

```typescript
import { ComponentType } from 'react';

interface RouteConfig {
  path: string;
  element?: ComponentType;
  label?: string;
}
```

## Validation Checklist

After each phase, verify:

- [ ] TypeScript compilation succeeds (`npm run type-check`)
- [ ] All tests pass (`npm test`)
- [ ] ESLint passes (`npm run lint:es`)
- [ ] Development server runs (`npm run dev`)
- [ ] Production build succeeds (`npm run build`)
- [ ] No runtime errors in browser console

## Rollback Strategy

If issues arise during migration:

1. **File-level rollback**: Revert individual `.ts`/`.tsx` files back to `.js`/`.jsx`
2. **Phase rollback**: Revert entire phase if multiple files have issues
3. **Configuration rollback**: Revert config changes if build breaks
4. **Git branches**: Use feature branches for each phase to enable easy rollback

## Timeline Estimate

- **Phase 1 (Setup)**: 2-4 hours
- **Phase 2 (Types)**: 2-3 hours
- **Phase 3 (Core)**: 4-6 hours
- **Phase 4 (Layouts)**: 1-2 hours
- **Phase 5 (Components)**: 6-8 hours
- **Phase 6 (Pages)**: 3-4 hours
- **Phase 7 (Services)**: 1-2 hours
- **Phase 8 (Tests)**: 3-4 hours
- **Phase 9 (Cleanup)**: 2-3 hours

**Total Estimated Time**: 24-36 hours

## Benefits of Migration

1. **Type Safety**: Catch errors at compile time instead of runtime
2. **Better IDE Support**: Enhanced autocomplete and IntelliSense
3. **Refactoring Confidence**: Safe refactoring with type checking
4. **Documentation**: Types serve as inline documentation
5. **Maintainability**: Easier to understand and maintain code
6. **Team Collaboration**: Clear contracts between components
7. **Carbon Integration**: Better integration with Carbon's TypeScript definitions

## Risks and Mitigation

### Risk: Breaking Changes

**Mitigation**: Incremental migration with testing after each phase

### Risk: Learning Curve

**Mitigation**: Provide TypeScript training and code examples

### Risk: Build Time Increase

**Mitigation**: Use SWC for fast TypeScript compilation (already configured)

### Risk: Third-party Type Issues

**Mitigation**: Use `@types` packages or create custom type definitions

## Post-Migration Tasks

1. Update README with TypeScript information
2. Add TypeScript guidelines to contributing docs
3. Configure CI/CD to run type checking
4. Set up pre-commit hooks for type checking
5. Review and optimize tsconfig.json settings
6. Consider enabling stricter TypeScript options

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Carbon React TypeScript Examples](https://github.com/carbon-design-system/carbon/tree/main/packages/react)
- [Vite TypeScript Guide](https://vitejs.dev/guide/features.html#typescript)

## Conclusion

This migration plan provides a structured approach to converting the Carbon React Router Starter from JavaScript to TypeScript. By following the phased approach and adhering to best practices, we can achieve a smooth transition while maintaining code quality and functionality throughout the process.
