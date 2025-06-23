import os
import json
from kafka import KafkaConsumer, KafkaProducer
from jwt_utils import verify_token

KAFKA_BROKER = os.getenv("KAFKA_BROKER")
KAFKA_CONSUME_TOPIC = os.getenv("KAFKA_CONSUME_TOPIC")
KAFKA_RESPONSE_TOPIC = os.getenv("KAFKA_RESPONSE_TOPIC")

def consume_messages():
    print(f"✅ Topic de entrada: {KAFKA_CONSUME_TOPIC}")

    consumer = KafkaConsumer(
        KAFKA_CONSUME_TOPIC,
        bootstrap_servers=[KAFKA_BROKER],
        value_deserializer=lambda m: json.loads(m.decode("utf-8")),
        group_id="auth-user-group",
        auto_offset_reset="earliest"
    )

    producer = KafkaProducer(
        bootstrap_servers=[KAFKA_BROKER],
        value_serializer=lambda m: json.dumps(m).encode("utf-8")
    )

    for msg in consumer:
        data = msg.value
        token = data.get("token")
        print(f"🔑 Token recibido: {token}")

        result = verify_token(token)
        print(f"📤 Resultado: {result}")

        producer.send(KAFKA_RESPONSE_TOPIC, result)
