
import { PrismaClient,Prisma } from '../generated/prisma/index.js';
import { type User }    from '../generated/prisma/index.js';


import { EmailRegisterDTO, 
  OAuthRegisterDTO,
  UpdateUserDTO,
  CompleteProfileDTO,
  AdminUpdateUserDTO} from '../domain/userDTO.js';
import { IUserRepository } from './interfaces/iuser.reository.interfaces.js';

export class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor(prisma?: PrismaClient) {
    this.prisma = prisma ?? new PrismaClient();
  }

  /*  CREATE */
  async createEmailUser(dto: EmailRegisterDTO): Promise<User> {
    const data: Prisma.UserCreateInput = {
      username : dto.username,
      firstName: dto.firstName,
      lastName : dto.lastName,
      email    : dto.email,
      password : dto.password,                   // already hashed by service
      role     : dto.role,
      country       : dto.country,
      county        : dto.county,
      constituency  : dto.constituency,
      contact       : dto.contact,
      code        :dto.code,
      verificationTokenExpiresAt :dto.verificationExpiry,
    };

    return this.prisma.user.create({ data });
  }

 async createOAuthUser(dto: OAuthRegisterDTO): Promise<User> {
    const data: Prisma.UserCreateInput = {
      username : dto.username,
      firstName: dto.firstName,
      lastName : dto.lastName,
      email    : dto.email,
      password : null,                            // social users have no pwd
      role     : dto.role,

      country       : dto.country,
      county        : dto.county,
      constituency  : dto.constituency,
      contact       : dto.contact,

      isVerified: dto.isVerified ?? true,         // auto‑verified

   // instantly “verified”
    };

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

/* Find OAuthAccount by provider+id */
  async findOAuth(
    provider: 'github' | 'google',
    providerUserId: string
  ) {
    return this.prisma.oAuthAccount.findUnique({
      where: { provider_providerUserId: { provider, providerUserId } },
      include: { user: true },
    });
  }
 /* Link an account */
  async linkOAuthAccount(
    provider: 'github' | 'google',
    providerUserId: string,
    userId: string
  ) {
    return this.prisma.oAuthAccount.create({
      data: { provider, providerUserId, userId },
    });
  }


async findUserByVerificationCode(code: string): Promise<User | null> {
  return this.prisma.user.findFirst({
    where: {
      code,
      isVerified: false,
      verificationTokenExpiresAt: {
        gt: new Date(), // only accept valid non-expired codes
      },
    },
  });
}
async verifyUserEmail(userId: string): Promise<User> {
  return this.prisma.user.update({
    where: { id: userId },
    data: {
      isVerified: true,
      code: null,
      verificationTokenExpiresAt: null,
    },
  });
}



}
