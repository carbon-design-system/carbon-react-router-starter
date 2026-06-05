# Vite 8 Migration Guide

## Overview

This document outlines the migration path from Vite 7 to Vite 8 for the carbon-react-router-starter project.

## Current State

- **Current Version**: Vite 7.0.0
- **Target Version**: Vite 8.x
- **Project Type**: React SSR application with Carbon Design System
- **Current React Plugin**: @vitejs/plugin-react-swc (SWC-based)

## Key Changes in Vite 8

### 1. Rolldown Replaces esbuild (Major Change)

Vite 8 uses **Rolldown** and **Oxc** instead of esbuild:

- **Dependency optimization**: Now uses Rolldown (not esbuild)
- **JavaScript transforms**: Now uses Oxc (not esbuild)
- **This means SWC is no longer needed** - Oxc handles all transformations
- Backward compatibility maintained through automatic option conversion

### 2. Browser Target Updates

Default browser targets updated to newer versions:

- Chrome 107 → 111
- Edge 107 → 111
- Safari 16.0 → 16.4

### 3. Build Tool Changes

- `build.rollupOptions` renamed to `build.rolldownOptions`
- `worker.rollupOptions` renamed to `worker.rolldownOptions`
- `build.commonjsOptions` is now no-op
- `build.dynamicImportVarsOptions.warnOnError` is now no-op

### 4. CSS & Minification

- **Lightning CSS** now default for CSS minification (instead of esbuild)
- **Oxc Minifier** now default for JavaScript minification (instead of esbuild)
- Can revert using `build.cssMinify: 'esbuild'` and `build.minify: 'esbuild'` (requires esbuild as devDependency)

### 5. Module Resolution Changes

- Consistent CommonJS interop handling
- `default` import from CJS modules now uses `module.exports`
- May need `legacy.inconsistentCjsInterop: true` for temporary compatibility

### 6. Removed/Deprecated Features

- `import.meta.hot.accept` URL passing no longer supported
- `build.rollupOptions.output.manualChunks` deprecated (use `codeSplitting` instead)
- `resolve.alias[].customResolver` deprecated (use `resolveId` hook with `enforce: 'pre'`)

### 7. API Changes

- `build()` now throws `BundleError` instead of raw errors
- `require` calls for externalized modules preserved as `require` (not converted to `import`)
- `import.meta.url` in UMD/IIFE no longer polyfilled (replaced with `undefined`)

## Migration Steps

### Step 1: Update Dependencies in package.json

**Remove:**

```json
"@vitejs/plugin-react-swc": "^4.0.0"
```

**Add/Update:**

```json
{
  "devDependencies": {
    "vite": "^8.0.0",
    "@vitejs/plugin-react": "^6.0.0",
    "vitest": "^4.0.0",
    "@vitest/coverage-v8": "^4.0.0"
  }
}
```

**Note:** Vitest 5 is still in beta as of June 2026, so we're keeping Vitest 4.x for stability.

### Step 2: Update vite.config.js

**Current:**

```javascript
import react from '@vitejs/plugin-react-swc';
```

**Change to:**

```javascript
import react from '@vitejs/plugin-react';
```

The plugin usage remains the same - just the import changes. Oxc will handle all the React transformations that SWC was doing.

**Optional: Add SSR configuration** (if using SSR):

```javascript
export default defineConfig({
  // ... other config
  ssr: {
    // Ensure proper handling of external dependencies in SSR
    noExternal: [],
  },
});
```

### Step 2b: Fix SSR HTML Transform (if using SSR)

If you're using SSR with `transformIndexHtml`, update your server code to ensure the URL is never empty:

**In src/server.js:**

```javascript
// Before
template = await vite.transformIndexHtml(url, template);

// After
template = await vite.transformIndexHtml(url || '/', template);
```

This fixes a Vite 8 issue where empty URLs cause HTML proxy resolution errors.

### Step 3: Run npm install

```bash
npm install
```

### Step 4: Testing Checklist

After upgrading, verify the following:

- [ ] Development server starts correctly (`npm run dev`)
- [ ] HMR (Hot Module Replacement) works
- [ ] Production build completes successfully (`npm run build`)
- [ ] SSR functionality works with Express (`npm run preview`)
- [ ] i18n translations load properly (vite-plugin-i18next-loader)
- [ ] All tests pass with Vitest (`npm test`)
- [ ] Carbon React components render correctly
- [ ] Linting and formatting still work (`npm run lint`)

## Why Remove SWC?

1. **Oxc replaces SWC**: Vite 8's Oxc handles JavaScript/TypeScript transformations
2. **Redundancy**: Running both Oxc and SWC would be redundant and slower
3. **Better integration**: @vitejs/plugin-react is optimized for Oxc
4. **Simpler stack**: One less dependency to manage
5. **Performance**: Oxc is written in Rust and extremely fast

## Potential Issues for This Project

1. **SSR with Express**: Verify server-side rendering works with Oxc transforms
2. **i18next Plugin**: Check `vite-plugin-i18next-loader` v3.1.3 compatibility with Vite 8
3. **React 19**: Already compatible
4. **Carbon Components**: Should work seamlessly with new build tools

## Performance Benefits

- **Faster builds**: Oxc is written in Rust and extremely fast
- **Faster transforms**: Oxc is faster than SWC for most operations
- **Better tree-shaking**: Rolldown provides improved tree-shaking
- **Reduced dependencies**: Removing SWC simplifies the dependency tree

## Rollback Plan

If issues arise, you can temporarily:

1. Keep using Vite 7 with `rolldown-vite` package for gradual migration
2. Add esbuild as devDependency and use `build.minify: 'esbuild'`
3. Use `legacy.inconsistentCjsInterop: true` for CJS compatibility
4. Revert to @vitejs/plugin-react-swc if Oxc causes issues (though this defeats the purpose)

## Gradual Migration Option

Vite provides `rolldown-vite` package for gradual migration:

- Implements Vite 7 with Rolldown (without other Vite 8 changes)
- Useful for testing Rolldown compatibility separately
- See [Rolldown Integration guide](https://vitejs.dev/guide/migration#rolldown)

## Resources

- [Vite 8 Migration Guide](https://vitejs.dev/guide/migration)
- [Rolldown Documentation](https://rolldown.rs/)
- [Oxc Documentation](https://oxc.rs/)
- [@vitejs/plugin-react Documentation](https://github.com/vitejs/vite-plugin-react)
- [Vite 8 Release Notes](https://github.com/vitejs/vite/releases)

## Notes

- Vite 8 was released approximately 3 months ago (March 2026)
- This migration removes the SWC dependency in favor of Oxc
- The configuration changes are minimal due to automatic compatibility layer
- Most breaking changes are handled transparently by Vite