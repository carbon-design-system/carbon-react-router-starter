# Converting from TypeScript to JavaScript

## Overview

This guide provides step-by-step instructions for converting this Carbon React Router Starter template from TypeScript to JavaScript. The conversion process leverages TypeScript's own compiler to strip type annotations, ensuring accuracy and completeness.

## Prerequisites

- Node.js 24 (as specified in `.nvmrc`)
- npm
- Git (recommended for preserving file history)

## Step-by-Step Instructions

### 1. Use TypeScript Compiler to Strip Type Annotations

The most reliable method is using TypeScript's compiler to automatically remove all type annotations.

Create a temporary `tsconfig.build.json` in the project root:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./js-output",
    "declaration": false,
    "declarationMap": false,
    "removeComments": false,
    "noEmit": false,
    "allowJs": true,
    "checkJs": false
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

Run the TypeScript compiler:

```bash
npx tsc --project tsconfig.build.json
```

This creates JavaScript files in `js-output/src/` with all type annotations cleanly removed.

### 2. Replace Source Files

After TypeScript has stripped the types:

```bash
# Backup original TypeScript files (optional but recommended)
mkdir ../ts-backup
cp -r src ../ts-backup/

# Replace with converted JavaScript files
rm -rf src
mv js-output/src src

# Clean up
rm tsconfig.build.json
rm -rf js-output
```

### 3. Rename File Extensions

The TypeScript compiler outputs `.js` files, but React component files should use `.jsx` extension.

**Option A: Automated (Unix/Linux/macOS):**

```bash
# Find and rename all React component files to .jsx
find src -type f -name "*.js" -exec sh -c '
  if grep -q "import.*react\|from.*react\|<.*>" "$1" 2>/dev/null; then
    mv "$1" "${1%.js}.jsx"
  fi
' _ {} \;
```

**Option B: Manual Renaming**

Rename these files from `.js` to `.jsx`:

- `src/entry-client.js` → `src/entry-client.jsx`
- `src/entry-server.js` → `src/entry-server.jsx`
- `src/routes/index.js` → `src/routes/index.jsx`
- All component files in `src/components/`
- All page files in `src/pages/`
- All layout files in `src/layouts/`
- Test files with JSX: `src/__tests__/*.test.js` → `src/__tests__/*.test.jsx`
- `src/test/test-utils.js` → `src/test/test-utils.jsx`

### 4. Rename Configuration Files

```bash
mv vite.config.ts vite.config.js
```

### 5. Delete TypeScript-Specific Files

```bash
rm tsconfig.json tsconfig.node.json
```

### 6. Update Package.json Scripts

In `package.json`, update these scripts:

```json
{
  "scripts": {
    "dev": "node src/server.js",
    "build": "npm run build:client && npm run build:server",
    "build:server": "vite build --ssr src/entry-server.jsx --outDir dist/server",
    "preview": "cross-env NODE_ENV=local node src/server.js"
  }
}
```

**Remove** the `type-check` script entirely.

### 7. Update ESLint Configuration

In `eslint.config.mjs`, make the following changes:

**Remove TypeScript imports:**

```javascript
// DELETE these lines:
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
```

**Update the configuration:**

```javascript
export default [
  { ignores: ['dist', 'vite.config.js', '*.config.js'] },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'], // Changed from ts,tsx
    ignores: ['dist', 'vite.config.js', '*.config.js'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.jest },
      // REMOVE: parser: tsparser,
      parserOptions: {
        ecmaVersion: 2022,
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx'], // Changed from .ts, .tsx
        },
      },
    },
    // REMOVE entire plugins section with @typescript-eslint
  },
  importPlugin.flatConfigs.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  pluginReactHooks.configs.flat.recommended,
  pluginReactRefresh.configs.vite,
  eslintPluginJsxA11y.flatConfigs.recommended,
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
  {
    rules: {
      ...pluginJs.configs.recommended.rules,
      'import/named': 'off',
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^[A-Z_]',
          argsIgnorePattern: '^_',
        },
      ],
      // REMOVE: '@typescript-eslint/no-unused-vars'
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-irregular-whitespace': ['error', { skipJSXText: true }],
      'import/namespace': 'off',
      'import/no-unresolved': 'off',
    },
  },
];
```

### 8. Update lint-staged Configuration

In `package.json`, update the lint-staged section:

```json
{
  "lint-staged": {
    "*.{js,jsx}": "eslint --cache --report-unused-disable-directives --max-warnings 0 --no-warn-ignored",
    ".npmrc": "node -e \"console.error('Are you sure you want to commit .npmrc?'); process.exit(1);\""
  }
}
```

### 9. Remove TypeScript Dependencies

