# React Router Framework Mode Migration Plan

## Executive Summary

This document outlines the plan to migrate the current React Router non-framework implementation to Framework mode. The migration will maintain existing functionality while adopting React Router's framework features for improved performance, type safety, and developer experience.

## Language Strategy

**Primary Language: JavaScript (JSX)**

- The project currently uses JSX files throughout
- We will maintain this JavaScript-first approach
- TypeScript will be used **only for configuration files** where required by React Router:
  - `react-router.config.ts` (required by framework)
  - `app/routes.ts` (required for route configuration)
- All route modules and components will remain as `.jsx` files
- Type safety will be achieved through JSDoc comments where beneficial
- React Router will still generate TypeScript types for route params and loader data, which can be used via JSDoc

## Current State Analysis

### Current Implementation (Non-Framework Mode)

The application currently uses React Router in **non-framework mode** with the following characteristics:

#### Architecture

- **Custom SSR Setup**: Manual server-side rendering using Express
  - `src/server.js` - Express server with Vite middleware
  - `src/entry-server.jsx` - Server-side rendering entry point
  - `src/entry-client.jsx` - Client-side hydration entry point

#### Routing Configuration

- **Centralized Route Config**: `src/routes/config.js`
  - Flat array structure with 12 routes
  - Mixed concerns: routing + Carbon navigation metadata
  - Routes include: Welcome (index), Dashboard, Link 1-4, Sub-links, NotFound
  - Dynamic route: `/dashboard/:id`

#### Route Structure

```javascript
{
  path: string,
  element: Component,
  index?: boolean,
  status?: number,
  carbon?: {
    label: string,
    inHeader?: boolean,
    inSideNav?: boolean,
    separator?: boolean,
    icon?: CarbonIconType,
    subMenu?: routesType[],
    inSubMenu?: boolean,
    href?: string,
    virtualPath?: string
  }
}
```

#### Navigation Integration

- **Carbon Navigation**: `src/components/nav/Nav.jsx`
  - Directly imports `routesInHeader` and `routesInSideNav` from route config
  - Tight coupling between routing and UI navigation
  - Processes routes to build hierarchical menu structure

#### Key Files

1. **Routes**
   - `src/routes/config.js` - Route definitions + Carbon metadata
   - `src/routes/index.jsx` - Router component using `<Routes>`
   - `src/routes/utils.js` - Route matching utilities
   - `src/routes/routes.js` - API route registration

2. **Pages**
   - `src/pages/welcome/Welcome.jsx` - Home page
   - `src/pages/dashboard/Dashboard.jsx` - Dashboard
   - `src/pages/placeholder/Placeholder.jsx` - Generic page
   - `src/pages/not-found/NotFound.jsx` - 404 page

3. **Layouts**
   - `src/layouts/theme-layout.jsx` - Theme wrapper with `<Outlet>`
   - `src/layouts/page-layout.jsx` - Page structure with Nav

4. **Server**
   - `src/server.js` - Express server with Vite middleware
   - `src/entry-server.jsx` - SSR rendering
   - `src/entry-client.jsx` - Client hydration

#### Dependencies

```json
{
  "react-router": "^7.5.2",
  "@vitejs/plugin-react-swc": "^4.0.0",
  "vite": "^7.0.0"
}
```

### Issues with Current Implementation

1. **Tight Coupling**: Route config mixes routing concerns with Carbon navigation metadata
2. **Manual SSR**: Custom server setup requires maintenance
3. **No Type Safety**: No automatic type generation for routes
4. **No Code Splitting**: All routes loaded upfront
5. **Manual Data Loading**: No loader/action pattern
6. **Complex Navigation Logic**: Route processing happens at runtime

## Target State: Framework Mode

### Framework Mode Benefits

1. **Automatic Code Splitting**: Routes loaded on-demand
2. **Type Safety**: Auto-generated types for route params and loader data
3. **Data Loading**: Built-in loader/action pattern
4. **Simplified SSR**: Framework handles server rendering
5. **Better Performance**: Optimized data fetching and revalidation
6. **Developer Experience**: Better tooling and error handling

### New Architecture

