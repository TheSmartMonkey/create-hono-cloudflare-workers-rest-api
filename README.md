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

```sh
npx degit https://github.com/TheSmartMonkey/create-hono-cloudflare-workers-rest-api backend
```

Create a `wrangler.toml` based on `wrangler.default.toml`

Install dependancies

```sh
bun i
```

Start coding 🧑‍💻

```sh
bun start
```

Deploy to cloudflare 🚀

```sh
bun run deploy
```

## Testing

Test you code 🧪

```sh
bun run test
```

### Run Specific Tests

Run unit tests 🧪
*Test individual components or functions*

```sh
bun run unit
```

Run integration tests 🧪
*Test your code with external dependencies like databases, APIs, etc*

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

Fix you code to make it Beautiful 🦋

```sh
bun run fix
```

For more commands:

```sh
bun run
```

Encode a JWT token: [JWT Encoder/Decoder](https://10015.io/tools/jwt-encoder-decoder)

Happy coding! 🎉
