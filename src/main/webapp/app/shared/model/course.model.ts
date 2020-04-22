import { ICart } from 'app/shared/model/cart.model';
import { IPayment } from 'app/shared/model/payment.model';
import { IRestaurant } from 'app/shared/model/restaurant.model';
import { IDeliverer } from 'app/shared/model/deliverer.model';
import { IUserAccount } from 'app/shared/model/user-account.model';
import { CourseState } from 'app/shared/model/enumerations/course-state.model';
import { DeliveryState } from 'app/shared/model/enumerations/delivery-state.model';

export interface ICourse {
  id?: number;
  state?: CourseState;
  deliveryState?: DeliveryState;
  prepTime?: number;
  deliveryTime?: number;
  deliveryDetails?: string;
  cart?: ICart;
  payments?: IPayment[];
  restaurant?: IRestaurant;
  deliverer?: IDeliverer;
  client?: IUserAccount;
}

export class Course implements ICourse {
  constructor(
    public id?: number,
    public state?: CourseState,
    public deliveryState?: DeliveryState,
    public prepTime?: number,
    public deliveryTime?: number,
    public deliveryDetails?: string,
    public cart?: ICart,
    public payments?: IPayment[],
    public restaurant?: IRestaurant,
    public deliverer?: IDeliverer,
    public client?: IUserAccount
  ) {}
}
