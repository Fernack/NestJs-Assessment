import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dtos';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Post()
    async addNewUser(@Body() dto: CreateUserDto) {
      try {
        const data = await this.userService.addNewUser(dto);
        return { message: 'User created', data };  
      } 
      catch (error) {
        throw new BadRequestException(error);
      }
    }
}
