import { IRestaurant } from 'app/shared/model/restaurant.model';
import { IRole } from 'app/shared/model/role.model';
import { ICooperative } from 'app/shared/model/cooperative.model';

export interface IUserAccount {
  id?: number;
  mail?: string;
  adress?: string;
  login?: string;
  password?: string;
  restaurants?: IRestaurant[];
  roles?: IRole[];
  cooperative?: ICooperative;
}

export class UserAccount implements IUserAccount {
  constructor(
    public id?: number,
    public mail?: string,
    public adress?: string,
    public login?: string,
    public password?: string,
    public restaurants?: IRestaurant[],
    public roles?: IRole[],
    public cooperative?: ICooperative
  ) {}
}
