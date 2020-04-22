import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IUserAccount, UserAccount } from 'app/shared/model/user-account.model';
import { UserAccountService } from './user-account.service';
import { IRole } from 'app/shared/model/role.model';
import { RoleService } from 'app/entities/role/role.service';
import { ICooperative } from 'app/shared/model/cooperative.model';
import { CooperativeService } from 'app/entities/cooperative/cooperative.service';

type SelectableEntity = IRole | ICooperative;

@Component({
  selector: 'jhi-user-account-update',
  templateUrl: './user-account-update.component.html'
})
export class UserAccountUpdateComponent implements OnInit {
  isSaving = false;
  roles: IRole[] = [];
  cooperatives: ICooperative[] = [];

  editForm = this.fb.group({
    id: [],
    mail: [null, [Validators.required, Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')]],
    adress: [],
    login: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(32)]],
    password: [null, [Validators.required, Validators.minLength(8)]],
    roles: [],
    cooperative: []
  });

  constructor(
    protected userAccountService: UserAccountService,
    protected roleService: RoleService,
    protected cooperativeService: CooperativeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userAccount }) => {
      this.updateForm(userAccount);

      this.roleService.query().subscribe((res: HttpResponse<IRole[]>) => (this.roles = res.body || []));

      this.cooperativeService.query().subscribe((res: HttpResponse<ICooperative[]>) => (this.cooperatives = res.body || []));
    });
  }

  updateForm(userAccount: IUserAccount): void {
    this.editForm.patchValue({
      id: userAccount.id,
      mail: userAccount.mail,
      adress: userAccount.adress,
      login: userAccount.login,
      password: userAccount.password,
      roles: userAccount.roles,
      cooperative: userAccount.cooperative
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userAccount = this.createFromForm();
    if (userAccount.id !== undefined) {
      this.subscribeToSaveResponse(this.userAccountService.update(userAccount));
    } else {
      this.subscribeToSaveResponse(this.userAccountService.create(userAccount));
    }
  }

  private createFromForm(): IUserAccount {
    return {
      ...new UserAccount(),
      id: this.editForm.get(['id'])!.value,
      mail: this.editForm.get(['mail'])!.value,
      adress: this.editForm.get(['adress'])!.value,
      login: this.editForm.get(['login'])!.value,
      password: this.editForm.get(['password'])!.value,
      roles: this.editForm.get(['roles'])!.value,
      cooperative: this.editForm.get(['cooperative'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserAccount>>): void {
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

  getSelected(selectedVals: IRole[], option: IRole): IRole {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
