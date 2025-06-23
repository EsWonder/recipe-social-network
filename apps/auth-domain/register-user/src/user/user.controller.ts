import { registerUserService } from './user.service';

export async function registerUser() {
  console.log('✅ Register user service is running...');
  await registerUserService();
}