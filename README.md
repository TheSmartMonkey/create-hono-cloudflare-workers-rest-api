# create-hono-cloudflare-workers-rest-api

🚀 Welcome to [HonoJS](https://hono.dev/) REST API Template 🚀

## Features

🛠️ Minimal Setup, Maximum Power

⚙️ Middleware Magic

🔐 JWT token Authentication

📚 Swagger UI and openapi documentation (with auto generate code for the frontend)

✅ Route validation with [zod](https://zod.dev/)

🧪 Testing with [jest](https://jestjs.io/fr/)

🦋 Beautiful code with [eslint](https://eslint.org/) and [prettier](https://prettier.io/)

## Getting Started

Create a new project

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

Swagger UI 📚 : http://127.0.0.1:8787/public/api

You can add the JWT token in the Authorize button in the top right corner

Exemple token with secret `1234` :

```sh
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmYWtlVXNlcklkIiwiZW1haWwiOiJmYWtlRW1haWwiLCJpYXQiOjE3NDAyMjUwODh9.PcHnkcIxknYZbaR7G4R0KaYAWAKeaHJ5cZYIUIPSYRA
```

Encode a JWT token: [JWT Encoder/Decoder](https://10015.io/tools/jwt-encoder-decoder)

## Generate openapi spec

Edit `openapitools.json` config to specify the code generation (typescript-angular, typescript-node, etc)

Then run this command to generate the code

```sh
bun run genapi
```

You should have the generated code in `dist/api`

## Testing

Test you code 🧪

```sh
bun run test
```

### Run Specific Tests

Run unit tests 🧪
_Test individual components or functions_

```sh
bun run unit
```

Run integration tests 🧪
_Test your code with external dependencies like databases, APIs, etc_

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

Happy coding! 🎉
