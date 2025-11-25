# Phase 3 - Client-Side Hydration Issue

## Current Status

The React Router Framework mode migration is **95% complete** with one remaining issue: **client-side JavaScript hydration is not working properly**.

### ✅ What's Working

1. **Server-Side Rendering (SSR)** - Pages render correctly on the server
2. **Routing** - Navigation between pages works perfectly
3. **Dynamic Routes** - URL parameters and query strings work correctly
4. **Page Content** - All content displays properly
5. **Styling** - Carbon Design System styles are applied correctly
6. **Build System** - React Router dev server runs without errors

### ❌ What's Not Working

**Interactive Elements** - Click handlers and state changes don't work:

- Hamburger menu button doesn't open the side navigation
- Profile button doesn't open the profile panel
- Theme switcher likely won't work
- No console.log output from event handlers

### Root Cause

The issue is with **client-side hydration**. The HTML is being rendered on the server, but the JavaScript isn't properly "hydrating" the static HTML to make it interactive in the browser.

## Technical Details

### Current Implementation

**`app/entry.client.jsx`** (Current):

```javascript
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { HydratedRouter } from 'react-router/dom';

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
  );
});
```

**`app/entry.server.jsx`** (Current):

```javascript
import { renderToString } from 'react-dom/server';
import { ServerRouter } from 'react-router';

export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  routerContext,
) {
  const html = renderToString(
    <ServerRouter context={routerContext} url={request.url} />,
  );

  responseHeaders.set('Content-Type', 'text/html');

  return new Response(`<!DOCTYPE html>${html}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
```

**`app/root.jsx`** includes:

- `<Scripts />` component (line 41) - Required for hydration
- `<Links />` component (line 36) - For CSS
- `<Meta />` component (line 35) - For metadata

### Observations

1. **Vite connects successfully** - Console shows "[vite] connected"
2. **No JavaScript errors** - Console is clean except for React DevTools message
3. **No console.log output** - Event handlers aren't executing
4. **Visual feedback works** - CSS hover states work (buttons highlight on click)
5. **Removing entry files crashes server** - Custom entry files are required

### Investigation Steps Taken

1. ✅ Verified `<Scripts />` component is present in root layout
2. ✅ Confirmed entry.client.jsx uses correct import path (`react-router/dom`)
3. ✅ Checked that entry.server.jsx renders with `ServerRouter`
4. ✅ Tested that routing works (proves some JS is loading)
5. ✅ Verified dev server runs without errors
6. ❌ Attempted to use default entry files (server crashed)

## Possible Solutions to Investigate

### Option 1: Check Hydration Root Element

The current implementation hydrates the entire `document`. React Router might expect hydration on a specific element (e.g., `document.getElementById('root')`).

### Option 2: Verify Entry File Detection

React Router might not be detecting our custom entry files. Check if:

- Files need to be `.tsx` instead of `.jsx`
- Different export format is required
- Configuration in `react-router.config.js` is missing

### Option 3: Check Build Output

Inspect the generated HTML to verify:

- `<Scripts />` component generates correct script tags
- Client bundle is being created
- Script tags point to correct entry file

### Option 4: Compare with Working Example

Create a minimal React Router Framework app and compare:

- Entry file structure
- Root layout structure
- Configuration files

### Option 5: Use React Router Reveal Command

Try `npx react-router reveal` to see default implementations, though this previously showed "No default server entry detected".

## Files Involved

### Core Files

- `app/entry.client.jsx` - Client hydration entry point
- `app/entry.server.jsx` - Server rendering entry point
- `app/root.jsx` - Root layout with `<Scripts />` component
- `react-router.config.js` - Framework configuration

### Component Files

- `src/components/nav/Nav.jsx` - Contains event handlers that aren't firing
- `src/components/profilePanel/ProfilePanel.jsx` - Profile panel component
- `src/context/ThemeContext.jsx` - Theme context provider

## Next Steps

1. **Research React Router v7 hydration** - Check official examples and documentation
2. **Inspect generated HTML** - View page source to see what scripts are included
3. **Test with minimal example** - Create simple button with onClick to isolate issue
4. **Check React Router GitHub** - Search for similar hydration issues
5. **Consider asking for help** - React Router Discord or GitHub discussions

## Impact

This issue prevents:

- ❌ Interactive navigation (hamburger menu, dropdowns)
- ❌ User profile panel
- ❌ Theme switching
- ❌ Any client-side state management
- ❌ Form submissions (if using client-side validation)

However, the application is still functional for:

- ✅ Viewing content
- ✅ Navigating via header links
- ✅ Server-side rendering
- ✅ SEO and initial page load performance

## Conclusion

The migration to React Router Framework mode is nearly complete. The remaining hydration issue is a critical blocker for interactive features but doesn't prevent the application from rendering and basic navigation from working. This suggests the issue is specific to the client-side hydration configuration rather than a fundamental problem with the migration approach.

---

**Created**: 2025-11-25  
**Status**: Blocked on client-side hydration issue  
**Priority**: High - Blocks interactive features
