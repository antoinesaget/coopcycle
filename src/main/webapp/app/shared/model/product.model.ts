import { IRestaurant } from 'app/shared/model/restaurant.model';
import { ICart } from 'app/shared/model/cart.model';
import { ProductAvailability } from 'app/shared/model/enumerations/product-availability.model';

export interface IProduct {
  id?: number;
  name?: string;
  price?: number;
  availability?: ProductAvailability;
  restaurant?: IRestaurant;
  carts?: ICart[];
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public price?: number,
    public availability?: ProductAvailability,
    public restaurant?: IRestaurant,
    public carts?: ICart[]
  ) {}
}
