import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDeliverer } from 'app/shared/model/deliverer.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { DelivererService } from './deliverer.service';
import { DelivererDeleteDialogComponent } from './deliverer-delete-dialog.component';

@Component({
  selector: 'jhi-deliverer',
  templateUrl: './deliverer.component.html'
})
export class DelivererComponent implements OnInit, OnDestroy {
  deliverers: IDeliverer[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected delivererService: DelivererService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.deliverers = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.delivererService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IDeliverer[]>) => this.paginateDeliverers(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.deliverers = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDeliverers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDeliverer): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDeliverers(): void {
    this.eventSubscriber = this.eventManager.subscribe('delivererListModification', () => this.reset());
  }

  delete(deliverer: IDeliverer): void {
    const modalRef = this.modalService.open(DelivererDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.deliverer = deliverer;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateDeliverers(data: IDeliverer[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.deliverers.push(data[i]);
      }
    }
  }
}
