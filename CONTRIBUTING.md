# Contributing to create-hono-cloudflare-workers-rest-api

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your system
- A GitHub account
- Git installed

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork** locally:

   ```sh
   git clone https://github.com/YOUR_USERNAME/create-hono-cloudflare-workers-rest-api.git
   cd create-hono-cloudflare-workers-rest-api
   ```

3. **Add the upstream repository** as a remote:

   ```sh
   git remote add upstream https://github.com/TheSmartMonkey/create-hono-cloudflare-workers-rest-api.git
   ```

4. **Install dependencies**:

   ```sh
   bun i
   ```

5. **Create your `wrangler.toml`** based on `wrangler.default.toml`:
   ```sh
   cp wrangler.default.toml wrangler.toml
   ```

## Development Workflow

### Creating a Branch

Create a new branch for your feature or bugfix:

```sh
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bugfix-name
```

### Making Changes

1. Make your changes to the codebase
2. Write or update tests as needed
3. Ensure your code follows the project's style guidelines

### Running Tests

Before submitting your changes, make sure all tests pass:

```sh
# Run all tests
bun run test

# Run only unit tests
bun run unit

# Run only integration tests
bun run integration
```

### Code Quality

Ensure your code is properly formatted and linted:

```sh
# Fix linting and formatting issues
bun run fix

# Check linting without fixing
bun run lint:check

# Check formatting without fixing
bun run format:check

# Type check
bun run type:check
```

## Updating Dependencies

### Updating package.json

To update dependencies in `package.json`, you can use Bun's built-in update commands:

```sh
# Update all dependencies to their latest versions
bun update

# Update a specific package
bun update <package-name>

# Update to a specific version
bun add <package-name>@<version>

# Add a new dependency
bun add <package-name>

# Add a new dev dependency
bun add -d <package-name>

# Remove a dependency
bun remove <package-name>
```

After updating dependencies:

1. **Test your changes** to ensure everything still works:

   ```sh
   bun run test
   ```

2. **Check for type errors**:
   ```sh
   bun run type:check
   ```

### Best Practices for Dependency Updates

- **Update dependencies incrementally** - Don't update everything at once unless necessary
- **Test thoroughly** after updating dependencies
- **Check changelogs** for breaking changes
- **Update related dependencies** together (e.g., if updating TypeScript, consider updating related type packages)

## Generating API Code

If you modify the OpenAPI specification:

1. **Edit `openapitools.json`** to specify the code generation (typescript-angular, typescript-fetch, etc)

2. **Generate the API code**:

   ```sh
   bun run genapi
   ```

3. The generated code will be in `dist/api`

## Submitting Changes

### Commit Messages

Write clear and descriptive commit messages:

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

Example:

```
feat: add user authentication middleware

- Add JWT token validation
- Add user context to request
- Update tests

Closes #123
```

### Pull Request Process

1. **Keep your branch up to date**:

   ```sh
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push your changes** to your fork:

   ```sh
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request** on GitHub:
   - Provide a clear title and description
   - Reference any related issues
   - Include screenshots or examples if applicable
   - Ensure all CI checks pass

4. **Respond to feedback** - Be open to suggestions and make requested changes

## Code Style Guidelines

- Follow the existing code style in the project
- Use ESLint and Prettier (configured in the project)
- Write meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

## Testing Guidelines

- Write tests for new features
- Ensure existing tests still pass
- Aim for good test coverage
- Use appropriate test groups (`@group unit` or `@group integration`)

## Questions?

If you have questions or need help, feel free to:

- Open an issue on GitHub
- Check the existing issues and discussions

Thank you for contributing! 🎉
