# Contributing to carbon-react-starter

Thank you for your interest in contributing to this project. We welcome contributions from the community and appreciate your support.

## Table of contents

- [Get started](#get-started)
- [Development workflow](#development-workflow)
- [Code standards](#code-standards)
- [Testing](#testing)
- [Pull request guidelines](#pull-request-guidelines)
- [Report issues](#report-issues)
- [License](#license)

## Get started

### Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js 24.14.1** (managed via nvm)
- **npm 11.11.0** (specified in package.json)
- **Git**

### Set up your environment

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/your-username/carbon-react-router-starter.git
   cd carbon-react-router-starter
   ```

2. **Install the correct Node.js version**

   This project uses [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions. The `.nvmrc` file specifies the required version.

   ```bash
   # Install the Node.js version (only needed once)
   nvm install

   # Use the correct Node.js version (run this before npm commands)
   nvm use
   ```

   **Important:** Run `nvm use` each time you open a new terminal session in this repository to use the correct Node.js version.

3. **Install dependencies**

   ```bash
   # For normal local setup and CI - clean install from package-lock.json
   npm ci
   ```

   **Note:** Use `npm ci` for regular development work. Only use `npm install` when you intentionally add or update dependencies.

### Run the development server

Start the development server:

```bash
npm run dev
```

The application opens at the URL shown in your terminal (typically `http://localhost:3000`).

### Build for production

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
# Without compression
npm run preview

# With compression (recommended for performance testing)
npm run preview:prod
```

## Development workflow

### Make changes

1. **Create a new branch** for your feature or bug fix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

   Use descriptive branch names:
   - `feature/` for new features
   - `fix/` for bug fixes
   - `docs/` for documentation changes
   - `refactor/` for code refactoring

2. **Make your changes** following the [Code standards](#code-standards)

3. **Test your changes** thoroughly using the available test commands

4. **Commit your changes** with clear, descriptive commit messages:

   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

   Follow [Conventional Commits](https://www.conventionalcommits.org/) format:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `style:` for formatting changes
   - `refactor:` for code refactoring
   - `test:` for adding or updating tests
   - `chore:` for maintenance tasks

### Versioning and releases

This project uses automated versioning based on commit messages. See [versioning guide](./versioning.md) for comprehensive documentation.

Your commit type determines the version bump:

| Commit type        | Version bump          | Example                       |
| ------------------ | --------------------- | ----------------------------- |
| `feat:`            | Minor (0.4.0 → 0.5.0) | `feat: add user profile page` |
| `fix:`             | Patch (0.4.0 → 0.4.1) | `fix: resolve navigation bug` |
| `BREAKING CHANGE:` | Major (0.4.0 → 1.0.0) | See versioning guide          |

Other commit types (`docs:`, `style:`, `test:`, `chore:`, `ci:`, `build:`) don't trigger releases.

### Manage dependencies

- **Add or update dependencies:** Use `npm install <package-name>` when you need to add or update a package
- **Commit dependency changes:** If you modify `package.json`, you **must** commit the corresponding `package-lock.json` changes in the same pull request
- **Never commit `.npmrc`:** The project has safeguards to prevent accidental commits of `.npmrc` files

### Pre-commit hooks

This project uses [Husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/lint-staged/lint-staged) to run checks before commits:

- Copyright headers are automatically checked and fixed
- Linting runs on staged files
- Code formatting is applied automatically

If the pre-commit hook fails, fix the issues and try committing again.

## Code standards

This project maintains high code quality standards using automated tools.

### Linting and formatting

Run all linters:

```bash
npm run lint
```

This command runs:

- **ESLint** - JavaScript/JSX code quality
- **Stylelint** - SCSS/CSS code quality
- **Prettier** - Code formatting
- **CSpell** - Spell checking

Auto-fix linting issues where possible:

```bash
npm run lint-fix
```

Run individual linters:

```bash
npm run lint:es        # ESLint only
npm run lint:style     # Stylelint only
npm run lint:format    # Prettier only
npm run lint:spell     # CSpell only
```

### Code style guidelines

- **JavaScript/JSX:** Follow the ESLint configuration defined in [`eslint.config.js`](./eslint.config.js)
- **SCSS/CSS:** Follow the Stylelint configuration defined in [`.stylelintrc.json`](./.stylelintrc.json). See [docs/stylelint.md](./docs/stylelint.md) for detailed guidance
- **Formatting:** Prettier handles code formatting automatically based on [`prettier.config.js`](./prettier.config.js)
- **Accessibility:** Follow accessibility best practices enforced by `eslint-plugin-jsx-a11y` and `@double-great/stylelint-a11y`

### Copyright headers

All script and style files (`.js`, `.ts`, `.jsx`, `.tsx`, `.css`, `.scss`) must include a copyright header:

```javascript
/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
```

The pre-commit hook automatically adds or updates copyright headers. For modified files, the year range is updated (e.g., `2020, 2026`).

### File organization

- **Components:** Place in `src/components/` with a dedicated folder for each component
- **Pages:** Place in `src/pages/` with a dedicated folder for each page
- **Utilities:** Place in `src/utils/`
- **Tests:** Place in `src/__tests__/` with the naming pattern `*.test.jsx`
- **Styles:** Co-locate SCSS files with their components

## Testing

This project uses [Vitest](https://vitest.dev/) with [React Testing Library](https://testing-library.com/react) for testing.

### Run tests

```bash
# Run all tests with coverage
npm run test

# Run tests in watch mode
npm run test:watch
```

### Write tests

- Place test files in `src/__tests__/` with the `.test.jsx` extension
- Use React Testing Library for component testing
- Use [MSW (Mock Service Worker)](https://mswjs.io/) to mock API requests
- Follow the existing test patterns in the codebase

Example test structure:

```javascript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import YourComponent from '../components/YourComponent';

describe('YourComponent', () => {
  it('renders correctly', () => {
    render(<YourComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Test coverage

The project aims for high test coverage. Coverage reports are generated automatically when you run `npm run test`.

## Pull request guidelines

### Before you submit

1. **Make sure all tests pass:** Run `npm run test`
2. **Make sure linting passes:** Run `npm run lint`
3. **Update documentation:** If your changes affect usage, update relevant documentation
4. **Test manually:** Verify your changes work as expected in the browser
5. **Commit package-lock.json:** If you modified `package.json`, include `package-lock.json` changes

### Submit a pull request

1. **Push your branch** to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a pull request** against the `main` branch of the original repository

3. **Fill out the PR template** with:
   - Clear description of the changes
   - Motivation and context
   - Type of change (bug fix, feature, documentation, etc.)
   - Testing performed
   - Screenshots (if applicable)

4. **Link related issues** using keywords like "Fixes #123" or "Closes #456"

### Pull request review process

- A maintainer reviews your pull request
- Address any feedback or requested changes
- Once approved, a maintainer merges your PR
- Keep your PR focused on a single concern—split large changes into multiple PRs

### Pull request best practices

- **Keep PRs small and focused** - Easier to review and merge
- **Write clear commit messages** - Follow Conventional Commits format
- **Update tests** - Add or modify tests for your changes
- **Maintain backward compatibility** - Avoid breaking changes when possible
- **Document breaking changes** - Clearly note any breaking changes in the PR description
- **Be responsive** - Respond to review comments promptly

## Report issues

Found a bug or have a feature request? [Open an issue](../../issues) with:

- **Clear title** - Summarize the issue concisely
- **Detailed description** - Explain the problem or feature request
- **Steps to reproduce** (for bugs) - Provide a minimal reproduction
- **Expected behavior** - What should happen
- **Actual behavior** - What actually happens
- **Environment details** - Node.js version, OS, browser, etc.
- **Screenshots** (if applicable) - Visual aids help understanding

## License

By contributing to this project, you agree that your contributions are licensed under the [Apache License 2.0](./LICENSE).

---

Thank you for contributing to carbon-react-starter. Your efforts help make this project better for everyone.
