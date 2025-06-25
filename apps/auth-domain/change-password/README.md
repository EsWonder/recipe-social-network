# change-password Microservice

Allows a user to securely change their password.

## Endpoint
- PUT /user/change-password

## Docker

```bash
docker build -t change-password .
docker run --env-file .env -p 3300:3300 change-password
```