import { Injectable } from '@nestjs/common';
import { Payload } from './payload';
import { sign } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signPayload(payload: Payload) {
    return sign(payload, jwtConstants.secret, { expiresIn: '7d' });
  }
  async validateUser(payload: Payload) {
    return await this.usersService.findByPayload(payload);
  }

}
