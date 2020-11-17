import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'NestJs Assessment / The Lucky App!!!'
  }
}