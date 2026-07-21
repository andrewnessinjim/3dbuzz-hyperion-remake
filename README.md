# Hyperion

A TypeScript project built with Node.js.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [pnpm](https://pnpm.io/) v10.29.3 (managed via `packageManager` in `package.json`)

If you don't have pnpm installed, install it globally via npm:

```bash
npm install -g pnpm
```

## Getting Started

Install dependencies:

```bash
pnpm install
```

## Running Locally

```bash
pnpm start
```

## Other Scripts

Build the TypeScript source:

```bash
pnpm build
```

Run the test suite:

```bash
pnpm test
```

## Tech Stack

- [TypeScript](https://www.typescriptlang.org/)
- [tsx](https://github.com/privatenumber/tsx) for running TypeScript directly
- [Vitest](https://vitest.dev/) for testing
- [chalk](https://github.com/chalk/chalk) for terminal styling
