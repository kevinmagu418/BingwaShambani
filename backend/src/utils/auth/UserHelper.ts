import bcrypt from 'bcrypt'

const MIN_LENGTH = 8;
const REGEX_UPPER   = /[A-Z]/;
const REGEX_LOWER   = /[a-z]/;
const REGEX_NUMBER  = /\d/;
const REGEX_SPECIAL = /[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]/;




 export class  userHelper {
  /** 
   * @param password plain password
   * 
   * @returns Promise<sring> bcrypt hash
   * 
   * 
  */






   static async hashPassword(password:string ):Promise<string>{
     const salt= 12
const hashed=await bcrypt.hash(password,salt)

return hashed;


   }




 /**
   * Compare a plain password with its hashed version.
   * @param plain   Raw password from login
   * @param hashed  Stored hash from database
   * @returns Promise<boolean> true if match
   */

static async  comparePassword(plain:string,hashed:string):Promise<boolean>{

return await bcrypt.compare(plain,hashed)

}

/**
 * @param password  Raw password for signup or change
 * @returns promise<boolean > true if strong
 */
static  StrengthChecker(password:string):boolean{
   return (password.length >=MIN_LENGTH && REGEX_UPPER.test(password)&& REGEX_LOWER.test(password) && REGEX_NUMBER.test(password)&&REGEX_SPECIAL.test(password));

}
 static assertStrong(password: string): void {
    if (!this.StrengthChecker(password)) {
      throw new Error(
        `Password must be ≥ ${MIN_LENGTH} chars and include upper, lower, number, and special character.`
      );
    }

}
 }