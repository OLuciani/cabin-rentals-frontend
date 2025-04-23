export interface RegisterUserDTO {
    name: string;
    email: string;
    password: string;
  }
  
  export interface RegisteredUser {
    _id: string;
    name: string;
    email: string;
  }