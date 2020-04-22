import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICooperative } from 'app/shared/model/cooperative.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { CooperativeService } from './cooperative.service';
import { CooperativeDeleteDialogComponent } from './cooperative-delete-dialog.component';

@Component({
  selector: 'jhi-cooperative',
  templateUrl: './cooperative.component.html'
})
export class CooperativeComponent implements OnInit, OnDestroy {
  cooperatives: ICooperative[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected cooperativeService: CooperativeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.cooperatives = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.cooperativeService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ICooperative[]>) => this.paginateCooperatives(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.cooperatives = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCooperatives();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICooperative): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCooperatives(): void {
    this.eventSubscriber = this.eventManager.subscribe('cooperativeListModification', () => this.reset());
  }

  delete(cooperative: ICooperative): void {
    const modalRef = this.modalService.open(CooperativeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cooperative = cooperative;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateCooperatives(data: ICooperative[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.cooperatives.push(data[i]);
      }
    }
  }
}
