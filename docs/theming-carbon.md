# Theming Carbon

## Technical synopsis

Carbon Design System provides powerful theming capabilities, but implementing a
complete theming solution that covers both your main application content and
global navigation requires careful consideration. Many applications need to
support multiple themes (light, dark, and system preference) while allowing
users to independently control the appearance of different UI regions.

This guide demonstrates a production-ready approach to Carbon theming that
uses CSS custom properties and data attributes to enable flexible theme
switching. The solution includes a user-friendly theme selector component,
respects system preferences via `prefers-color-scheme`, and persists user
choices across sessions using cookies.

> [!NOTE] The implementation described in this guide is inspired by and based
> on the
> [Carbon React Router Starter](https://github.com/carbon-design-system/carbon-react-router-starter)
> repository, which provides a complete, production-ready example of this
> theming approach. The `cs` prefix used throughout the code examples stands for
> "Carbon Starter" and originates from this repository. For the latest
> implementation and additional features, check out the starter repository.

By the end of this guide, you'll understand how to implement a robust theming
system that gives users full control over their visual experience while
maintaining clean, maintainable code that leverages Carbon's built-in theming
tokens.

## Understanding Carbon's theme architecture

Carbon provides four primary built-in themes through SCSS mixins:

- **White** - Pure white backgrounds with the highest contrast
- **g10** (Gray 10) - Light gray backgrounds with dark text
- **g90** (Gray 90) - Dark gray backgrounds with light text
- **g100** (Gray 100) - The darkest theme with pure black backgrounds

> [!NOTE] For this implementation, we use **g10** as our light theme and
> **g100** as our dark theme. This pairing provides excellent contrast and
> readability while offering the most dramatic visual difference between light
> and dark modes. The g10 theme's subtle gray background reduces eye strain
> compared to pure white, while g100's deep blacks work well for dark mode
> enthusiasts.

These themes are applied using the `@include theme()` mixin from Carbon's SCSS
modules. The key to flexible theming is controlling when and where these mixins
are applied based on user preferences.

## Setting up the theme configuration

### Theme structure with SCSS mixins

First we need to build the foundation of our theming system, here we use SCSS
mixins to encapsulate theme-specific styles. Here's how to structure your theme
configuration:

```scss
@use '@carbon/react/scss/theme' as *;
@use '@carbon/react/scss/themes';
@use '@carbon/react/scss/colors' as *;

// Note: Most styling should use theme tokens like $background, $text-primary, etc.
// Direct color tokens (like $blue-30) should be used sparingly and defined for all themes

// Light theme brand customization
@mixin light-brand {
  --cs-brand: #{$blue-30};
  --cs-brand-alt: #{$blue-20};
  --cs-logo-filter: invert(100%);

  background-color: $background;
  color: $text-primary;
}

// Dark theme brand customization
@mixin dark-brand {
  --cs-brand: #{$blue-80};
  --cs-brand-alt: #{$blue-90};
  --cs-logo-filter: initial;

  background-color: $background;
  color: $text-primary;
}

// Base mixin to apply theme and brand styles
@mixin apply-theme($theme: 'light') {
  @if $theme == 'light' {
    @include theme(themes.$g10);
    @include light-brand;
  } @else {
    @include theme(themes.$g100);
    @include dark-brand;
  }
}
```

This approach separates Carbon's core theme tokens from your custom brand
colors, making it easy to maintain and update both independently.

### Data attribute-based theme switching

Instead of using CSS classes for theme switching, we use HTML data attributes on
the root element. This provides several advantages:

1. **No specificity conflicts** - Data attributes don't compete with component
   classes
2. **Server-side rendering friendly** - Attributes can be set before hydration
3. **Clear semantic meaning** - `data-theme-setting` explicitly describes its
   purpose

```scss
// System theme (respects prefers-color-scheme)
$system-selector: ':root:is(:not([data-theme-setting]), [data-theme-setting="system"])';

// Default: light everywhere
#{$system-selector}:not([data-header-inverse='true']) {
  @include apply-theme('light');
}

// System theme with dark preference
@media (prefers-color-scheme: dark) {
  #{$system-selector}:not([data-header-inverse='true']) {
    @include apply-theme('dark');
  }
}

// Explicit light theme
:root[data-theme-setting='light'] {
  @include apply-theme('light');
}

// Explicit dark theme
:root[data-theme-setting='dark'] {
  @include apply-theme('dark');
}
```

## Implementing independent header theming

A common pattern seen in IBM products is the global navigation using a
different, often opposite, theme to the main content. The approach taken here is
to introduce a second data attribute `data-header-inverse` to control this,
automatically applying the contrasting theme.

### Content-scoped theme application

To apply themes to specific regions, we use a helper mixin that targets a
content wrapper:

```scss
@mixin apply-content-theme($theme: 'light') {
  .cs--content {
    @include apply-theme($theme);
  }
}

// Dark header with light content
#{$system-selector}[data-header-inverse='true'] {
  @include apply-theme('dark');
  @include apply-content-theme('light');
}

// System dark mode: light header with dark content
@media (prefers-color-scheme: dark) {
  #{$system-selector}[data-header-inverse='true'] {
    @include apply-theme('light');
    @include apply-content-theme('dark');
  }
}
```

This pattern allows the header (root level) and content area (`.cs--content`
class) to have different themes simultaneously.

### Layout structure

In order to make use of themes applied to `.cs--content` your layouts should
include the content wrapper class:

```jsx
import { Content } from '@carbon/react';
import { Nav } from '../components/nav/Nav';

export const PageLayout = ({ children }) => {
  return (
    <div className="cs--page-layout">
      <Nav />
      <Content className="cs--content cs--page-layout__content">
        {children}
      </Content>
    </div>
  );
};
```

The
[`Content`](https://react.carbondesignsystem.com/?path=/docs/components-ui-shell-content--overview)
component from Carbon provides the proper spacing and structure, while our
`cs--content` class enables theme scoping.

## Building the theme management system

### Cookie-based persistence

Failing to persist a user's theme preferences is not a good move. If you already
have a mechanism for persisting these settings then please use the following to
check you are both supporting the required values and SSR. In this example we
use cookies, permitted as supporting the product feature, to persist the theme
because they work on both client and server:

#### Cookie utility functions

First, we need basic cookie parsing and setting utilities. These handle the
low-level cookie operations with proper encoding and validation:

```javascript
/**
 * Parse cookies from a cookie string (from document.cookie or request headers)
 * @param {string} cookieString - The cookie string to parse
 * @returns {Record<string, string>} Object with cookie name-value pairs
 */
export function parseCookies(cookieString) {
  if (!cookieString) return {};

  return cookieString.split(';').reduce((cookies, cookie) => {
    const trimmed = cookie.trim();
    const equalsIndex = trimmed.indexOf('=');

    if (equalsIndex > 0) {
      const name = trimmed.substring(0, equalsIndex);
      const value = trimmed.substring(equalsIndex + 1);

      if (name && value) {
        try {
          cookies[name] = decodeURIComponent(value);
        } catch {
          // If decoding fails, use the raw value
          cookies[name] = value;
        }
      }
    }
    return cookies;
  }, {});
}

/**
 * Set a cookie (client-side only)
 * @param {string} name - The cookie name
 * @param {string} value - The cookie value
 * @param {object} [options] - Cookie options
 * @param {number} [options.maxAge] - Max age in seconds (default: 1 year)
 * @param {string} [options.path] - Cookie path (default: '/')
 * @param {string} [options.sameSite] - SameSite attribute (default: 'Lax')
 * @param {boolean} [options.secure] - Secure flag (default: false in dev, true in prod)
 */
export function setCookie(name, value, options = {}) {
  if (typeof document === 'undefined') return;

  const {
    maxAge = 31536000, // 1 year in seconds
    path = '/',
    sameSite = 'Lax',
    secure = window.location.protocol === 'https:',
  } = options;

  const encodedValue = encodeURIComponent(value);
  let cookieString = `${name}=${encodedValue}`;
  cookieString += `; Path=${path}`;
  cookieString += `; Max-Age=${maxAge}`;
  cookieString += `; SameSite=${sameSite}`;

  if (secure) {
    cookieString += '; Secure';
  }

  document.cookie = cookieString;
}
```

The `parseCookies()` function handles edge cases like cookies with `=` in their
values and gracefully handles decoding errors. The `setCookie()` function
automatically sets secure cookies in production and uses sensible defaults for
path and expiration.

#### Theme-specific cookie functions

Now we can build theme-specific functions on top of these utilities:

```javascript
/**
 * Get theme values from cookies
 * @param {string} [cookieString] - Optional cookie string (for server-side)
 * @returns {{ themeSetting: string, headerInverse: boolean }}
 */
export function getThemeFromCookies(cookieString) {
  const cookies = cookieString
    ? parseCookies(cookieString)
    : parseCookies(typeof document !== 'undefined' ? document.cookie : '');

  const themeSetting = cookies['theme-setting'] || 'system';
  const headerInverse = cookies['header-inverse'] === 'true';

  // Validate theme setting value
  const validThemeSettings = ['system', 'light', 'dark'];
  const validatedThemeSetting = validThemeSettings.includes(themeSetting)
    ? themeSetting
    : 'system';

  return {
    themeSetting: validatedThemeSetting,
    headerInverse,
  };
}

/**
 * Set theme values in cookies (client-side only)
 * @param {object} values - Theme values to set
 * @param {string} [values.themeSetting] - Theme setting (system, light, dark)
 * @param {boolean} [values.headerInverse] - Header inverse setting
 */
export function setThemeInCookies(values) {
  if (values.themeSetting !== undefined) {
    const validThemeSettings = ['system', 'light', 'dark'];
    if (validThemeSettings.includes(values.themeSetting)) {
      setCookie('theme-setting', values.themeSetting);
    }
  }
  if (values.headerInverse !== undefined) {
    setCookie('header-inverse', String(values.headerInverse));
  }
}
```

### Theme utility functions

Create utility functions to manage theme state and apply changes:

```javascript
/**
 * Update theme setting and apply to HTML
 * @param {string} themeSetting - Theme setting (system, light, dark)
 */
export function setThemeSetting(themeSetting) {
  // Update cookie
  setThemeInCookies({ themeSetting });

  // Update HTML attribute immediately (no re-render needed)
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme-setting', themeSetting);
  }
}

/**
 * Update header inverse setting and apply to HTML
 * @param {boolean} headerInverse - Header inverse setting
 */
export function setHeaderInverse(headerInverse) {
  // Update cookie
  setThemeInCookies({ headerInverse });

  // Update HTML attribute immediately (no re-render needed)
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute(
      'data-header-inverse',
      String(headerInverse),
    );
  }
}
```

These functions update both the cookie (for persistence) and the DOM attribute
(for immediate visual feedback) without requiring a React re-render.

## Creating the theme selector UI

### Using Carbon Labs ThemeSettings component

Carbon Labs provides a ready-to-use theme settings component that integrates
seamlessly with our theming system:

```jsx
import { useState } from 'react';
import {
  ThemeSettings,
  ThemeMenuComplement,
  ThemeSwitcher,
} from '@carbon-labs/react-theme-settings';
import {
  getThemeSettings,
  setThemeSetting,
  setHeaderInverse,
} from '../../utils/theme';

export const ProfilePanel = ({ user }) => {
  // Get initial values from cookies (single call to avoid redundant parsing)
  const initialSettings = getThemeSettings();

  const [themeSettingLocal, setThemeSettingLocal] = useState(
    initialSettings.themeSetting,
  );

  const [themeMenuComplementLocal, setThemeMenuComplementLocal] = useState(
    initialSettings.headerInverse,
  );

  // Update theme setting
  const handleThemeSettingChange = (value) => {
    setThemeSettingLocal(value);
    setThemeSetting(value);
  };

  // Update header inverse
  const handleThemeMenuComplementChange = (value) => {
    setThemeMenuComplementLocal(value);
    setHeaderInverse(value);
  };

  return (
    <div className="cs--profile-panel">
      <UserProfile user={user} />

      <div className="cs--profile-settings">
        <ThemeSettings>
          <ThemeSwitcher
            onChange={handleThemeSettingChange}
            value={themeSettingLocal}
          />
          <ThemeMenuComplement
            id="theme-menu-complement"
            labelText="Complement menu theme"
            checked={themeMenuComplementLocal}
            onChange={handleThemeMenuComplementChange}
          />
        </ThemeSettings>
      </div>
    </div>
  );
};
```

The
[`ThemeSwitcher`](https://github.com/carbon-design-system/carbon-labs/tree/main/packages/react/src/components/ThemeSettings)
component provides radio buttons for System, Light, and Dark themes, while
[`ThemeMenuComplement`](https://github.com/carbon-design-system/carbon-labs/tree/main/packages/react/src/components/ThemeSettings)
is a toggle that controls the header inverse setting.

### Integrating with navigation

Place the theme selector in a convenient location, such as a user profile panel:

```jsx
import { useState } from 'react';
import {
  Header,
  HeaderPanel,
  HeaderGlobalAction,
  HeaderGlobalBar,
} from '@carbon/react';
import { UserAvatar } from '@carbon/icons-react';
import { ProfilePanel } from '../profilePanel/ProfilePanel';

export const Nav = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const currentUser = {
    name: 'Anne Profile',
    email: 'anne.profile@ibm.com',
  };

  return (
    <Header aria-label="Application">
      {/* Other header content */}

      <HeaderGlobalBar>
        <HeaderGlobalAction
          aria-label="User profile"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <UserAvatar size={20} />
        </HeaderGlobalAction>
      </HeaderGlobalBar>

      <HeaderPanel expanded={isProfileOpen}>
        {isProfileOpen && <ProfilePanel user={currentUser} />}
      </HeaderPanel>
    </Header>
  );
};
```

## System theme integration

### Respecting user preferences

The system theme option automatically respects the user's operating system
preference using the `prefers-color-scheme` media query. This is handled
entirely in CSS:

```scss
@media (prefers-color-scheme: dark) {
  #{$system-selector}:not([data-header-inverse='true']) {
    @include apply-theme('dark');
  }
}
```

When a user selects "System" in the theme switcher, the application will:

1. Use light theme by default
2. Switch to dark theme if the OS is set to dark mode
3. Automatically update when the OS theme changes (no JavaScript required)

### Initialization on page load

To ensure themes are applied correctly on initial page load and during
server-side rendering, we need to handle potential hydration mismatches. This
occurs when cookies change between server-side rendering and client-side
hydration:

```javascript
/**
 * Initialize theme on page load (sync HTML attributes with cookies)
 * Call this once when the app starts
 * Only updates attributes if they're not already set by SSR
 */
export function initializeTheme() {
  if (typeof document === 'undefined') return;

  const { themeSetting, headerInverse } = getThemeSettings();

  // Get current attributes set by SSR
  const currentThemeSetting =
    document.documentElement.getAttribute('data-theme-setting');
  const currentHeaderInverse = document.documentElement.getAttribute(
    'data-header-inverse',
  );

  // Only update if attributes are missing OR if cookies have changed since SSR
  // This prevents hydration mismatch while allowing cookie updates to take effect
  if (!currentThemeSetting) {
    document.documentElement.setAttribute('data-theme-setting', themeSetting);
  } else if (currentThemeSetting !== themeSetting) {
    // Cookie changed between SSR and hydration - log warning but don't update
    // to avoid hydration mismatch. The next navigation will use the new value.
    console.warn(
      'Theme cookie changed between SSR and hydration. ' +
        'Change will take effect on next navigation.',
    );
  }

  if (!currentHeaderInverse) {
    document.documentElement.setAttribute(
      'data-header-inverse',
      String(headerInverse),
    );
  } else if (currentHeaderInverse !== String(headerInverse)) {
    // Cookie changed between SSR and hydration - log warning but don't update
    console.warn(
      'Header inverse cookie changed between SSR and hydration. ' +
        'Change will take effect on next navigation.',
    );
  }
}
```

> [!WARNING] **Hydration Mismatch Prevention** The `initializeTheme` function
> deliberately avoids updating attributes if they differ from cookie values.
> This prevents React hydration errors when cookies change between SSR and
> client-side hydration. The warning messages help developers identify when this
> occurs, and the changes will take effect on the next page navigation.

Call this function in your application entry point:

```javascript
import { initializeTheme } from './utils/theme';

// Initialize theme on app start
initializeTheme();
```

## Complete implementation example

Here's how all the pieces fit together in a complete application:

### 1. Theme SCSS (`src/index.scss`)

```scss
@use '@carbon/react' with (
  $font-path: '@ibm/plex',
  $font-display: 'block'
);
@use '@carbon/react/scss/theme' as *;
@use '@carbon/react/scss/themes';
@use '@carbon-labs/react-theme-settings/scss/theme-settings';

// Brand mixins
@mixin light-brand {
  --cs-brand: #{$blue-30};
  background-color: $background;
  color: $text-primary;
}

@mixin dark-brand {
  --cs-brand: #{$blue-80};
  background-color: $background;
  color: $text-primary;
}

// Theme application
@mixin apply-theme($theme: 'light') {
  @if $theme == 'light' {
    @include theme(themes.$g10);
    @include light-brand;
  } @else {
    @include theme(themes.$g100);
    @include dark-brand;
  }
}

// System theme
$system-selector: ':root:is(:not([data-theme-setting]), [data-theme-setting="system"])';

#{$system-selector}:not([data-header-inverse='true']) {
  @include apply-theme('light');
}

@media (prefers-color-scheme: dark) {
  #{$system-selector}:not([data-header-inverse='true']) {
    @include apply-theme('dark');
  }
}

// Explicit themes
:root[data-theme-setting='light'] {
  @include apply-theme('light');
}

:root[data-theme-setting='dark'] {
  @include apply-theme('dark');
}
```

### 2. Cookie Utilities (`src/utils/cookies.js`)

```javascript
/**
 * Parse cookies from a cookie string
 * @param {string} cookieString - The cookie string to parse
 * @returns {Record<string, string>} Object with cookie name-value pairs
 */
export function parseCookies(cookieString) {
  if (!cookieString) return {};

  return cookieString.split(';').reduce((cookies, cookie) => {
    const trimmed = cookie.trim();
    const equalsIndex = trimmed.indexOf('=');

    if (equalsIndex > 0) {
      const name = trimmed.substring(0, equalsIndex);
      const value = trimmed.substring(equalsIndex + 1);

      if (name && value) {
        try {
          cookies[name] = decodeURIComponent(value);
        } catch {
          cookies[name] = value;
        }
      }
    }
    return cookies;
  }, {});
}

/**
 * Set a cookie (client-side only)
 * @param {string} name - The cookie name
 * @param {string} value - The cookie value
 * @param {object} [options] - Cookie options
 */
export function setCookie(name, value, options = {}) {
  if (typeof document === 'undefined') return;

  const {
    maxAge = 31536000, // 1 year
    path = '/',
    sameSite = 'Lax',
    secure = window.location.protocol === 'https:',
  } = options;

  const encodedValue = encodeURIComponent(value);
  let cookieString = `${name}=${encodedValue}`;
  cookieString += `; Path=${path}`;
  cookieString += `; Max-Age=${maxAge}`;
  cookieString += `; SameSite=${sameSite}`;

  if (secure) {
    cookieString += '; Secure';
  }

  document.cookie = cookieString;
}

/**
 * Get theme values from cookies
 * @param {string} [cookieString] - Optional cookie string (for server-side)
 * @returns {{ themeSetting: string, headerInverse: boolean }}
 */
export function getThemeFromCookies(cookieString) {
  const cookies = cookieString
    ? parseCookies(cookieString)
    : parseCookies(typeof document !== 'undefined' ? document.cookie : '');

  const themeSetting = cookies['theme-setting'] || 'system';
  const headerInverse = cookies['header-inverse'] === 'true';

  const validThemeSettings = ['system', 'light', 'dark'];
  const validatedThemeSetting = validThemeSettings.includes(themeSetting)
    ? themeSetting
    : 'system';

  return {
    themeSetting: validatedThemeSetting,
    headerInverse,
  };
}

/**
 * Set theme values in cookies (client-side only)
 * @param {object} values - Theme values to set
 * @param {string} [values.themeSetting] - Theme setting (system, light, dark)
 * @param {boolean} [values.headerInverse] - Header inverse setting
 */
export function setThemeInCookies(values) {
  if (values.themeSetting !== undefined) {
    const validThemeSettings = ['system', 'light', 'dark'];
    if (validThemeSettings.includes(values.themeSetting)) {
      setCookie('theme-setting', values.themeSetting);
    }
  }
  if (values.headerInverse !== undefined) {
    setCookie('header-inverse', String(values.headerInverse));
  }
}
```

### 3. Theme Utilities (`src/utils/theme.js`)

```javascript
import { getThemeFromCookies, setThemeInCookies } from './cookies.js';

export function getThemeSettings() {
  return getThemeFromCookies();
}

export function setThemeSetting(themeSetting) {
  setThemeInCookies({ themeSetting });
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme-setting', themeSetting);
  }
}

export function setHeaderInverse(headerInverse) {
  setThemeInCookies({ headerInverse });
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute(
      'data-header-inverse',
      String(headerInverse),
    );
  }
}

export function initializeTheme() {
  if (typeof document === 'undefined') return;

  const { themeSetting, headerInverse } = getThemeSettings();

  // Get current attributes set by SSR
  const currentThemeSetting =
    document.documentElement.getAttribute('data-theme-setting');
  const currentHeaderInverse = document.documentElement.getAttribute(
    'data-header-inverse',
  );

  // Only update if attributes are missing OR if cookies have changed since SSR
  // This prevents hydration mismatch while allowing cookie updates to take effect
  if (!currentThemeSetting) {
    document.documentElement.setAttribute('data-theme-setting', themeSetting);
  } else if (currentThemeSetting !== themeSetting) {
    // Cookie changed between SSR and hydration - log warning but don't update
    // to avoid hydration mismatch. The next navigation will use the new value.
    console.warn(
      'Theme cookie changed between SSR and hydration. ' +
        'Change will take effect on next navigation.',
    );
  }

  if (!currentHeaderInverse) {
    document.documentElement.setAttribute(
      'data-header-inverse',
      String(headerInverse),
    );
  } else if (currentHeaderInverse !== String(headerInverse)) {
    // Cookie changed between SSR and hydration - log warning but don't update
    console.warn(
      'Header inverse cookie changed between SSR and hydration. ' +
        'Change will take effect on next navigation.',
    );
  }
}
```

### 4. Profile Panel Component

```jsx
import classNames from 'classnames';
import { useState } from 'react';
import { UserAvatar } from '@carbon/ibm-products';
import {
  ThemeSettings,
  ThemeMenuComplement,
  ThemeSwitcher,
} from '@carbon-labs/react-theme-settings';
import {
  getThemeSettings,
  setThemeSetting,
  setHeaderInverse,
} from '../../utils/theme';

export const ProfilePanel = ({ className }) => {
  // Get initial values from cookies (single call to avoid redundant parsing)
  const initialSettings = getThemeSettings();

  const [themeSettingLocal, setThemeSettingLocal] = useState(
    initialSettings.themeSetting,
  );

  const [themeMenuComplementLocal, setThemeMenuComplementLocal] = useState(
    initialSettings.headerInverse,
  );

  // Update theme setting
  const handleThemeSettingChange = (value) => {
    setThemeSettingLocal(value);
    setThemeSetting(value);
  };

  // Update header inverse
  const handleThemeMenuComplementChange = (value) => {
    setThemeMenuComplementLocal(value);
    setHeaderInverse(value);
  };

  const userProfile = {
    name: 'Anne Profile',
    email: 'anne.profile@ibm.com',
  };

  return (
    <div className={classNames(className, 'cs--profile-panel')}>
      <div className="cs--profile-user-info">
        <UserAvatar
          name={userProfile.name}
          renderIcon=""
          size="lg"
          tooltipAlignment="bottom"
        />
        <div className="cds--profile-user-info__text-wrapper">
          <div className="cds--profile-user-info__name">{userProfile.name}</div>
          <div className="cds--profile-user-info__email">
            {userProfile.email}
          </div>
        </div>
      </div>

      <div className="cs--profile-settings">
        <ThemeSettings>
          <ThemeSwitcher
            onChange={handleThemeSettingChange}
            value={themeSettingLocal}
          />
          <ThemeMenuComplement
            id="theme-menu-complement"
            labelText="Complement menu theme"
            checked={themeMenuComplementLocal}
            onChange={handleThemeMenuComplementChange}
          />
        </ThemeSettings>
      </div>
    </div>
  );
};
```

## Key benefits of this approach

This theming implementation provides several significant advantages:

**Performance**: Theme changes happen instantly via CSS without React
re-renders. The data attribute approach means the browser can apply new styles
immediately when attributes change.

**Flexibility**: Users can independently control the main content theme and
header theme, enabling combinations like a dark header with light content or
vice versa.

**System Integration**: The system theme option respects OS preferences
automatically through CSS media queries, with no JavaScript polling required.

**Persistence**: Cookie-based storage ensures theme preferences survive page
refreshes and work across server-side and client-side rendering.

**Maintainability**: SCSS mixins encapsulate theme logic, making it easy to add
new themes or modify existing ones without touching component code.

**Accessibility**: All theme changes are semantic and work with assistive
technologies. The Carbon Labs components include proper ARIA labels and keyboard
navigation.

## Conclusion

Implementing comprehensive theming in Carbon React applications requires careful
coordination between CSS, JavaScript, and React components. By using data
attributes for theme control, SCSS mixins for theme definitions, and cookies for
persistence, you can create a robust theming system that provides users with
full control over their visual experience.

The combination of Carbon's built-in theme tokens, Carbon Labs' theme settings
components, and custom utility functions creates a maintainable solution that
scales well as your application grows. Whether you're building a new application
or adding theming to an existing one, this approach provides a solid foundation
that respects user preferences while maintaining clean, performant code.

For a complete, working implementation of this theming system, explore the
[Carbon React Router Starter](https://github.com/carbon-design-system/carbon-react-router-starter)
repository. It includes all the code from this guide plus additional features
like routing, internationalization, and more comprehensive examples. The starter
serves as an excellent foundation for new Carbon React projects or as a
reference for adding theming to existing applications.

Start by implementing the basic theme switching, then add the header inverse
feature once you're comfortable with the core concepts. Your users will
appreciate the flexibility, and your development team will appreciate the
maintainable architecture.
