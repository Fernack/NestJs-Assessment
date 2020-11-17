import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { User, Auth, ValidateUser } from 'src/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ValidateUser()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Auth()
  @Get('profile')
  profile(@User() user: any) {
    return {
      id: user.id,
      name: user.name,    
      address: {    
        street: user.street,
        city: user.city,
        country: user.country
      }   
    };
  }
}