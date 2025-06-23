import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'register-user',
  brokers: ['kafka:9092']
});

const producer = kafka.producer();

export async function sendKafkaMessage(topic: string, message: any) {
  await producer.connect();
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }]
  });
  await producer.disconnect();
}