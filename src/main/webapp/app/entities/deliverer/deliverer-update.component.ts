import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDeliverer, Deliverer } from 'app/shared/model/deliverer.model';
import { DelivererService } from './deliverer.service';
import { IUserAccount } from 'app/shared/model/user-account.model';
import { UserAccountService } from 'app/entities/user-account/user-account.service';

@Component({
  selector: 'jhi-deliverer-update',
  templateUrl: './deliverer-update.component.html'
})
export class DelivererUpdateComponent implements OnInit {
  isSaving = false;
  useraccounts: IUserAccount[] = [];

  editForm = this.fb.group({
    id: [],
    currentPosition: [null, [Validators.required, Validators.maxLength(64)]],
    transportType: [null, [Validators.required, Validators.maxLength(64)]],
    status: [null, [Validators.required]],
    account: []
  });

  constructor(
    protected delivererService: DelivererService,
    protected userAccountService: UserAccountService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deliverer }) => {
      this.updateForm(deliverer);

      this.userAccountService.query().subscribe((res: HttpResponse<IUserAccount[]>) => (this.useraccounts = res.body || []));
    });
  }

  updateForm(deliverer: IDeliverer): void {
    this.editForm.patchValue({
      id: deliverer.id,
      currentPosition: deliverer.currentPosition,
      transportType: deliverer.transportType,
      status: deliverer.status,
      account: deliverer.account
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const deliverer = this.createFromForm();
    if (deliverer.id !== undefined) {
      this.subscribeToSaveResponse(this.delivererService.update(deliverer));
    } else {
      this.subscribeToSaveResponse(this.delivererService.create(deliverer));
    }
  }

  private createFromForm(): IDeliverer {
    return {
      ...new Deliverer(),
      id: this.editForm.get(['id'])!.value,
      currentPosition: this.editForm.get(['currentPosition'])!.value,
      transportType: this.editForm.get(['transportType'])!.value,
      status: this.editForm.get(['status'])!.value,
      account: this.editForm.get(['account'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDeliverer>>): void {
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

  trackById(index: number, item: IUserAccount): any {
    return item.id;
  }
}
