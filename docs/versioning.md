# Versioning guide

This document provides detailed information about the automated versioning system.

## Overview

This project uses [semantic-release](https://github.com/semantic-release/semantic-release) to automate version management based on [Conventional Commits](https://www.conventionalcommits.org/).

## Automated release process

When commits are merged to the `main` branch, the GitHub Actions workflow automatically:

1. Analyzes commits since the last release
2. Determines the next version based on commit types
3. Updates `package.json`, `package-lock.json`, and `CHANGELOG.md`
4. Creates a Git tag for the new version
5. Publishes a GitHub release with generated notes

## Commit types and version bumps

| Commit type        | Version impact        | Example                    | Result                  |
| ------------------ | --------------------- | -------------------------- | ----------------------- |
| `feat:`            | Minor (0.4.0 → 0.5.0) | `feat: add dark mode`      | New feature             |
| `fix:`             | Patch (0.4.0 → 0.4.1) | `fix: resolve login issue` | Bug fix                 |
| `perf:`            | Patch (0.4.0 → 0.4.1) | `perf: optimize queries`   | Performance improvement |
| `refactor:`        | Patch (0.4.0 → 0.4.1) | `refactor: simplify auth`  | Code refactoring        |
| `BREAKING CHANGE:` | Major (0.4.0 → 1.0.0) | See below                  | Breaking change         |

## Non-release commits

These commit types don't trigger releases:

- `docs:` - Documentation changes
- `style:` - Code formatting
- `test:` - Test additions/updates
- `chore:` - Maintenance tasks
- `ci:` - CI/CD changes
- `build:` - Build system changes

## Breaking changes

To trigger a major version bump, include `BREAKING CHANGE:` in the commit body:

```bash
git commit -m "feat: redesign authentication API

BREAKING CHANGE: authentication endpoints changed from /auth/* to /api/auth/*
Users must update their API calls to use the new endpoints."
```

This creates version 1.0.0 from 0.x.x.

## Pre-release versions

### Beta releases

Merge to the `beta` branch for beta releases:

```bash
git checkout -b beta
git push origin beta
```

Creates versions like: `1.0.0-beta.1`, `1.0.0-beta.2`, etc.

### Alpha releases

Merge to the `alpha` branch for alpha releases:

```bash
git checkout -b alpha
git push origin alpha
```

Creates versions like: `1.0.0-alpha.1`, `1.0.0-alpha.2`, etc.

## Configuration files

### `.releaserc.json` <!-- cspell:disable-line -->

Main configuration file for semantic-release:

- Defines release branches (`main`, `beta`, `alpha`)
- Configures commit analysis rules
- Specifies plugins for changelog, Git, and GitHub
- Sets up release note generation

### `.github/workflows/release.yml`

GitHub Actions workflow that:

- Triggers on pushes to release branches
- Runs tests and builds
- Executes semantic-release
- Requires `GITHUB_TOKEN` for authentication

## Testing locally

Test the release process without publishing:

```bash
npm run semantic-release -- --dry-run
```

This shows:

- What version would be created
- What commits would be included
- What release notes would be generated

## Manual release (emergency)

If automated releases fail, you can manually create a release:

1. Update version in `package.json`:

   ```bash
   npm version patch  # or minor, or major
   ```

2. Update `CHANGELOG.md` manually

3. Commit and tag:

   ```bash
   git add .
   git commit -m "chore(release): 1.0.0"
   git tag v1.0.0
   git push origin main --tags
   ```

4. Create GitHub release manually from the tag

## Troubleshooting

### Release not triggered

**Problem**: Commits merged but no release created

**Solutions**:

- Check commit messages follow Conventional Commits format
- Verify commits include release-triggering types (`feat:`, `fix:`, etc.)
- Check GitHub Actions logs for errors
- Ensure `GITHUB_TOKEN` has correct permissions

### Version not updated

**Problem**: Release created but version unchanged

**Solutions**:

- Verify `package.json` is tracked by Git
- Check `.releaserc.json` includes `@semantic-release/npm` plugin <!-- cspell:disable-line -->
- Ensure `@semantic-release/git` plugin lists `package.json` in assets

### Changelog not generated

**Problem**: Release created but `CHANGELOG.md` not updated

**Solutions**:

- Verify `@semantic-release/changelog` plugin is configured
- Check `@semantic-release/git` includes `CHANGELOG.md` in assets
- Ensure commit messages are properly formatted

## Best practices

1. Write clear commit messages following Conventional Commits format
2. Group related changes in single commits when possible
3. Test before merging to ensure all tests pass
4. Review generated release notes for accuracy
5. Clearly explain breaking changes in commit body
6. Use pre-releases to test major changes before stable release

## Resources

- [Semantic versioning](https://semver.org/)
- [Conventional commits](https://www.conventionalcommits.org/)
- [semantic-release documentation](https://semantic-release.gitbook.io/)
- [Keep a changelog](https://keepachangelog.com/)
