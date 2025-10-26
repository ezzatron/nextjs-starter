# Copilot instructions

## Architecture overview

This is a **production-ready Next.js starter** with a custom runtime wrapper and
comprehensive testing setup.

## Use of Task

This project uses [Task] (not npm scripts) for all operations. Always use Task
commands:

[task]: https://taskfile.dev/

```sh
task --list     # See all available tasks
task test       # Run tests
task lint       # Lint and format code
task build      # Build application
task pre-commit # More comprehensive test, lint, build, etc.
```

Task handles automatic dependency installation when necessary. All build
artifacts are placed in the `out/` directory.

## Testing strategy

- [Vitest] for unit and browser-based component tests.
- [Storybook] for component development and visual testing.
- [Playwright] for service-level integration tests.
- [Testcontainers] for running services during tests.

[Vitest]: https://vitest.dev/
[Storybook]: https://storybook.js.org/
[Playwright]: https://playwright.dev/
[Testcontainers]: https://testcontainers.com/

For both Vitest and Playwright, browsers are run in a Docker container to ensure
consistency of screenshots and other behavior across environments.

## File naming conventions

- Vitest unit tests: `*.test.ts` (colocated)
- Vitest component tests: `*.test.tsx` (colocated)
- Storybook stories: `*.stories.tsx` (colocated)
- Storybook docs: `*.docs.mdx` (colocated)
- Playwright tests: `*.test.ts` under `test/playwright/suite`

## Dependencies & tools

- [pnpm]
- [TypeScript]
- [Next.js App Router]
- [Tailwind CSS]
- [ESLint]
- [Prettier]

[pnpm]: https://pnpm.io/
[typescript]: https://typescriptlang.org/
[next.js app router]: https://nextjs.org/docs/app
[tailwind css]: https://tailwindcss.com/
[eslint]: https://eslint.org/
[prettier]: https://prettier.io/

## Common patterns

- Use Next.js App Router conventions.
- Use React Server Components extensively. Follow the "islands architecture"
  model. Only use Client Components and client-side interactivity where
  absolutely necessary.
- Avoid the use of heavy client-side libraries of any kind.
- Use as much as possible of what React and Next.js provides out of the box.
- When updating dependencies, use `pnpm` commands.
- Avoid using unnecessary quotes in YAML files.
- Prefer importing named exports directly instead of importing the entire
  module.
- Prefer using the `type` keyword for type-only imports. e.g.
  `import { type Foo } from "bar";`
- Only use erasable TypeScript syntax (i.e. no enums).
- Follow Prettier default style (i.e. 2 space indentation, semicolons,
  double-quoted strings, 80 character line length).
