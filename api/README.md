# api

Backend NestJS.

## Prérequis

- Node.js
- PostgreSQL (base `projweb`)

## Installer

```
npm install
```

## Lancer

```
npm run start:dev
```

- API : http://localhost:3000/api
- Swagger : http://localhost:3000/docs

## Routes

- POST `/api/security/sign-up`
- POST `/api/security/sign-in`
- GET `/api/security/me`

La config se trouve dans `.env`.
