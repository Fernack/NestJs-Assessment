import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const user = await this.userService.findOne(username);

      if (user && (compare(pass, user.password))) {
        const { password, ...rest } = user;
        return rest;
      }  
    } 
    catch (error) {}
    
    return null;
  }

  login(loginDto: LoginDto) {
    const payload = { sub: loginDto.username };

    return this.jwtService.sign(payload);
  }
}