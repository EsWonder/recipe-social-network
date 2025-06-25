# get-user-profile Microservice

Returns the user profile using the provided JWT.

## Endpoint
- GET /user/profile

## Docker

```bash
docker build -t get-user-profile .
docker run --env-file .env -p 3100:3100 get-user-profile
```