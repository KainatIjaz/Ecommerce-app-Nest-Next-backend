// src/auth/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
//function used to attach custom metadata to routes
export const ROLES_KEY = 'roles';
//define a key name (roles) for our metadata
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
