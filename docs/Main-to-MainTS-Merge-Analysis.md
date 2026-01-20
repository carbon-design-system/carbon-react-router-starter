# Branch Comparison: main vs main-ts

## Executive Summary

The `main-ts` branch contains a complete TypeScript migration of the project, while `main` has received 16 commits with dependency updates, bug fixes, and new features. A merge is **feasible but requires careful conflict resolution** in 2 files.

---

## Branch Status

- **Current Branch**: `main-ts`
- **Target Branch**: `main`
- **Common Ancestor**: `044d7fd` (commit where branches diverged)
- **Commits in main (not in main-ts)**: 16 commits
- **Commits in main-ts (not in main)**: 17 commits

---

## Updates in `main` Branch (16 commits)

### Dependency Updates (10 commits)

1. **@testing-library/react** → v16.3.2 (#380)
2. **baseline-browser-mapping** → v2.9.15 (#378) and v2.9.14 (#369)
3. **prettier** → v3.8.0 (#370)
4. **eslint-plugin-prettier** → v5.5.5 (#365)
5. **Node.js** → v24.13.0 (#364)
6. **@carbon/react** → v1.99.0 (#363)
7. **cspell** → v9.6.0 (#362)
8. **vitest monorepo** → v4.0.17 (#361)
9. **@types/react** → v19.2.8 (#360)
10. **qs** security update (npm_and_yarn group) (#351)

### Features (2 commits)

1. **Separate snippets package** (#247) - Moved to published `carbon-vscode-snippets` package
2. **SSR regression test workflow** (#368) - Added CI workflow to test server-side rendering

### Bug Fixes (4 commits)

1. **SSR check text** (#371) - Fixed SSR content verification
2. **Product title length & project name** (#358) - Reduced title length for better UX
3. **Mobile layout of fetch example** (#356) - Improved responsive design
4. **Deprecated syntax in buildTest.yml** - Updated GitHub Actions syntax

---

## Updates in `main-ts` Branch (17 commits)

### TypeScript Migration (Complete)

- Converted entire codebase from JavaScript to TypeScript
- Added type definitions for all components, utilities, and APIs
- Created comprehensive type system with interfaces and type guards
- Migrated configuration files (vite.config, tsconfig files)

### Key Changes

1. **File Extensions**: `.js` → `.ts`, `.jsx` → `.tsx`
2. **Type Definitions**: Added interfaces for props, state, API responses
3. **Type Safety**: Strict TypeScript configuration enabled
4. **Build System**: Updated Vite config for TypeScript
5. **Documentation**: Added TypeScript migration plan and removal docs

### Migration Phases Completed

- Phase 1-9: Complete component and utility migration
- Build system updated to TypeScript
- Profile panel enabled
- Hydration fixes for random numbers
- Runtime import type checking

---

## Merge Conflict Analysis

### Test Merge Results

A test merge revealed **2 conflicts**:

#### 1. **CONFLICT**: `src/pages/dashboard/DashboardNumberTiles.jsx`

- **Type**: Modify/Delete conflict
- **Issue**: File deleted in `main-ts` (migrated to `.tsx`) but modified in `main`
- **Resolution**: Keep the TypeScript version (`.tsx`) and apply any changes from `main`

#### 2. **CONFLICT**: `src/pages/welcome/post/PostComponent.tsx`

- **Type**: Content conflict
- **Issue**: Both branches modified this file
- **main-ts changes**:
  - TypeScript conversion with interfaces
  - Import from `message.ts`
  - Added `FC` type and prop interfaces
- **main changes**:
  - Import from `message.js`
  - Added `Grid` component import
  - Updated component structure
- **Resolution**: Merge both sets of changes, keeping TypeScript types and adding Grid import

### Auto-Merged Files (16 files)

These files merged successfully without conflicts:

- `.github/workflows/buildTest.yml`
- `index.html`
- `package-lock.json`
- `package.json`
- `src/components/nav/Nav.tsx`
- `src/pages/dashboard/DashboardURLParameters.tsx`
- `src/pages/dashboard/DashboardVisualizations.tsx`
- `src/pages/welcome/Welcome.tsx`
- `src/pages/welcome/WelcomeAboutSection.tsx`
- `src/pages/welcome/WelcomeCallout.tsx`
- `src/pages/welcome/WelcomeCommandSnippet.tsx`
- `src/pages/welcome/WelcomeFeatureTile.tsx`
- `src/pages/welcome/WelcomeFeaturesSection.tsx`
- `src/pages/welcome/WelcomeFetchingSection.tsx`
- `src/pages/welcome/WelcomeHeader.tsx`
- `src/pages/welcome/WelcomeHighlightTile.tsx`
- `src/pages/welcome/WelcomeRunSection.tsx`

---

## Key Differences in Approach

### VSCode Snippets

- **main**: Uses published `carbon-vscode-snippets` package
- **main-ts**: Has local snippet files with copyright headers
- **Impact**: Snippet files will need to be updated to match `main`'s approach

### Node Version

- **main**: Node v24.13.0
- **main-ts**: Node v24.12.0
- **Impact**: Minor version difference, should update to match `main`

### SSR Testing

- **main**: Added SSR regression test workflow
- **main-ts**: No SSR test workflow
- **Impact**: Need to add SSR test workflow from `main`

### GitHub Actions

- **main**: Updated to modern syntax (`GITHUB_OUTPUT`)
- **main-ts**: Uses deprecated `set-output` syntax
- **Impact**: Already fixed in `main-ts`, but `main` has additional SSR workflow

---

## Merge vs Rebase Recommendation

### ✅ **RECOMMENDED: Merge**

**Reasons:**

1. **Preserves History**: Both branches have significant independent work
2. **Safer**: Less risk of losing changes during conflict resolution
3. **Clearer Intent**: Shows the integration of TypeScript migration with ongoing development
4. **Team Collaboration**: Better for shared branches with multiple contributors

**Command:**

```bash
git checkout main-ts
git merge main
# Resolve conflicts in:
# - src/pages/dashboard/DashboardNumberTiles.jsx (remove, keep .tsx)
# - src/pages/welcome/post/PostComponent.tsx (merge changes)
git add .
git commit
```

### ⚠️ **Alternative: Rebase** (Not Recommended)

**Reasons Against:**

1. **Complex Conflicts**: 17 commits to rebase with potential conflicts in each
2. **History Rewrite**: Would rewrite `main-ts` history
3. **Risk**: Higher chance of introducing bugs during conflict resolution
4. **Time**: More time-consuming with multiple conflict resolution steps

---

## Conflict Resolution Strategy

### Step 1: Handle DashboardNumberTiles

```bash
# After merge conflict appears
git rm src/pages/dashboard/DashboardNumberTiles.jsx
# Ensure the .tsx version exists and has all functionality
```

### Step 2: Resolve PostComponent.tsx

Merge both changes:

- Keep TypeScript types and interfaces from `main-ts`
- Add `Grid` import from `main`
- Update import path to `.ts` (TypeScript)
- Ensure all functionality from both versions is preserved

### Step 3: Update Snippets

- Remove local snippet files
- Add `carbon-vscode-snippets` package dependency
- Update package.json scripts if needed

### Step 4: Update Node Version

```bash
# Update .nvmrc
echo "24.13.0" > .nvmrc
```

### Step 5: Add SSR Test Workflow

- Copy `.github/workflows/ssr-test.yml` from `main`
- Ensure it works with TypeScript build

---

## Post-Merge Validation

After merging, run these checks:

1. **Build Check**

   ```bash
   npm run build
   ```

2. **Type Check**

   ```bash
   npm run type-check
   ```

3. **Linting**

   ```bash
   npm run lint
   ```

4. **Tests**

   ```bash
   npm test
   ```

5. **Dev Server**

   ```bash
   npm run dev
   # Verify all pages load correctly
   ```

6. **SSR Test**
   ```bash
   # Run the new SSR workflow locally or wait for CI
   ```

---

## Risk Assessment

### Low Risk ✅

- Dependency updates (automated, well-tested)
- Auto-merged files (Git handled successfully)
- Node version update (minor version bump)

### Medium Risk ⚠️

- PostComponent.tsx conflict (requires careful merge)
- Snippet package migration (structural change)
- SSR workflow addition (new CI process)

### Mitigation

- Test thoroughly after merge
- Review all conflict resolutions
- Run full test suite
- Manual testing of affected components
- Monitor CI/CD pipelines

---

## Timeline Estimate

- **Conflict Resolution**: 30-60 minutes
- **Testing**: 30-45 minutes
- **Documentation Updates**: 15-30 minutes
- **Total**: 1.5-2.5 hours

---

## Conclusion

**Merging `main` into `main-ts` is feasible and recommended.** The conflicts are manageable and well-understood. The merge will bring important dependency updates, bug fixes, and new features into the TypeScript branch while preserving the complete migration history.

The main challenges are:

1. Resolving the PostComponent.tsx conflict carefully
2. Handling the DashboardNumberTiles file deletion
3. Updating to the new snippets package approach
4. Adding the SSR test workflow

With proper testing and validation, this merge should be successful and result in a stable, up-to-date TypeScript codebase.
