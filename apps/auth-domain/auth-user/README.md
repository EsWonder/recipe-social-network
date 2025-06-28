# auth-user Microservice

## Overview
This microservice handles user login and JWT token generation.

## Tech Stack
- Language: Python
- Framework: FastAPI
- Database: PostgreSQL (shared across `auth` domain)
- Auth: JWT

## Running Locally

### Prerequisites
- Docker & Docker Compose
- PostgreSQL running with database `auth_db`

### Steps
```bash
docker build -t auth-user .
docker run -p 8000:8000 --env-file .env auth-user
```

## Endpoints

### `POST /login`
Request:
```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

Response:
```json
{
  "access_token": "JWT_TOKEN",
  "token_type": "bearer"
}
```
