// src/repositories/interfaces/user.repository.interface.ts
import { type User } from '../../generated/prisma/index.js';
import {
  EmailRegisterDTO,
  OAuthRegisterDTO,
  UpdateUserDTO,
  CompleteProfileDTO,
  AdminUpdateUserDTO,
} from '../../domain/userDTO.js';   // adjust to your path alias or relative import

export interface IUserRepository {
  /*  Create */
  createEmailUser(data: EmailRegisterDTO): Promise<User>;
  createOAuthUser(data: OAuthRegisterDTO): Promise<User>;

  /*   Read - */
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;

  /* User‑side updates */
  selfUpdate(id: string, dto: CompleteProfileDTO): Promise<User>;

  /* -Critical backend updates  */
  update(id: string, dto: UpdateUserDTO): Promise<User>;

  /*  Admin‑only updates  */
  adminUpdate(id: string, dto: AdminUpdateUserDTO): Promise<User>;

  /*   Delete  */
  delete(id: string): Promise<void>;

verifyUserEmail(userId: string): Promise<User>;

findUserByVerificationCode(code: string): Promise<User | null>;

}
