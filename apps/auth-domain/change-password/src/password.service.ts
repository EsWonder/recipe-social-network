import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'auth_db',
    });
  }

  async updatePassword(userId: number, currentPassword: string, newPassword: string): Promise<{ message: string }> {
    const res = await this.pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    const user = res.rows[0];
    if (!user) throw new UnauthorizedException('User not found');

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) throw new UnauthorizedException('Incorrect current password');

    const hashed = await bcrypt.hash(newPassword, 10);
    await this.pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashed, userId]);

    return { message: 'Password changed successfully' };
  }
}