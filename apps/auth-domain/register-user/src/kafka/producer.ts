import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "register-user",
  brokers: [process.env.KAFKA_BROKER || "kafka:9092"]
});

const producer = kafka.producer();

export const connectProducer = async () => {
  try {
    await producer.connect();
    console.log("✅ Kafka producer connected");
  } catch (err) {
    console.error("❌ Kafka producer connection failed:", err);
  }
};

export const sendUserCreated = async (user: { id: number; email: string }) => {
  try {
    await producer.send({
      topic: "user.created",
      messages: [{ value: JSON.stringify(user) }]
    });
    console.log("📤 Event sent to Kafka: user.created");
  } catch (err) {
    console.error("❌ Failed to send Kafka event:", err);
  }
};
