import os

class Settings:
    PROJECT_NAME: str = "Auth User Microservice"
    POSTGRES_USER: str = os.getenv("POSTGRES_USER", "postgres")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "postgres")
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "auth_domain_db")
    POSTGRES_HOST: str = os.getenv("POSTGRES_HOST", "auth-db")
    POSTGRES_PORT: str = os.getenv("POSTGRES_PORT", "5432")
    KAFKA_BROKER: str = os.getenv("KAFKA_BROKER", "kafka:9092")
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "supersecret")
    JWT_ALGORITHM: str = "HS256"

settings = Settings()
