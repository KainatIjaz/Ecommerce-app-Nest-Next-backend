// src/auth/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
//Injectable: makes this class usable as a provider.
//CanActivate: all guards must implement this interface (it has one method: canActivate).
//ExecutionContext: gives access to request details (like req.user).
//Reflector: lets us read metadata (like the roles we set with @Roles).
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
//A guard that checks if the logged-in user’s role (from JWT) matches the roles required by the route.
@Injectable()
export class RolesGuard implements CanActivate {
    //RolesGuard is a guard that checks roles.
//It injects Reflector to read metadata (@Roles).
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // no role restriction
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role);
  }
}
