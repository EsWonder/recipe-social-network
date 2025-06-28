# user-profile Microservice

## Overview
This microservice handles profile retrieval and updates via gRPC.

## Tech Stack
- Language: Python
- Framework: gRPC
- Database: PostgreSQL (shared)
- ORM: SQLAlchemy

## Running Locally

### Prerequisites
- Docker & Docker Compose
- PostgreSQL running with database `auth_db`

### Build & Run
```bash
docker build -t user-profile .
docker run -p 50051:50051 --env-file .env user-profile
```

## Proto Service Methods

### `GetProfile`
Request:
```protobuf
message UserId { int32 id = 1; }
```
Response:
```protobuf
message UserProfile {
  int32 id = 1;
  string email = 2;
  string name = 3;
  string phone = 4;
  string city = 5;
  string address = 6;
  string birthdate = 7;
  string gender = 8;
}
```

### `UpdateProfile`
Request:
```protobuf
message UpdateProfileRequest {
  int32 id = 1;
  string name = 2;
  string phone = 3;
  string city = 4;
  string address = 5;
  string birthdate = 6;
  string gender = 7;
}
```
