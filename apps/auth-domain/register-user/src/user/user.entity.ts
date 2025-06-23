export interface User {
  name: string;
  email: string;
  password: string;
}

export async function createUserInDB(user: User): Promise<User> {
  console.log('📦 Simulando inserción en la base de datos:', user);
  return user;
}