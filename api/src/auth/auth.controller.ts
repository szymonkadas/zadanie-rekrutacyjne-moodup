import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Request() req) {
    const { email, password } = req.body;
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const userExists = await this.usersService.findOne(email);
    if (userExists) {
      return { message: 'User already exists' };
    }
    await this.usersService.create(email, password);
    return this.authService.login(email, password);
  }
}
