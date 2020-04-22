import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRestaurant, Restaurant } from 'app/shared/model/restaurant.model';
import { RestaurantService } from './restaurant.service';
import { ICooperative } from 'app/shared/model/cooperative.model';
import { CooperativeService } from 'app/entities/cooperative/cooperative.service';
import { IUserAccount } from 'app/shared/model/user-account.model';
import { UserAccountService } from 'app/entities/user-account/user-account.service';

type SelectableEntity = ICooperative | IUserAccount;

@Component({
  selector: 'jhi-restaurant-update',
  templateUrl: './restaurant-update.component.html'
})
export class RestaurantUpdateComponent implements OnInit {
  isSaving = false;
  cooperatives: ICooperative[] = [];
  useraccounts: IUserAccount[] = [];

  editForm = this.fb.group({
    id: [],
    adress: [null, [Validators.required, Validators.maxLength(64)]],
    cooperative: [],
    owner: []
  });

  constructor(
    protected restaurantService: RestaurantService,
    protected cooperativeService: CooperativeService,
    protected userAccountService: UserAccountService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ restaurant }) => {
      this.updateForm(restaurant);

      this.cooperativeService.query().subscribe((res: HttpResponse<ICooperative[]>) => (this.cooperatives = res.body || []));

      this.userAccountService.query().subscribe((res: HttpResponse<IUserAccount[]>) => (this.useraccounts = res.body || []));
    });
  }

  updateForm(restaurant: IRestaurant): void {
    this.editForm.patchValue({
      id: restaurant.id,
      adress: restaurant.adress,
      cooperative: restaurant.cooperative,
      owner: restaurant.owner
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const restaurant = this.createFromForm();
    if (restaurant.id !== undefined) {
      this.subscribeToSaveResponse(this.restaurantService.update(restaurant));
    } else {
      this.subscribeToSaveResponse(this.restaurantService.create(restaurant));
    }
  }

  private createFromForm(): IRestaurant {
    return {
      ...new Restaurant(),
      id: this.editForm.get(['id'])!.value,
      adress: this.editForm.get(['adress'])!.value,
      cooperative: this.editForm.get(['cooperative'])!.value,
      owner: this.editForm.get(['owner'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRestaurant>>): void {
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
