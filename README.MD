# Census2021 end to end prototype

## Quick start (run locally)

### Prerequisites
- Ruby + Bundler (recommended: Homebrew `ruby@3.2`)
- Node.js (npm)

### Install
```bash
bundle install
npm ci
```

### Run (Jekyll dev server)
```bash
npm start
```

This serves on `http://127.0.0.1:8080` by default.

To use a different port:
```bash
PORT=8081 npm start
```

## Install
If you prefer RVM, you can still use it, but it’s not required. The minimum is a Ruby that can run the Bundler version in `Gemfile.lock`.

## Run
The recommended way is `npm start` (above).

## Frontend build tooling (optional)
Gulp is only needed if you’re rebuilding the legacy JS/CSS pipeline.

```bash
npm run gulp:dev
```

## Development notes
`npm start` runs `jekyll serve` with live reload and auto-regeneration enabled.
