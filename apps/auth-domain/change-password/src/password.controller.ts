import { Controller, Put, Body, Req, UnauthorizedException } from '@nestjs/common';
import { PasswordService } from './password.service';
import * as jwt from 'jsonwebtoken';

@Controller('user')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Put('change-password')
  async changePassword(@Body() body: { currentPassword: string, newPassword: string }, @Req() req) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) throw new UnauthorizedException('Token required');

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret_key');
      return await this.passwordService.updatePassword(decoded.sub, body.currentPassword, body.newPassword);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}