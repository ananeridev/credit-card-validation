## Credit Card Validation

NestJS project for credit card validation using TDD and the Template Method pattern.

## Dependencies

webpack, @nestjs/config, @nestjs/testing, @types/jest, ts-jest, supertest, @types/supertest

## Installation

```bash
npm install
```

## Running the application

```bash
# development
npm run start

# watch mode
npm run start:dev

# production
npm run start:prod
```

## Tests

```bash
# unit
npm run test

# e2e
npm run test:e2e

# coverage
npm run test:cov
```

### e2e structure

- test/jest-e2e.json: Jest configuration for e2e
- test/e2e/setup-e2e.ts: global setup for e2e tests
- test/e2e/app.e2e-spec.ts: suite covering success and error paths

### e2e best practices adopted

- Isolation via `TestingModule` and `app.init()` without opening a network port
- `supertest` for HTTP requests
- Assertions on status and success/error payload
- Edge cases covered by card brand and CVV

## Endpoint

- POST `/credit-card/validate`
  - body: `{ "cardNumber": string, "cvv": string }`
  - responses:
    - 201: `true` when valid
    - 400: `{ message: string }` when invalid or brand not supported

### Request example

```bash
curl -X POST http://localhost:3001/credit-card/validate \
  -H "Content-Type: application/json" \
  -d '{"cardNumber":"4111111111111111","cvv":"123"}'
```

## CI

GitHub Actions pipeline in `.github/workflows/ci.yml` runs unit and e2e tests on every push/PR to `main`.
