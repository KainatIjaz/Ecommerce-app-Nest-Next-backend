// src/user/user.controller.ts
import { Controller, Get, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('user')
export class UserController {
  
  // Any logged-in user can access
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req: any) {
    return req.user;
  }

  //  Only Admins can delete
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Delete('delete')
  deleteUser(@Req() req: any) {
    return { message: `User ${req.user.email} deleted (admin only)` };
  }
}