```bash
npm uninstall typescript @types/node @types/react @types/react-dom @types/compression @types/express @typescript-eslint/eslint-plugin @typescript-eslint/parser tsx
```

### 10. Clean and Reinstall

```bash
rm -rf node_modules package-lock.json
npm install
```

### 11. Manual Cleanup (If Needed)

Review the converted code for:

- **Import statements**: Remove any remaining `import type` statements
- **File extensions in imports**: Update imports to use `.jsx` where applicable
- **JSDoc comments**: TypeScript may add some JSDoc comments - keep or remove as preferred

### 12. Test the Conversion

```bash
# Run linting
npm run lint

# Run tests
npm test

# Start development server
npm run dev

# Build for production
npm run build
```

## Using JSDoc for Type Documentation

Since PropTypes is deprecated in React 19, use JSDoc comments for type documentation and IDE support.

### Basic JSDoc Examples

**Function parameters and return types:**

```javascript
/**
 * Calculates the sum of two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} The sum
 */
function add(a, b) {
  return a + b;
}
```

**React component props:**

```javascript
/**
 * @typedef {Object} ButtonProps
 * @property {string} label - Button text
 * @property {() => void} onClick - Click handler
 * @property {'primary' | 'secondary'} [variant='primary'] - Button style variant
 * @property {boolean} [disabled=false] - Whether button is disabled
 */

/**
 * A reusable button component
 * @param {ButtonProps} props
 */
function Button({ label, onClick, variant = 'primary', disabled = false }) {
  return (
    <button onClick={onClick} disabled={disabled} className={`btn-${variant}`}>
      {label}
    </button>
  );
}
```

**Complex types:**

```javascript
/**
 * @typedef {Object} RouteConfig
 * @property {string} [path] - Route path
 * @property {boolean} [index] - Is index route
 * @property {React.ComponentType} [element] - Component to render
 * @property {number} [status] - HTTP status code
 */

/**
 * Configure application routes
 * @param {RouteConfig[]} routes - Array of route configurations
 * @returns {void}
 */
function configureRoutes(routes) {
  // Implementation
}
```

**Array and object types:**

```javascript
/**
 * Process data with various types
 * @param {Array<string>} items - Array of strings
 * @param {Object.<string, number>} scores - Object with string keys and number values
 * @param {Record<string, any>} config - Generic configuration object
 */
function processData(items, scores, config) {
  // Implementation
}
```

### JSDoc Benefits

1. **IDE Support**: Full autocomplete and type checking in VS Code and other modern editors
2. **No Runtime Cost**: Zero runtime overhead (unlike PropTypes)
3. **Modern Standard**: Widely adopted in JavaScript projects
4. **TypeScript Compatible**: Can be read by TypeScript for type checking without compilation
5. **Documentation**: Serves as inline documentation for developers

## Optional: Enable Type Checking with JSDoc

You can enable VS Code type checking on JavaScript files without TypeScript compilation.

Create a `jsconfig.json` in the project root:

```json
{
  "compilerOptions": {
    "checkJs": true,
    "strict": true,
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

This enables TypeScript-level type checking using JSDoc annotations, giving you many benefits of TypeScript without the compilation step.

## Why This Approach Works

1. **Accuracy**: TypeScript compiler knows exactly how to remove type annotations without breaking code
2. **Speed**: Automated conversion is much faster than manual file-by-file editing
3. **Safety**: Reduces human error in removing types
4. **Completeness**: Handles edge cases and complex type syntax automatically
5. **Built-in**: Uses tools you already have installed (TypeScript)

## Troubleshooting

### Build Errors After Conversion

- Verify all `.jsx` files are properly renamed
- Check that all imports reference the correct file extensions
- Ensure `vite.config.js` is properly renamed from `.ts`

### ESLint Errors

- Confirm all TypeScript-related plugins are removed from `eslint.config.mjs`
- Verify file patterns only include `.js` and `.jsx` extensions
- Clear ESLint cache: `rm -rf node_modules/.cache/eslint/`

### Import Resolution Issues

- Update import statements to include `.jsx` extension where needed
- Verify `import/resolver` settings in ESLint config only reference `.js` and `.jsx`

## Notes

- **Git History**: Use `git mv` instead of `mv` to preserve file history during renames
- **Backup**: Always backup your TypeScript source before conversion
- **Testing**: Thoroughly test after conversion to ensure no runtime issues
- **JSDoc**: Modern replacement for PropTypes with better IDE support and no runtime cost
- **Incremental**: You can convert specific directories first if needed for a gradual migration

## Reverting to TypeScript

If you need to revert to TypeScript, refer to the `TypeScript-Migration-Plan.md` document which details the original conversion from JavaScript to TypeScript.
