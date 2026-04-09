/\*\*

- Copyright IBM Corp. 2026
-
- This source code is licensed under the Apache-2.0 license found in the
- LICENSE file in the root directory of this source tree.
  \*/

# Adding GitHub Pages Deployment

Quick guide to add GitHub Pages deployment to any Carbon React Router starter-based project.

## Quick Setup (5 minutes)

### Step 1: Add Build Scripts to package.json

Add these two scripts to your `package.json`:

```json
{
  "scripts": {
    "build:gh-pages": "vite build --outDir dist-gh-pages --base=/YOUR-ORG/YOUR-REPO/ && touch dist-gh-pages/.nojekyll",
    "deploy:gh-pages": "npm run build:gh-pages && npx gh-pages -d dist-gh-pages --dotfiles"
  }
}
```

**⚠️ Important:** Replace `YOUR-ORG/YOUR-REPO` with your actual GitHub organization and repository names.

**Example:**

```json
"build:gh-pages": "vite build --outDir dist-gh-pages --base=/my-org/my-project/ && touch dist-gh-pages/.nojekyll"
```

### Step 2: Update Router Basename

In your client entry file (e.g., `src/entry-client.jsx`), add `basename` prop to `BrowserRouter`:

```jsx
<BrowserRouter basename={import.meta.env.BASE_URL}>
  <Router />
</BrowserRouter>
```

This makes the router use the correct base path for GitHub Pages while keeping `/` for local development.

### Step 3: Fix Asset Paths

Change any **absolute** asset paths to **relative** paths. For example:

**Before:**

```jsx
<img src="/icon.dark.svg" alt="Logo" />
```

**After:**

```jsx
<img src="icon.dark.svg" alt="Logo" />
```

This ensures assets load correctly regardless of the base path.

### Step 4: Deploy

Run the deployment command:

```bash
npm run deploy:gh-pages
```

This will:

- Build your static site with the correct base path
- Create a `.nojekyll` file (prevents Jekyll processing)
- Deploy to the `gh-pages` branch
- Push to GitHub

### Step 5: Enable GitHub Pages (First Time Only)

1. Go to your repository Settings → Pages
2. Set Source to: **Deploy from a branch**
3. Select branch: **gh-pages** / **root**
4. Save

Your site will be available at:

```
https://pages.github.ibm.com/YOUR-ORG/YOUR-REPO/
```

## Alternative: GitHub Actions (Optional)

For automated deployments on every push, create `.github/workflows/deploy-gh-pages.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build:gh-pages
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist-gh-pages

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

Then update GitHub Pages settings to use **GitHub Actions** as the source instead of the `gh-pages` branch.

## Limitations & Workarounds

### Browser Routing Limitations

GitHub Pages is **static file hosting only** - it cannot handle server-side routing. This means:

- ✅ Navigation through the app works perfectly
- ❌ Direct URL access to routes (bookmarks, shared links) will return 404
- ❌ Browser refresh on any route except home page will fail

**Why this happens:**

- GitHub Pages serves actual files from the repository
- Routes like `/about` or `/dashboard` don't correspond to physical files
- There's no server to intercept requests and serve `index.html` for all routes

**Workarounds:**

1. **Hash-Based Routing** (Recommended for GitHub Pages):
   - Use `HashRouter` instead of `BrowserRouter`
   - URLs become `/#/route` instead of `/route`
   - Works because everything after `#` is client-side only
   - Trade-off: Less clean URLs

2. **Custom 404.html Redirect**:
   - Create a `404.html` that redirects to `index.html` with route information
   - Trade-off: Causes visible redirect, affects browser history

3. **Accept the Limitation**:
   - Document that users must navigate from the home page
   - Suitable for internal tools or demos

### Other Limitations

- ❌ No server-side rendering (SSR)
- ❌ No API endpoints or backend features
- ❌ No SEO (content loads client-side)
- ❌ Slower initial load (JavaScript must load first)
- ✅ Free hosting
- ✅ Simple deployment

## Troubleshooting

### Assets Return 404

**Symptoms:** CSS, JavaScript, or images fail to load

**Solutions:**

1. Verify the base path in `package.json` matches your GitHub Pages URL exactly
2. Check that `.nojekyll` file exists in the deployed `gh-pages` branch
3. Ensure GitHub Pages settings point to the `gh-pages` branch (or GitHub Actions)
4. Clear browser cache and hard refresh (Cmd/Ctrl + Shift + R)

### Navigation Links Don't Work

**Symptoms:** Clicking navigation links doesn't change routes

**Solutions:**

1. Ensure you rebuilt after updating `src/entry-client.jsx` with the `basename` prop
2. Check browser console for errors
3. Verify `import.meta.env.BASE_URL` is set correctly (inspect in DevTools)
4. Confirm all `<Link>` components use relative paths (no leading `/`)

### Deployment Command Fails

**Symptoms:** `npm run deploy:gh-pages` throws an error

**Solutions:**

1. Ensure you have push access to the repository
2. Verify the `gh-pages` package is installed: `npm install --save-dev gh-pages`
3. Try manual deployment: `npx gh-pages -d dist-gh-pages --dotfiles`
4. Check for Git authentication issues (may need to configure SSH keys or tokens)

### Routes Return 404 on Direct Access

**Symptoms:** Typing a URL directly or refreshing a page shows 404

**This is expected behavior** - see "Browser Routing Limitations" above. Solutions:

1. Switch to `HashRouter` for full compatibility
2. Implement a custom 404.html redirect
3. Document that users should navigate from the home page

## Technical Notes

### The `.nojekyll` File

The build script automatically creates a `.nojekyll` file to tell GitHub Pages to skip Jekyll processing. This is important because:

- Jekyll ignores files/folders starting with `_` (common in build outputs)
- Jekyll can interfere with asset paths
- The `--dotfiles` flag in the deploy command ensures this file is included

### Static vs SSR Builds

If your project supports both GitHub Pages and SSR deployments:

```bash
npm run build              # SSR build (default) - outputs to dist/
npm run build:gh-pages     # Static build - outputs to dist-gh-pages/
npm run deploy:gh-pages    # Build + Deploy to GitHub Pages
```

The changes required for GitHub Pages (relative asset paths, router basename) are compatible with SSR builds.

### Verification Checklist

After deployment, test that:

- ✅ Home page loads at your GitHub Pages URL
- ✅ Navigation through the app's UI works (all links use correct base path)
- ✅ Assets load correctly (CSS, JS, images)
- ✅ Styles and Carbon components render properly
- ⚠️ Direct URL access to routes will return 404 (expected - see limitations above)

## Quick Reference

```bash
# Build only (no deploy)
npm run build:gh-pages

# Build and deploy
npm run deploy:gh-pages

# Manual deploy (if needed)
npx gh-pages -d dist-gh-pages --dotfiles

# View build output
ls -la dist-gh-pages
```
