# register-user Microservice

## Overview
This microservice handles user registration in the `auth` domain.

## Tech Stack
- Language: Python
- Framework: FastAPI
- Database: PostgreSQL (shared)
- Auth: bcrypt password hashing

## Running Locally

### Prerequisites
- Docker & Docker Compose
- PostgreSQL running with database `auth_db`

### Steps
```bash
docker build -t register-user .
docker run -p 8001:8001 --env-file .env register-user
```

## Endpoint

### `POST /register`
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
  "message": "User created successfully"
}
```
