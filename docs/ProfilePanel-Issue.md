# ProfilePanel Component Issue - @carbon-labs/react-theme-settings

**Status**: ✅ RESOLVED
**Date Identified**: 2025-01-19
**Date Resolved**: 2026-01-07
**Related to**: TypeScript Migration (Phase 3)

## Issue Summary

~~The ProfilePanel component has been temporarily disabled due to a module import error with the `@carbon-labs/react-theme-settings` package when running the application with TypeScript and Vite's development server.~~

**UPDATE 2026-01-07**: Issue has been resolved. The ProfilePanel now works correctly with `@carbon-labs/react-theme-settings` v0.18.0 and React 19.

## Technical Details

### Error Description

When the ProfilePanel component attempts to load, the `@carbon-labs/react-theme-settings` package fails to import properly, causing a runtime error in the browser.

### Affected Files

- [`src/components/profilePanel/ProfilePanel.jsx`](../src/components/profilePanel/ProfilePanel.jsx) - Component implementation
- [`src/components/nav/Nav.jsx`](../src/components/nav/Nav.jsx) - Component usage (currently commented out)

### Resolution

The ProfilePanel component has been re-enabled and is fully functional. The issue was resolved through:

1. Updates to `@carbon-labs/react-theme-settings` package (v0.18.0)
2. Proper SSR handling in the TypeScript migration
3. React 19 compatibility improvements

```javascript
// In Nav.jsx - ProfilePanel is now active
import ProfilePanel from '../profilePanel/ProfilePanel';
const [isProfileOpen, setIsProfileOpen] = useState(false);
```

### Environment Context

- **Package**: `@carbon-labs/react-theme-settings` v0.16.0
- **Carbon React**: `@carbon/react` v1.73.0
- **React**: v19.0.0
- **Vite**: v7.x
- **TypeScript**: v5.x
- **Build Tool**: tsx for Node.js TypeScript execution

### Suspected Root Cause

The package appears to have an ES module compatibility issue, specifically related to importing `usePrefix` from `@carbon/react`. This may be due to:

1. Incorrect export configuration in the package
2. Incompatibility with Vite's ES module resolution
3. Version mismatch between `@carbon-labs/react-theme-settings` and `@carbon/react`

## Investigation Steps

### 1. Check Carbon Labs Repository

Search the repository for related issues:

```
repo:carbon-design-system/carbon-labs is:issue react-theme-settings
```

### 2. Verify Package Compatibility

- Check if `@carbon-labs/react-theme-settings` v0.16.0 is compatible with `@carbon/react` v1.73.0
- Review the package's peer dependencies
- Check for any known issues with React 19 or Vite 7

### 3. Review Package Source

If repository access is available:

- Check how the package imports from `@carbon/react`
- Look for `usePrefix` usage in the source code
- Review the package's build configuration

### 4. Test Isolation

Create a minimal reproduction case:

```jsx
import { ThemeSettings } from '@carbon-labs/react-theme-settings';

function TestComponent() {
  return <ThemeSettings />;
}
```

## Resolution Options

### Option 1: Update Package Version (Recommended if available)

If a newer version of `@carbon-labs/react-theme-settings` is available that fixes the issue:

```bash
npm update @carbon-labs/react-theme-settings
```

Then restore the ProfilePanel:

1. Uncomment imports in `Nav.jsx`
2. Uncomment state management
3. Uncomment HeaderGlobalAction
4. Test in browser

### Option 2: Implement Custom Theme Switcher

Replace the Carbon Labs component with a custom implementation:

```jsx
// Custom theme switcher using Carbon components
import { Toggle } from '@carbon/react';
import { useThemeContext } from '../../context/ThemeContext';

function CustomThemeSwitcher() {
  const { themeSetting, setThemeSetting } = useThemeContext();

  return (
    <Toggle
      id="theme-toggle"
      labelText="Dark mode"
      toggled={themeSetting === 'dark'}
      onToggle={(checked) => setThemeSetting(checked ? 'dark' : 'light')}
    />
  );
}
```

**Advantages**:

- No dependency on experimental Carbon Labs package
- Full control over implementation
- Better maintainability
- Guaranteed compatibility with current stack

### Option 3: Downgrade or Fork

- Try an older version of the package
- Fork and fix the export issue locally
- Submit a PR to Carbon Labs if issue is confirmed

## Restoration Checklist

Once the issue is resolved, follow these steps to restore the ProfilePanel:

### 1. Verify Fix

- [ ] Confirm package update or alternative solution is available
- [ ] Test in isolation that the component loads without errors

### 2. Restore Code

- [ ] Uncomment ProfilePanel import in `Nav.jsx` (line 32)
- [ ] Uncomment `isProfileOpen` state (line 42)
- [ ] Uncomment HeaderGlobalAction for profile (search for "UserAvatar" in Nav.jsx)
- [ ] Restore any other commented ProfilePanel-related code

### 3. Test Functionality

- [ ] Run `npm run dev`
- [ ] Open browser at http://localhost:5173
- [ ] Click the user avatar icon in the header
- [ ] Verify ProfilePanel opens correctly
- [ ] Test theme switching functionality
- [ ] Test menu complement toggle
- [ ] Verify no console errors

### 4. Run Full Test Suite

```bash
npm run type-check  # TypeScript compilation
npm test            # Unit tests
npm run lint        # Linting
```

### 5. Update Documentation

- [ ] Remove this issue document or mark as resolved
- [ ] Update TypeScript migration plan
- [ ] Add any lessons learned to project documentation

## Impact Assessment

### Current Impact

- **Severity**: Low
- **User Impact**: Theme switching via ProfilePanel is unavailable
- **Workaround**: Theme can still be changed via system preferences (ThemeContext respects system theme)
- **Core Functionality**: Unaffected - all routing, pages, and other components work normally

### Migration Impact

- **TypeScript Migration**: Can proceed without this component
- **Testing**: All other tests pass (33/33)
- **Development**: No blocker for continued development

## Related Files

### Modified Files

- `src/components/nav/Nav.jsx` - ProfilePanel usage commented out
- `src/entry-server.tsx` - Added ThemeProvider for SSR
- `src/utils/local-storage.ts` - Added browser checks for SSR

### Unmodified Files (Ready for Restoration)

- `src/components/profilePanel/ProfilePanel.jsx` - Component implementation intact
- `src/components/profilePanel/profile-panel.scss` - Styles intact
- `src/__tests__/ProfilePanel.test.jsx` - Tests intact (currently passing)

## Additional Notes

### Why Tests Still Pass

The ProfilePanel tests pass because they:

1. Import the component directly (not through Nav.jsx)
2. Use a test environment that may handle imports differently
3. Mock or stub the problematic imports

### Alternative Packages

If `@carbon-labs/react-theme-settings` cannot be fixed, consider:

- Building a custom theme switcher with Carbon components
- Using Carbon's built-in theme utilities directly
- Exploring other Carbon-compatible theme management solutions

## Contact & Resources

- **Carbon Labs Repository**: https://github.com/carbon-design-system/carbon-labs
- **Carbon Design System**: https://carbondesignsystem.com/
- **Issue Tracking**: Document any findings in project issue tracker

---

**Last Updated**: 2026-01-07
**Status**: ✅ RESOLVED - ProfilePanel fully functional
**Next Steps**: Migrate ProfilePanel to TypeScript in Phase 5
