export interface userDataType {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  avatar: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
}

export interface userRegisterDataType {
  username: string;
  fullName: string;
  email: string;
  password: string;
  avatar: string;
  coverImage: string;
}

export interface userLoginDataType {
  email?: string;
  username?: string;
  password: string;
}

export interface updatePasswordDataType {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export interface userInfoUpdateType {
  username?: string;
  fullName?: string;
  email?: string;
}
