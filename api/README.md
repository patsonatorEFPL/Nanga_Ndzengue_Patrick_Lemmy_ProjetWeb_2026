# API — Projet de Développement Web

API REST en NestJS : inscription et connexion, avec mot de passe haché (bcrypt) et
token JWT. Les données sont stockées dans PostgreSQL via TypeORM.

## Prérequis

- Node.js
- PostgreSQL avec une base projweb

## Installation


npm install


## Lancer


npm run start:dev


- API : http://localhost:3000/api
- Documentation Swagger : http://localhost:3000/docs

## Routes principales

- POST /api/security/sign-up — inscription
- POST /api/security/sign-in — connexion (renvoie un token)

La configuration (base de données, secret JWT) se trouve dans le fichier .env .
