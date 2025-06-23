import os
import json
from kafka import KafkaProducer
from dotenv import load_dotenv

load_dotenv()

KAFKA_BROKER = os.getenv("KAFKA_BROKER")
PRODUCER_TOPIC = os.getenv("KAFKA_PRODUCER_TOPIC")

producer = KafkaProducer(
    bootstrap_servers=[KAFKA_BROKER],
    value_serializer=lambda m: json.dumps(m).encode("utf-8")
)

def send_response(response):
    producer.send(PRODUCER_TOPIC, response)
    producer.flush()
    print("✅ JWT verification response sent to:", PRODUCER_TOPIC)
