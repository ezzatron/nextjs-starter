# Next.js starter

## Usage

Install all [Prerequisites], then see available tasks with:

[prerequisites]: #prerequisites

```sh
task --list
```

The default task runs the tests:

```sh
task
```

Start a development server with:

```sh
task dev
```

## Prerequisites

### Node.js

The required Node.js version is specified in the `.node-version` file. It's
recommended to use a tool that supports `.node-version` files to automatically
switch to the correct Node.js version when you navigate to the project
directory.

Options include:

- macOS / Linux / WSL: [asdf] + [asdf-nodejs]
- Cross-platform: [fnm]

[asdf]: https://asdf-vm.com/
[asdf-nodejs]: https://github.com/asdf-vm/asdf-nodejs
[fnm]: https://github.com/Schniz/fnm

### pnpm

The required pnpm version is specified in the `package.json` file's
`packageManager` property. This property is used by [Corepack] to automatically
switch to the correct pnpm version when you navigate to the project directory.

[corepack]: https://github.com/nodejs/corepack

> [!WARNING]
>
> Corepack is bundled with Node.js until v24. If you're using Node.js v25 or
> later, you'll to install Corepack separately.

### Task

[Task] is used to run tasks like building, testing, and running development
servers.

[task]: https://taskfile.dev/

## TODO

- [ ] Demo content
- [ ] WireMock examples
- [ ] Chromatic
- [ ] Style Dictionary
- [ ] Hosting
