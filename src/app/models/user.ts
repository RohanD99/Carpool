export class User {
    userId: number;
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
  
    constructor(args: any = {}) {
      args = args || {};
      this.userId = args.userId;
      this.email = args.email ;
      this.password = args.password ;
      this.confirmPassword = args.confirmPassword;
      this.firstName = args.firstName;
      this.lastName = args.lastName
    }
  }
  