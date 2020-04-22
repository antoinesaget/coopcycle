import { ICooperative } from 'app/shared/model/cooperative.model';
import { IUserAccount } from 'app/shared/model/user-account.model';

export interface IRestaurant {
  id?: number;
  adress?: string;
  cooperative?: ICooperative;
  owner?: IUserAccount;
}

export class Restaurant implements IRestaurant {
  constructor(public id?: number, public adress?: string, public cooperative?: ICooperative, public owner?: IUserAccount) {}
}
