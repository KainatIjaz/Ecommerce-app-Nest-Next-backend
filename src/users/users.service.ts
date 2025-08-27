import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  create(data: { email: string; user_name: string; password: string; role: string }) {
    return this.prisma.user.create({ data });
  }

  update(id: string, data: { email?: string; user_name?: string; password?: string; role?: string }) {
    return this.prisma.user.update({
      where: { user_id: id },
      data,
    });}

    async remove(id: string) {
    return this.prisma.user.delete({
      where: { user_id: id },
    });
  }
}
