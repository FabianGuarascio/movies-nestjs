# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project layout

The NestJS application lives inside the `movies-nestjs/` subdirectory. All commands below must be run from there.

## Commands

```bash
# Development (watch mode)
npm run start:dev

# Build
npm run build

# Lint (auto-fixes)
npm run lint

# Format
npm run format

# Unit tests
npm run test

# Run a single spec file
npx jest --testPathPattern=movies.service

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

The app listens on `PORT` env var or falls back to `3000`.

## Architecture

Single NestJS module hierarchy: `AppModule` → `MoviesModule`.

**Database**: `better-sqlite3` via TypeORM, stored in `movies.db` at the project root. `synchronize: true` is enabled — schema auto-updates from entity changes, no migrations exist.

**Validation**: A global `ValidationPipe({ whitelist: true })` is registered in `main.ts`. Unknown request properties are silently stripped. DTO validation uses `class-validator` decorators.

**Seeding**: `MoviesSeeder` implements `OnApplicationBootstrap` and is registered as a provider in `MoviesModule`. It seeds 5 movies at startup only when the table is empty.

**Movie entity fields**: `id` (auto PK), `title` (default `'unknown'`), `genre` (required), `year` (optional/nullable), `rating` (decimal 3,1; validated 0–10 in DTO).

**UpdateMovieDto** uses `PartialType(CreateMovieDto)` — all fields become optional on PATCH.

## API endpoints

All routes are under `/movies`:

| Method | Route | Action |
|--------|-------|--------|
| GET | `/movies` | list all |
| GET | `/movies/:id` | get one (404 if missing) |
| POST | `/movies` | create |
| PATCH | `/movies/:id` | partial update |
| DELETE | `/movies/:id` | remove |
