import { sendKafkaMessage } from '../utils/kafka';
import { createUserInDB } from './user.entity';

export async function registerUserService() {
  const user = await createUserInDB({
    name: 'Test User',
    email: 'test@example.com',
    password: '123456'
  });

  await sendKafkaMessage('user-registered', user);
}