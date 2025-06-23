import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  handle(data: any) {
    return { message: 'Handled', data };
  }
}