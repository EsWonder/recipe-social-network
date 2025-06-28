# password-recovery Microservice

## Overview
Allows users to reset their password by providing their email and a new password.

## Endpoints

### POST /recover
```json
{
  "email": "user@example.com",
  "new_password": "newsecurepassword"
}
```

## Tech Stack
- Python + FastAPI
- PostgreSQL (shared)
- Password hashed with bcrypt

## Running

```bash
docker build -t password-recovery .
docker run -p 8003:8003 --env-file .env password-recovery
```
