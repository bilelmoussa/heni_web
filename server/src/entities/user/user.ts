import { BadRequest } from '../../errors'
export enum UserRoles {
    Standard,
    Admin,
}

export type TUserRoles =
    UserRoles.Standard |
    UserRoles.Admin;

type fullNameType = {
    firstName: string,
    lastName: string,
};

export type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  role: TUserRoles;
  password: string;
  repeatPassword: string;
  date: Date;
}

/**
 * User class
*/
export class User {
    public fullName: fullNameType;
    public email: string;
    public role: TUserRoles;
    public password: string;
    public repeatPassword: string;
    public createdOn: Date;
    public modifiedOn: Date;
    static error: string;
    static md5: Function;
    static hash: Function;
    /**
     * User class constructor
     * @param {Function} userValidate
     * @param {Function} md5
     * @param {Function} hash
     * @param {UserType} user
    */
    constructor(
        userValidate: Function,
        md5: Function,
        hash: Function,
        user: UserType,
    ) {
      User.md5 = md5;
      User.hash = hash;
      this.fullName= {firstName: user.firstName, lastName: user.lastName};
      this.email = user.email;
      this.role = user.role || UserRoles.Standard;
      this.password = user.password;
      this.repeatPassword = user.repeatPassword;
      this.createdOn = user.date;
      this.modifiedOn = user.date;
      if (this.repeatPassword === undefined) {
        throw new BadRequest('"repeatPassword" is required');
      }
      User.error = userValidate({
        fullName: this.fullName,
        email: this.email,
        role: this.role,
        password: this.password,
        repeatPassword: this.repeatPassword,
        createdOn: this.createdOn,
        modifiedOn: this.modifiedOn,
      });
      if (User.error) throw new BadRequest(User.error);
    }
    /**
     * makeHash function
     * @return {Promise<string>} return hash
    */
    async makeHash(): Promise<string> {
      return await User.md5(
          this.fullName.firstName +
          this.fullName.lastName +
          this.email +
          this.role,
      );
    };
    /**
     * make password hash function
     * @return {Promise<string>} return password hash
    */
    async makePswHash(): Promise<string> {
      return await User.hash(this.password);
    };
}

