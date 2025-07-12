/*  enums you already have  */
export enum Role          { farmer = 'farmer', admin = 'admin', expert = 'expert' }
export enum AccountStatus { active = 'active', suspended = 'suspended', pending = 'pending' }

/* Common “base” fields  */
interface RegisterBase {
  username:      string;
  firstName:     string;
  lastName:      string;
  email:         string;
  role:          Role;          // usually 'farmer'
  country?:      string;
  county?:       string;
  constituency?: string;
  contact?:      string;
}

/*  Email / password sign‑up */
export interface EmailRegisterDTO extends RegisterBase {
  password: string;             // required here
}

/*  3 OAuth sign‑up (Google / GitHub)  */
export interface OAuthRegisterDTO extends RegisterBase {
  provider: 'google' | 'github';
  providerUserId: string;       // Google “sub” or GitHub numeric ID
  // password is omitted → cannot be provided
}


export interface UpdateUserDTO extends Partial<RegisterBase> {
  accountStatus?: AccountStatus;
  profilePic?:    string;
  resetToken?:    string;
}

export interface LoginDTO {
  email:    string;
  password: string;
}

export interface CompleteProfileDTO {
  country?:       string;
  county?:        string;
  constituency?:  string;
  contact?:       string;
  profilePic?:    string;
  onboarding?:    boolean;
}

export interface VerifyEmailDTO           { code: string }
export interface RequestContactOTPDTO     { contact: string }
export interface RequestPasswordResetDTO  { email: string }
export interface ResetPasswordDTO         { resetToken: string; newPassword: string }

export interface AdminUpdateUserDTO extends Partial<RegisterBase> {
  accountStatus?: AccountStatus;
  role?:          Role;
}
