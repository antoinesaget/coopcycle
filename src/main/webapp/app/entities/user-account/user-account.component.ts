import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserAccount } from 'app/shared/model/user-account.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { UserAccountService } from './user-account.service';
import { UserAccountDeleteDialogComponent } from './user-account-delete-dialog.component';

@Component({
  selector: 'jhi-user-account',
  templateUrl: './user-account.component.html'
})
export class UserAccountComponent implements OnInit, OnDestroy {
  userAccounts: IUserAccount[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected userAccountService: UserAccountService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.userAccounts = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.userAccountService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IUserAccount[]>) => this.paginateUserAccounts(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.userAccounts = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUserAccounts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUserAccount): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUserAccounts(): void {
    this.eventSubscriber = this.eventManager.subscribe('userAccountListModification', () => this.reset());
  }

  delete(userAccount: IUserAccount): void {
    const modalRef = this.modalService.open(UserAccountDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userAccount = userAccount;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateUserAccounts(data: IUserAccount[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.userAccounts.push(data[i]);
      }
    }
  }
}
