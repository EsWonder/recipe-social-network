import socket
import time

def wait_for_kafka(host='kafka', port=9092, timeout=60):
    start_time = time.time()
    while True:
        try:
            with socket.create_connection((host, port), timeout=2):
                print("✅ Kafka is available!")
                return
        except Exception:
            if time.time() - start_time > timeout:
                raise TimeoutError("❌ Timeout: Kafka is still not available after waiting.")
            print("⏳ Waiting for Kafka...")
            time.sleep(2)

if __name__ == "__main__":
    wait_for_kafka()
