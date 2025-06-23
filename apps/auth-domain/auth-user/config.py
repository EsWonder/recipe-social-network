import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
KAFKA_BROKER = os.getenv("KAFKA_BROKER")
KAFKA_CONSUME_TOPIC = os.getenv("KAFKA_CONSUME_TOPIC")
KAFKA_RESPONSE_TOPIC = os.getenv("KAFKA_RESPONSE_TOPIC")
