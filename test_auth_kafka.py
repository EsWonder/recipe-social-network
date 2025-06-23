from kafka import KafkaProducer, KafkaConsumer
import json
import jwt
import time

# Configuración
KAFKA_BROKER = 'localhost:9092'
TOPIC_REQUEST = 'auth-request'
TOPIC_RESPONSE = 'auth-response'
SECRET = 'supersecretkey'
ALGORITHM = 'HS256'

# Crear JWT simulado (puedes modificar el payload)
token = jwt.encode({"sub": "user123", "role": "admin"}, SECRET, algorithm=ALGORITHM)

# Enviar token al topic de solicitud
producer = KafkaProducer(
    bootstrap_servers=KAFKA_BROKER,
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

payload = {"token": token}
producer.send(TOPIC_REQUEST, payload)
producer.flush()
print(f"🔐 Token enviado: {token}")

# Esperar la respuesta del microservicio
consumer = KafkaConsumer(
    TOPIC_RESPONSE,
    bootstrap_servers=KAFKA_BROKER,
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    group_id='test-auth-group',
    value_deserializer=lambda x: json.loads(x.decode('utf-8'))
)

print("🕐 Esperando respuesta...")

for message in consumer:
    data = message.value
    print("✅ Respuesta recibida:", data)
    break
