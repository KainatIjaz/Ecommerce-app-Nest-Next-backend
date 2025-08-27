// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //the strategy will read the token
      ignoreExpiration: false,
      secretOrKey: 'MY_SECRET_KEY', 
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub,
         email: payload.email, 
         name: payload.name, 
         role: payload.role };
  }
}
