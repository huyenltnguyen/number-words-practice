# Number Words Practice

An app for practicing numeric words in multiple languages.

## Features

- **Selectable languages**: practice in English or German.
- **Two exercise modes**:
  - `number → words`: convert a numeric prompt into words. For example:
    - "123" would be converted to "one hundred twenty-three" in English or "einhundertdreiundzwanzig" in German.
  - `words → number`: convert a words prompt into numeric digits. For example:
    - "one hundred twenty-three" would be converted to "123" in English.
    - "einhundertdreiundzwanzig" would be converted to "123" in German.

## Tech stack

- React 19 + TypeScript
- Vite for bundling and dev server
- Vitest + Testing Library for tests

## Setup

**Prerequisites:** [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/).

```bash
pnpm install
```

## Development

```bash
# Start the dev server
pnpm dev

# Run tests
pnpm test

# Type-check and build
pnpm build
```
