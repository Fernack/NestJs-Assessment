import { applyDecorators, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guards';

export function ValidateUser() {
  return applyDecorators(
    UseGuards(LocalAuthGuard)
  );
}