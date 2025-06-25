import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Pool } from 'pg';

@Injectable()
export class AuthService {
  private pool: Pool;

  constructor(private readonly jwtService: JwtService) {
    this.pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'auth_db',
    });
  }

  async validateUser(email: string, password: string): Promise<{ access_token: string } | null> {
    const res = await this.pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = res.rows[0];
    if (!user) return null;

    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}