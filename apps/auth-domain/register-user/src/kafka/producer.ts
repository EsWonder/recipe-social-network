import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "register-user",
  brokers: [process.env.KAFKA_BROKER || "kafka:9092"]
});

const producer = kafka.producer();
producer.connect();

export const sendUserCreated = async (user: { id: number, email: string }) => {
  await producer.send({
    topic: "user.created",
    messages: [{ value: JSON.stringify(user) }]
  });
};
