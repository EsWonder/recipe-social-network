from kafka import KafkaConsumer
from app.config import settings
import json

def create_consumer(topic: str, group_id: str):
    return KafkaConsumer(
        topic,
        bootstrap_servers=settings.KAFKA_BROKER,
        group_id=group_id,
        value_deserializer=lambda m: json.loads(m.decode('utf-8')),
        auto_offset_reset='earliest',
        enable_auto_commit=True
    )
