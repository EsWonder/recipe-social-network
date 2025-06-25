# register-user Microservice

Registers a user into a shared PostgreSQL database for auth-domain.

## Endpoint
- POST /register

## Docker

```bash
docker build -t register-user .
docker run --env-file .env -p 8000:8000 register-user
```

## Environment Variables
- DB_HOST
- DB_PORT
- DB_NAME
- DB_USER
- DB_PASS