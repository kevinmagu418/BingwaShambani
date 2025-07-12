
import { PrismaClient } from '@prisma/client';
import { type User }    from '../generated/prisma';


import { EmailRegisterDTO, 
  OAuthRegisterDTO,
  UpdateUserDTO,
  CompleteProfileDTO,
  AdminUpdateUserDTO} from '../domain/userDTO';
import { IUserRepository } from './interfaces/iuser.reository.interfaces';

export class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor(prisma?: PrismaClient) {
    this.prisma = prisma ?? new PrismaClient();
  }

  /*  CREATE */
  async createEmailUser(data: EmailRegisterDTO): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async createOAuthUser(data: OAuthRegisterDTO): Promise<User> {
    // assumes caller already inserted OAuthAccount or will link after
    return this.prisma.user.create({ data });
  }

  /* READ */
  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  /*  USER‑SIDE UPDATE  */
  async selfUpdate(id: string, dto: CompleteProfileDTO): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: dto });
  }

  /* SYSTEM / CRITICAL UPDATE */
  async update(id: string, dto: UpdateUserDTO): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: dto });
  }

  /* -ADMIN UPDATE  */
  async adminUpdate(id: string, dto: AdminUpdateUserDTO): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: dto });
  }

  /*  DELETE - */
  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
