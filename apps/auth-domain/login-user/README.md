# login-user Microservice

Authenticate a user and return a JWT.

## Endpoint
- POST /auth/login

## Docker

```bash
docker build -t login-user .
docker run --env-file .env -p 3000:3000 login-user
```