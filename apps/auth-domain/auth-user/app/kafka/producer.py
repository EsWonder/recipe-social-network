from kafka import KafkaProducer
from app.config import settings
import json

producer = KafkaProducer(
    bootstrap_servers=settings.KAFKA_BROKER,
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

def send_event(topic: str, value: dict):
    producer.send(topic, value=value)
    producer.flush()
