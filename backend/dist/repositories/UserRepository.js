import { PrismaClient } from '../generated/prisma/index.js';
export class PrismaUserRepository {
    constructor(prisma) {
        this.prisma = prisma ?? new PrismaClient();
    }
    /*  CREATE */
    async createEmailUser(dto) {
        const data = {
            username: dto.username,
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            password: dto.password, // already hashed by service
            role: dto.role,
            country: dto.country,
            county: dto.county,
            constituency: dto.constituency,
            contact: dto.contact,
            code: dto.code,
            verificationTokenExpiresAt: dto.verificationExpiry,
        };
        return this.prisma.user.create({ data });
    }
    async createOAuthUser(dto) {
        const data = {
            username: dto.username,
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            password: null, // social users have no pwd
            role: dto.role,
            country: dto.country,
            county: dto.county,
            constituency: dto.constituency,
            contact: dto.contact,
            isVerified: dto.isVerified ?? true, // auto‑verified
            // instantly “verified”
        };
        return this.prisma.user.create({ data });
    }
    /* READ */
    async findById(id) {
        return this.prisma.user.findUnique({ where: { id } });
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }
    /*  USER‑SIDE UPDATE  */
    async selfUpdate(id, dto) {
        return this.prisma.user.update({ where: { id }, data: dto });
    }
    /* SYSTEM / CRITICAL UPDATE */
    async update(id, dto) {
        return this.prisma.user.update({ where: { id }, data: dto });
    }
    /* -ADMIN UPDATE  */
    async adminUpdate(id, dto) {
        return this.prisma.user.update({ where: { id }, data: dto });
    }
    /*  DELETE - */
    async delete(id) {
        await this.prisma.user.delete({ where: { id } });
    }
    /* Find OAuthAccount by provider+id */
    async findOAuth(provider, providerUserId) {
        return this.prisma.oAuthAccount.findUnique({
            where: { provider_providerUserId: { provider, providerUserId } },
            include: { user: true },
        });
    }
    /* Link an account */
    async linkOAuthAccount(provider, providerUserId, userId) {
        return this.prisma.oAuthAccount.create({
            data: { provider, providerUserId, userId },
        });
    }
    async findUserByVerificationCode(code) {
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
    async verifyUserEmail(userId) {
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
