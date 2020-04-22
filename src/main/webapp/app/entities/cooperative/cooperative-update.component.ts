import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICooperative, Cooperative } from 'app/shared/model/cooperative.model';
import { CooperativeService } from './cooperative.service';
import { IUserAccount } from 'app/shared/model/user-account.model';
import { UserAccountService } from 'app/entities/user-account/user-account.service';

@Component({
  selector: 'jhi-cooperative-update',
  templateUrl: './cooperative-update.component.html'
})
export class CooperativeUpdateComponent implements OnInit {
  isSaving = false;
  dgs: IUserAccount[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(64)]],
    geographicalArea: [null, [Validators.required, Validators.maxLength(64)]],
    dg: []
  });

  constructor(
    protected cooperativeService: CooperativeService,
    protected userAccountService: UserAccountService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cooperative }) => {
      this.updateForm(cooperative);

      this.userAccountService
        .query({ filter: 'cooperative-is-null' })
        .pipe(
          map((res: HttpResponse<IUserAccount[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IUserAccount[]) => {
          if (!cooperative.dg || !cooperative.dg.id) {
            this.dgs = resBody;
          } else {
            this.userAccountService
              .find(cooperative.dg.id)
              .pipe(
                map((subRes: HttpResponse<IUserAccount>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IUserAccount[]) => (this.dgs = concatRes));
          }
        });
    });
  }

  updateForm(cooperative: ICooperative): void {
    this.editForm.patchValue({
      id: cooperative.id,
      name: cooperative.name,
      geographicalArea: cooperative.geographicalArea,
      dg: cooperative.dg
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cooperative = this.createFromForm();
    if (cooperative.id !== undefined) {
      this.subscribeToSaveResponse(this.cooperativeService.update(cooperative));
    } else {
      this.subscribeToSaveResponse(this.cooperativeService.create(cooperative));
    }
  }

  private createFromForm(): ICooperative {
    return {
      ...new Cooperative(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      geographicalArea: this.editForm.get(['geographicalArea'])!.value,
      dg: this.editForm.get(['dg'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICooperative>>): void {
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
