# update-user-profile Microservice

Allows a user to update their profile data.

## Endpoint
- PUT /update-profile

## Docker

```bash
docker build -t update-user-profile .
docker run --env-file .env -p 3200:3200 update-user-profile
```