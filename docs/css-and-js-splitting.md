# CSS and JS splitting

This document explains how the starter splits CSS and JavaScript across routes, and the conventions you must follow when adding new pages.

---

## How it works

The starter uses three complementary techniques to keep initial load fast and subsequent navigation instant.

### 1. Per-page CSS and JS chunks

Each page component imports its own stylesheet directly:

```jsx
// src/pages/my-page/MyPage.jsx
import './my-page.scss'; // ← here, not in index.scss

export default function MyPage() { ... }
```

Because the page is loaded via `React.lazy()`, Vite automatically emits the stylesheet as a separate CSS file linked to that route's JS chunk. The browser only downloads it when the user first visits that page.

**Do not add page styles to [`src/index.scss`](../src/index.scss).** That file is reserved for globally required styles: Carbon tokens, the theme cascade, and shell components (header, footer, layout). Adding a page's styles there forces every visitor to download them on every page, regardless of which route they visit.

### 2. Carbon isolated as a vendor chunk

All `@carbon/*`, `@ibm/*`, and `@carbon-labs/*` JavaScript is bundled into a single `vendor-carbon` chunk. This chunk is large, but it is cached in the browser after the first visit and never re-downloaded when you deploy new application code.

This is configured in [`vite.config.js`](../vite.config.js) via `build.rollupOptions.output.manualChunks`.

### 3. Prefetch on idle + server preload hints

After the first page is interactive, the browser prefetches the JS and CSS chunks for every other route in the background at low priority. This is the same strategy Next.js uses — by the time the user clicks a link, the assets are already cached.

Additionally, the SSR server injects `<link rel="modulepreload">` and `<link rel="preload" as="style">` tags for the *current* page's chunks into the HTML `<head>`, so the browser can fetch them in parallel with the HTML stream.

---

## Carbon SCSS import rules

Carbon exposes two kinds of SCSS imports that behave very differently:

| Import | Emits CSS? | Safe in component files? |
|---|---|---|
| `@use '@carbon/react'` | Yes — all ~80 components | ❌ `index.scss` only |
| `@use '@carbon/ibm-products/css/index.min'` | Yes — all IBM Products | ❌ `index.scss` only |
| `@use '@carbon/react/scss/spacing'` | No — SCSS variables only | ✅ Anywhere |
| `@use '@carbon/react/scss/theme'` | No — mixins only | ✅ Anywhere |
| `@use '@carbon/react/scss/breakpoint'` | No — mixins only | ✅ Anywhere |

Importing a full entrypoint outside `src/index.scss` silently duplicates ~1.8 MB of CSS into that file's output chunk. A Stylelint rule (`plugin/no-carbon-full-entrypoint`) enforces this and will fail `npm run lint` if violated.

---

## Adding a new page

1. Create your page component and its SCSS file:
   ```
   src/pages/my-page/
     MyPage.jsx
     my-page.scss
   ```

2. Import the stylesheet at the top of the component:
   ```jsx
   import './my-page.scss';
   ```

3. Register the page with `React.lazy()` in [`src/routes/config.js`](../src/routes/config.js) and add a `chunkId` matching the source path:
   ```js
   const MyPage = lazy(() => import('../pages/my-page/MyPage'));

   // in the routes array:
   {
     path: '/my-page',
     element: MyPage,
     chunkId: 'src/pages/my-page/MyPage.jsx',
   }
   ```

   The `chunkId` is used by the server to emit preload hints and by the client to prefetch the page's assets. It must match the path Vite uses as the module ID — the relative path from the project root.

4. Use Carbon token/mixin sub-paths freely in your SCSS:
   ```scss
   @use '@carbon/react/scss/spacing' as *;
   @use '@carbon/react/scss/breakpoint' as *;
   ```

   Do **not** use `@use '@carbon/react'` or `@use '@carbon/ibm-products'` in component files.

---

## Bundle size guardrail

The build is configured to warn if any chunk other than `vendor-carbon` exceeds the size threshold. If you see an unexpected large-chunk warning, the most likely cause is a page component importing a full Carbon entrypoint — check the Stylelint output first.

The threshold is set to 3× the measured `vendor-carbon` baseline (298 kB) to give ample headroom for a full-featured IBM product UI. If your app's `vendor-carbon` chunk grows significantly beyond 298 kB due to additional Carbon dependencies, update `build.chunkSizeWarningLimit` in [`vite.config.js`](../vite.config.js) and document the new baseline.

---

## Open question — Carbon CSS tree-shaking

> **This question is open for Carbon SME input.**

The current approach imports the entire Carbon component library in one shot (`@use '@carbon/react'`). Carbon's SCSS is structured to support per-component imports, which would allow each page to load only the CSS for the components it actually uses. See the discussion in the [pull request](https://github.com/carbon-design-system/carbon-react-router-starter/pulls) for context, trade-offs, and the specific questions raised for the Carbon team.
