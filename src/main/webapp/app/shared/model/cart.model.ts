import { IProduct } from 'app/shared/model/product.model';
import { ICourse } from 'app/shared/model/course.model';
import { CartState } from 'app/shared/model/enumerations/cart-state.model';

export interface ICart {
  id?: number;
  sate?: CartState;
  products?: IProduct[];
  course?: ICourse;
}

export class Cart implements ICart {
  constructor(public id?: number, public sate?: CartState, public products?: IProduct[], public course?: ICourse) {}
}