#### File Structure

```
app/
├── root.jsx                    # Root layout (replaces entry-server/client)
├── routes.ts                   # Route configuration
├── navigation.config.js        # Separated Carbon navigation config
├── routes/
│   ├── home.jsx               # / (index)
│   ├── dashboard.jsx          # /dashboard
│   ├── dashboard.$id.jsx      # /dashboard/:id
│   ├── link-1.jsx             # /link-1
│   ├── link-2.jsx             # /link-2
│   ├── link-3.jsx             # /link-3
│   ├── link-4.jsx             # /link-4 (layout)
│   ├── link-4.sub-link-1.jsx  # /link-4/sub-link-1
│   ├── link-4.sub-link-2.jsx  # /link-4/sub-link-2
│   ├── link-4.sub-link-3.jsx  # /link-4/sub-link-3
│   └── $.jsx                  # Catch-all (404)
└── components/
    └── nav/
        └── Nav.jsx            # Updated to use navigation.config.js
```

## Migration Phases

### Phase 1: Document Current Application

**Objective**: Create comprehensive documentation of current routing and navigation

**Tasks**:

1. Document all current routes and their purposes
2. Map route config to Carbon navigation structure
3. Document data flow and dependencies
4. Identify shared layouts and components
5. Document API routes and their usage

**Deliverables**:

- Current route inventory
- Navigation structure diagram
- Data flow documentation
- Component dependency map

### Phase 2: Separate Navigation Configuration

**Objective**: Decouple Carbon navigation config from routing

**Tasks**:

1. Create `app/navigation.config.js` for Carbon-specific metadata
2. Define navigation structure independent of routes
3. Update Nav component to use new config
4. Maintain backward compatibility during transition
5. Test navigation functionality

**New Navigation Config Structure**:

```javascript
// app/navigation.config.js
export const navigationConfig = {
  header: [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/link-1', label: 'Link 1' },
    { path: '/link-2', label: 'Link 2' },
    { path: '/link-3', label: 'Link 3' },
    {
      path: '/link-4',
      label: 'Link 4',
      subMenu: [
        { path: '/link-4/sub-link-1', label: 'Sub-link 1' },
        { path: '/link-4/sub-link-2', label: 'Sub-link 2' },
        { path: '/link-4/sub-link-3', label: 'Sub-link 3' },
      ],
    },
  ],
  sideNav: [
    {
      path: '/getting-started',
      label: 'Getting Started',
      icon: 'MagicWand',
      href: 'https://github.com/carbon-design-system/carbon-react-router-starter',
      subMenu: [
        {
          path: '/getting-started/how',
          label: 'How does this work',
          href: 'https://...',
        },
        {
          path: '/getting-started/up-to-date',
          label: 'Keeping this up to date',
          href: 'https://...',
        },
      ],
    },
  ],
};
```

**Deliverables**:

- `app/navigation.config.js`
- Updated Nav component
- Navigation tests
- Migration guide for navigation config

### Phase 3: Create Framework Mode Application

**Objective**: Implement clean React Router Framework mode setup

**Sub-phases**:

#### 3.1 Setup Framework Mode

1. Install React Router dev dependencies
2. Create `react-router.config.ts`
3. Update `vite.config.js` to use React Router plugin
4. Configure TypeScript for type generation

#### 3.2 Create Root Layout

1. Create `app/root.jsx` with document structure
2. Migrate theme context and providers
3. Add Meta, Links, Scripts components
4. Implement error boundary

#### 3.3 Configure Routes

1. Create `app/routes.ts` with route definitions
2. Map existing routes to new structure
3. Handle nested routes and layouts
4. Configure catch-all route

#### 3.4 Migrate Route Modules

1. Convert each page to route module format
2. Add loader functions where needed
3. Implement proper error boundaries
4. Add type safety with Route types

#### 3.5 Update Navigation

1. Update Nav component to work with Framework mode
2. Ensure navigation config integration
3. Test all navigation scenarios
4. Verify active states and styling

#### 3.6 Clean Up

1. Remove old entry files
2. Remove custom server.js
3. Remove old route config files
4. Update imports throughout application
5. Remove unused utilities

