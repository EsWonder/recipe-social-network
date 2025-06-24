import { pool } from "../model/user.model";
import bcrypt from "bcrypt";
import { sendUserCreated } from "../kafka/producer";

export const createUser = async ({ email, password }: { email: string, password: string }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    "INSERT INTO users (email, hashed_password) VALUES ($1, $2) RETURNING id, email",
    [email, hashedPassword]
  );

  await sendUserCreated(result.rows[0]); // Send to Kafka
  return result.rows[0];
};
