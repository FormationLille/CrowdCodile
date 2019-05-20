import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDons } from 'app/shared/model/dons.model';
import { AccountService } from 'app/core';
import { DonsService } from './dons.service';

@Component({
    selector: 'jhi-dons',
    templateUrl: './dons.component.html'
})
export class DonsComponent implements OnInit, OnDestroy {
    dons: IDons[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected donsService: DonsService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.donsService
            .query()
            .pipe(
                filter((res: HttpResponse<IDons[]>) => res.ok),
                map((res: HttpResponse<IDons[]>) => res.body)
            )
            .subscribe(
                (res: IDons[]) => {
                    this.dons = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDons();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDons) {
        return item.id;
    }

    registerChangeInDons() {
        this.eventSubscriber = this.eventManager.subscribe('donsListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