**Deliverables**:

- Working Framework mode application
- All routes migrated
- Navigation fully functional
- Tests passing
- Documentation updated

## Implementation Details

### Route Mapping

| Current Route        | Framework Route File               | Notes             |
| -------------------- | ---------------------------------- | ----------------- |
| `/` (index)          | `app/routes/home.jsx`              | Welcome page      |
| `/dashboard`         | `app/routes/dashboard.jsx`         | Dashboard home    |
| `/dashboard/:id`     | `app/routes/dashboard.$id.jsx`     | Dynamic dashboard |
| `/link-1`            | `app/routes/link-1.jsx`            | Placeholder       |
| `/link-2`            | `app/routes/link-2.jsx`            | Placeholder       |
| `/link-3`            | `app/routes/link-3.jsx`            | Placeholder       |
| `/link-4`            | `app/routes/link-4.jsx`            | Layout route      |
| `/link-4/sub-link-1` | `app/routes/link-4.sub-link-1.jsx` | Nested route      |
| `/link-4/sub-link-2` | `app/routes/link-4.sub-link-2.jsx` | Nested route      |
| `/link-4/sub-link-3` | `app/routes/link-4.sub-link-3.jsx` | Nested route      |
| `*` (404)            | `app/routes/$.jsx`                 | Catch-all         |

### Configuration Files

#### react-router.config.ts

```typescript
import type { Config } from '@react-router/dev/config';

export default {
  ssr: true,
} satisfies Config;
```

#### app/routes.ts

````typescript
import {
  type RouteConfig,
  route,
  index,
  layout,
} from '@react-router/dev/routes';

export default [
  index('routes/home.jsx'),
  route('dashboard', 'routes/dashboard.jsx'),
  route('dashboard/:id', 'routes/dashboard.$id.jsx'),
  route('link-1', 'routes/link-1.jsx'),
  route('link-2', 'routes/link-2.jsx'),
  route('link-3', 'routes/link-3.jsx'),
  layout('routes/link-4.jsx', [
    route('sub-link-1', 'routes/link-4.sub-link-1.jsx'),
    route('sub-link-2', 'routes/link-4.sub-link-2.jsx'),
    route('sub-link-3', 'routes/link-4.sub-link-3.jsx'),
  ]),
  route('*', 'routes/$.jsx'),
] satisfies RouteConfig;

#### Example Route Module (JavaScript/JSX)

```jsx
// app/routes/dashboard.$id.jsx
/**
 * @typedef {import('./.react-router/types/app/routes/dashboard.$id').Route} Route
 */

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader({ params }) {
  // Type-safe params.id via JSDoc
  return { dashboard: await getDashboard(params.id) };
}

/**
 * @param {Route.ComponentProps} props
 */
export default function Dashboard({ loaderData }) {
  // Type-safe loaderData via JSDoc
  return <div>{loaderData.dashboard.title}</div>;
}
````

**Type Safety Note**: React Router will generate TypeScript definition files in `.react-router/types/` that can be referenced via JSDoc comments in JavaScript files, providing IntelliSense and type checking without converting to TypeScript.

```

## Success Criteria

### Functional Requirements

- All routes accessible and functional
- Navigation works identically to current implementation
- Data loading works correctly
- Error handling works as expected
- 404 pages work correctly
- Dynamic routes work with parameters

### Non-Functional Requirements

- Type safety enabled for all routes
- Code splitting working automatically
- Performance equal or better than current
- Build process simplified
- Developer experience improved
- Documentation complete and accurate

## Timeline Estimate

- **Phase 1**: Documentation (1-2 days)
- **Phase 2**: Navigation Separation (2-3 days)
- **Phase 3**: Framework Mode Implementation (5-7 days)

**Total**: 8-12 days

## References

- [React Router Framework Mode](https://reactrouter.com/start/framework)
- [Route Module API](https://reactrouter.com/start/framework/route-module)
- [Component Routes Migration](https://reactrouter.com/upgrading/component-routes)

---

**Document Version**: 1.0
**Last Updated**: 2025-11-24
**Status**: Ready for Review
```
