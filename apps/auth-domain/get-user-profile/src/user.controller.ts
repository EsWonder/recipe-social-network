import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import * as jwt from 'jsonwebtoken';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async getProfile(@Req() req) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) throw new UnauthorizedException('Token missing');

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret_key');
      return await this.userService.findProfileById(decoded.sub);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}