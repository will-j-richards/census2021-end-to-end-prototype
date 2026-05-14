# Census2021 end to end prototype

## Quick start (run locally)

### Prerequisites
- **Ruby 3.x** (not 4.x): Homebrew **`ruby@3.2`** is recommended. Plain **`brew install ruby`** is often Ruby 4, which breaks this repo’s `github-pages` pin.
- **Bundler** (match the version in `Gemfile.lock` under `BUNDLED WITH` if prompted)
- **Node.js** (for `npm`; optional if you only use Ruby, but `npm start` is the usual entry point)

### Install (first time)
```bash
bundle install
npm install
```

Use `npm ci` only in automation when `package.json` and `package-lock.json` are known to match.

### Run (Jekyll dev server)
```bash
npm start
```

This **syncs static assets** from `export/` and `_img/` into `js/compiled/` and `s/` on every start (no separate `npm run sync:assets` step), then serves on **`http://127.0.0.1:8080`** by default.

To use a different port:
```bash
PORT=8081 npm start
```

## Frontend build tooling (optional)
Gulp is only needed if you’re **rebuilding** the legacy JS/CSS pipeline (use **Node 20 LTS** if Gulp crashes on newer Node).

```bash
npm run gulp:dev
```

You can still run **`npm run sync:assets`** manually if you want to refresh assets without restarting Jekyll.

## Development notes
`npm start` runs `scripts/jekyll-serve.sh`, which picks a suitable Ruby, runs asset sync, then `jekyll serve` with live reload and auto-regeneration.
