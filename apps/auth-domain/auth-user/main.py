from kafka_consumer import consume_messages

if __name__ == "__main__":
    print("✅ auth-user service listening for JWT validation requests...")
    consume_messages()
