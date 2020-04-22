import { IUserAccount } from 'app/shared/model/user-account.model';
import { IRestaurant } from 'app/shared/model/restaurant.model';

export interface ICooperative {
  id?: number;
  name?: string;
  geographicalArea?: string;
  dg?: IUserAccount;
  members?: IUserAccount[];
  restaurants?: IRestaurant[];
}

export class Cooperative implements ICooperative {
  constructor(
    public id?: number,
    public name?: string,
    public geographicalArea?: string,
    public dg?: IUserAccount,
    public members?: IUserAccount[],
    public restaurants?: IRestaurant[]
  ) {}
}
