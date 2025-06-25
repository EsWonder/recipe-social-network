import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class UserService {
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

  async findProfileById(id: number): Promise<any> {
    const res = await this.pool.query('SELECT id, name, email FROM users WHERE id = $1', [id]);
    return res.rows[0];
  }
}