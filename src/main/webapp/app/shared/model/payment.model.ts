import { ICourse } from 'app/shared/model/course.model';
import { PaymentState } from 'app/shared/model/enumerations/payment-state.model';
import { PaymentMethod } from 'app/shared/model/enumerations/payment-method.model';

export interface IPayment {
  id?: number;
  state?: PaymentState;
  method?: PaymentMethod;
  course?: ICourse;
}

export class Payment implements IPayment {
  constructor(public id?: number, public state?: PaymentState, public method?: PaymentMethod, public course?: ICourse) {}
}
