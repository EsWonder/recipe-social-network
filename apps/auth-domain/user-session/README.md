# user-session Microservice

## Overview
Handles user session tracking such as login sessions per device.

## Tech Stack
- Language: Python
- Framework: FastAPI
- Database: PostgreSQL (shared)

## Endpoints

### POST /session
Create a new session.
```json
{
  "user_id": 1,
  "ip": "192.168.1.100",
  "user_agent": "Mozilla/5.0"
}
```

### GET /sessions/{user_id}
List all active sessions for the user.

### DELETE /session/{session_id}
Delete (logout) a session.

## Running Locally

```bash
docker build -t user-session .
docker run -p 8002:8002 --env-file .env user-session
```
