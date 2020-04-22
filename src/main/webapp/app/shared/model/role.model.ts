import { IUserAccount } from 'app/shared/model/user-account.model';
import { RoleEnum } from 'app/shared/model/enumerations/role-enum.model';

export interface IRole {
  id?: number;
  role?: RoleEnum;
  users?: IUserAccount[];
}

export class Role implements IRole {
  constructor(public id?: number, public role?: RoleEnum, public users?: IUserAccount[]) {}
}
