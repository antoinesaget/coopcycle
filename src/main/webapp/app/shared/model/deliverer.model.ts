import { IUserAccount } from 'app/shared/model/user-account.model';
import { DelivererStatus } from 'app/shared/model/enumerations/deliverer-status.model';

export interface IDeliverer {
  id?: number;
  currentPosition?: string;
  transportType?: string;
  status?: DelivererStatus;
  account?: IUserAccount;
}

export class Deliverer implements IDeliverer {
  constructor(
    public id?: number,
    public currentPosition?: string,
    public transportType?: string,
    public status?: DelivererStatus,
    public account?: IUserAccount
  ) {}
}
