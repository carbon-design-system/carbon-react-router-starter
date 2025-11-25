# Phase 3: React Router Framework Mode Setup - Progress Report

## Overview

This document tracks the migration from React Router non-framework mode to Framework mode, maintaining all existing functionality while modernizing the routing architecture.

## Completed Work

### Phase 3.1: Framework Mode Configuration ✅

#### Dependencies Installed

- `@react-router/dev` - Development tools and Vite plugin
- `@react-router/node` - Node.js server adapter for SSR

#### Configuration Files Created

**1. `react-router.config.ts`**

- Enabled SSR (Server-Side Rendering)
- Set `appDirectory` to `app`
- Configured for Framework mode operation

**2. `vite.config.js` (Updated)**

- Replaced `@vitejs/plugin-react-swc` with `@react-router/dev/vite` plugin
- Maintained existing Vite configuration
- Integrated React Router's build system

**3. `tsconfig.json`**

- Created TypeScript configuration for type generation
- Configured `rootDirs` to include `.react-router/types` for auto-generated route types
- Set up for JavaScript project with TypeScript tooling support

### Phase 3.2: Root Layout ✅

**Created `app/root.jsx`**

Key Features:

- **Layout Component**: Provides HTML document structure with `<html>`, `<head>`, and `<body>`
- **Theme Integration**: Migrated `ThemeProvider` from old architecture
- **Carbon Design System**: Integrated `GlobalTheme` and `Theme` components
- **React Router Components**:
  - `Meta` - Document metadata management
  - `Links` - Stylesheet and asset links
  - `Scripts` - Client-side JavaScript bundles
  - `ScrollRestoration` - Scroll position management
  - `Outlet` - Child route rendering
- **Error Boundary**: Comprehensive error handling for both route errors and JavaScript errors
- **Theme Readiness**: Prevents flash of unstyled content by waiting for theme initialization

### Phase 3.3: Route Configuration ✅

**Created `app/routes.ts`**

Route Structure:

```
/ (index)                    → app/routes/home.jsx
/dashboard                   → app/routes/dashboard.jsx
/dashboard/:id               → app/routes/dashboard.$id.jsx
/link-1                      → app/routes/link-1.jsx
/link-2                      → app/routes/link-2.jsx
/link-3                      → app/routes/link-3.jsx
/link-4                      → app/routes/link-4.jsx (layout)
  ├─ /link-4 (index)         → app/routes/link-4._index.jsx
  ├─ /link-4/sub-link-1      → app/routes/link-4.sub-link-1.jsx
  ├─ /link-4/sub-link-2      → app/routes/link-4.sub-link-2.jsx
  └─ /link-4/sub-link-3      → app/routes/link-4.sub-link-3.jsx
* (catch-all)                → app/routes/$.jsx
```

Features:

- Type-safe route configuration using `RouteConfig` type
- Nested routing for Link 4 submenu
- Dynamic route parameter for dashboard detail pages
- Catch-all route for 404 handling
- Comprehensive documentation and comments

## Current Status

### ✅ Completed

- Framework mode configuration
- Root layout with theme integration
- Route configuration file
- Navigation separation (Phase 2)

### 🔄 In Progress

- Phase 3.4: Creating route modules

### ⏳ Pending

- Route module creation (12 files)
- Navigation component updates
- Old file cleanup
- Testing and validation

## Next Steps

### Phase 3.4: Create Route Modules

Need to create the following route module files:

1. **`app/routes/home.jsx`** - Migrate from `src/pages/welcome/Welcome.jsx`
2. **`app/routes/dashboard.jsx`** - Migrate from `src/pages/dashboard/Dashboard.jsx`
3. **`app/routes/dashboard.$id.jsx`** - New dynamic route with param handling
4. **`app/routes/link-1.jsx`** - Migrate from `src/pages/placeholder/Placeholder.jsx`
5. **`app/routes/link-2.jsx`** - Migrate from `src/pages/placeholder/Placeholder.jsx`
6. **`app/routes/link-3.jsx`** - Migrate from `src/pages/placeholder/Placeholder.jsx`
7. **`app/routes/link-4.jsx`** - New layout route with `<Outlet />`
8. **`app/routes/link-4._index.jsx`** - Index route for /link-4
9. **`app/routes/link-4.sub-link-1.jsx`** - Nested route
10. **`app/routes/link-4.sub-link-2.jsx`** - Nested route
11. **`app/routes/link-4.sub-link-3.jsx`** - Nested route
12. **`app/routes/$.jsx`** - Migrate from `src/pages/not-found/NotFound.jsx`

Each route module should:

- Export a default component
- Include JSDoc comments referencing auto-generated types
- Implement loader functions where data fetching is needed
- Use the existing page components from `src/pages/`
- Maintain the same UI and functionality

### Phase 3.5: Update Navigation

- Verify Nav component works with Framework mode routing
- Test all navigation scenarios
- Ensure active states work correctly

### Phase 3.6: Cleanup and Testing

Files to remove:

- `src/entry-server.jsx`
- `src/entry-client.jsx`
- `src/server.js`
- `src/routes/config.js`
- `src/routes/index.jsx`
- `src/routes/utils.js`

Testing checklist:

- [ ] All routes render correctly
- [ ] Navigation works (header and side nav)
- [ ] Theme switching works
- [ ] Dynamic routes work (/dashboard/:id)
- [ ] Nested routes work (/link-4/sub-link-\*)
- [ ] 404 page works
- [ ] SSR works correctly
- [ ] Build process succeeds
- [ ] All unit tests pass

## Technical Notes

### TypeScript Configuration

- Only `react-router.config.ts` and `app/routes.ts` are TypeScript files
- All route modules remain as `.jsx` files
- Type safety achieved through auto-generated types in `.react-router/types`
- JSDoc comments can reference these types for IDE support

### Theme Management

- ThemeContext remains in `src/context/ThemeContext.jsx`
- Theme application moved to root layout
- Prevents flash of unstyled content
- Maintains all existing theme functionality

### Navigation Independence

- Navigation config in `app/navigation.config.js` (from Phase 2)
- Completely separate from routing configuration
- Nav components updated to use navigation config
- Allows independent management of UI navigation and routing

### SSR Considerations

- Framework mode handles SSR automatically
- No need for custom server setup
- Vite plugin manages both dev and production builds
- Express server code will be removed in cleanup phase

## Migration Strategy

The migration maintains a clear separation of concerns:

1. **Routing** (`app/routes.ts`) - Defines URL structure and route modules
2. **Navigation** (`app/navigation.config.js`) - Defines UI navigation structure
3. **Theme** (`app/root.jsx`) - Manages application-wide theming
4. **Components** (`src/pages/*`) - Reused without modification where possible

This approach ensures:

- Minimal code changes
- Easy rollback if needed
- Clear upgrade path
- Maintained functionality
- Improved developer experience

## References

- [React Router Framework Mode Documentation](https://reactrouter.com/start/framework)
- [Route Module API](https://reactrouter.com/start/framework/route-module)
- [Routing Configuration](https://reactrouter.com/start/framework/routing)
- [Data Loading](https://reactrouter.com/start/framework/data-loading)
