import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICourse, Course } from 'app/shared/model/course.model';
import { CourseService } from './course.service';
import { ICart } from 'app/shared/model/cart.model';
import { CartService } from 'app/entities/cart/cart.service';
import { IRestaurant } from 'app/shared/model/restaurant.model';
import { RestaurantService } from 'app/entities/restaurant/restaurant.service';
import { IDeliverer } from 'app/shared/model/deliverer.model';
import { DelivererService } from 'app/entities/deliverer/deliverer.service';
import { IUserAccount } from 'app/shared/model/user-account.model';
import { UserAccountService } from 'app/entities/user-account/user-account.service';

type SelectableEntity = ICart | IRestaurant | IDeliverer | IUserAccount;

@Component({
  selector: 'jhi-course-update',
  templateUrl: './course-update.component.html'
})
export class CourseUpdateComponent implements OnInit {
  isSaving = false;
  carts: ICart[] = [];
  restaurants: IRestaurant[] = [];
  deliverers: IDeliverer[] = [];
  useraccounts: IUserAccount[] = [];

  editForm = this.fb.group({
    id: [],
    state: [null, [Validators.required]],
    deliveryState: [null, [Validators.required]],
    prepTime: [],
    deliveryTime: [],
    deliveryDetails: [],
    cart: [],
    restaurant: [],
    deliverer: [],
    client: []
  });

  constructor(
    protected courseService: CourseService,
    protected cartService: CartService,
    protected restaurantService: RestaurantService,
    protected delivererService: DelivererService,
    protected userAccountService: UserAccountService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ course }) => {
      this.updateForm(course);

      this.cartService
        .query({ filter: 'course-is-null' })
        .pipe(
          map((res: HttpResponse<ICart[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICart[]) => {
          if (!course.cart || !course.cart.id) {
            this.carts = resBody;
          } else {
            this.cartService
              .find(course.cart.id)
              .pipe(
                map((subRes: HttpResponse<ICart>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICart[]) => (this.carts = concatRes));
          }
        });

      this.restaurantService.query().subscribe((res: HttpResponse<IRestaurant[]>) => (this.restaurants = res.body || []));

      this.delivererService.query().subscribe((res: HttpResponse<IDeliverer[]>) => (this.deliverers = res.body || []));

      this.userAccountService.query().subscribe((res: HttpResponse<IUserAccount[]>) => (this.useraccounts = res.body || []));
    });
  }

  updateForm(course: ICourse): void {
    this.editForm.patchValue({
      id: course.id,
      state: course.state,
      deliveryState: course.deliveryState,
      prepTime: course.prepTime,
      deliveryTime: course.deliveryTime,
      deliveryDetails: course.deliveryDetails,
      cart: course.cart,
      restaurant: course.restaurant,
      deliverer: course.deliverer,
      client: course.client
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const course = this.createFromForm();
    if (course.id !== undefined) {
      this.subscribeToSaveResponse(this.courseService.update(course));
    } else {
      this.subscribeToSaveResponse(this.courseService.create(course));
    }
  }

  private createFromForm(): ICourse {
    return {
      ...new Course(),
      id: this.editForm.get(['id'])!.value,
      state: this.editForm.get(['state'])!.value,
      deliveryState: this.editForm.get(['deliveryState'])!.value,
      prepTime: this.editForm.get(['prepTime'])!.value,
      deliveryTime: this.editForm.get(['deliveryTime'])!.value,
      deliveryDetails: this.editForm.get(['deliveryDetails'])!.value,
      cart: this.editForm.get(['cart'])!.value,
      restaurant: this.editForm.get(['restaurant'])!.value,
      deliverer: this.editForm.get(['deliverer'])!.value,
      client: this.editForm.get(['client'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICourse>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
