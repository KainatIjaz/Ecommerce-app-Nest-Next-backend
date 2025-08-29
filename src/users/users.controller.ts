import { Controller, Get, Post,Patch,Param, Delete,Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() body: { email: string; user_name: string; password: string; role: string }) {
    return this.usersService.create(body);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: { email?: string; user_name?: string; password?: string; role?: string },
  ) {
    return this.usersService.update(id, body);
  }
  @Delete(':id') //  DELETE request with user_id as a parameter
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

}
