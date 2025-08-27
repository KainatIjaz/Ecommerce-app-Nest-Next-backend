// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // sign up
  async signup(data: SignupDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        user_name: data.user_name,
        password: hashedPassword,
        role: data.role || 'USER',
      },
    });

    // generate JWT token with id + email + role + name
    const token = this.jwtService.sign({
      sub: user.user_id,     
      email: user.email,     
      role: user.role,       
      name: user.user_name,  
    });

    return { user, token };
  }

  // login
  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) throw new Error('User not found');

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw new Error('Invalid password');

    // generate JWT token 
    const token = this.jwtService.sign({
      sub: user.user_id,
      email: user.email,
      role: user.role,
      name: user.user_name,
    });

    return { user, token };
  }
}
