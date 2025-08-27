// src/auth/auth.controller.ts
import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth') 
export class AuthController {
  constructor(private authService: AuthService) {}

  
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  
  @Get('profile')
  @UseGuards(AuthGuard('jwt')) // only accessible with valid JWT
  getProfile(@Request() req) {
    // req.user comes from JwtStrategy.validate():userid,email e.t.c
    return req.user;
  }
}
