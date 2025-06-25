# logout-user Microservice

Simulates logout by returning a message. In production, you might handle token blacklisting.

## Endpoint
- POST /logout

## Docker

```bash
docker build -t logout-user .
docker run -p 9000:9000 logout-user
```