# create-hono-cloudflare-workers-rest-api

🚀 Welcome to [HonoJS](https://hono.dev/) REST API Template 🚀

## Features

🛠️ Minimal Setup, Maximum Power

⚙️ Middleware Magic

🔐 JWT token Authentication

✅ Route validation with [zod](https://zod.dev/)

🧪 Testing with [jest](https://jestjs.io/fr/)

🦋 Beautiful code with [eslint](https://eslint.org/) and [prettier](https://prettier.io/)

## Getting Started

1. Clone the template:

   ```sh
   npx degit https://github.com/TheSmartMonkey/create-hono-cloudflare-workers-rest-api backend
   ```

2. Create a `wrangler.toml` from `wrangler.default.toml`.

3. Install dependencies:

   ```sh
   bun i
   ```

4. Start coding:

   ```sh
   bun start
   ```

5. Deploy to Cloudflare:

   ```sh
   bun run deploy
   ```

## Testing

Run all tests:

```sh
bun run test
```

### Types of Tests

**Unit Tests**: Test individual components or functions

**Integration Tests**: Test your code with external dependencies like databases, APIs, etc

#### Run Specific Tests

Unit Tests:

```sh
bun run unit
```

Integration Tests:

```sh
bun run integration
```

### Grouping Tests

Tests are grouped using Jest's `@group` annotation:

```js
/**
 * @group unit
 */
```

```js
/**
 * @group integration
 */
```

This helps in organizing and running specific groups of tests

## More Commands

Beautify code:

```sh
bun run fix
```

For more commands:

```sh
bun run
```

Encode a JWT token: [JWT Encoder/Decoder](https://10015.io/tools/jwt-encoder-decoder)

Happy coding! 🎉
