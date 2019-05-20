import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { INews } from 'app/shared/model/news.model';
import { NewsService } from './news.service';
import { IProjet } from 'app/shared/model/projet.model';
import { ProjetService } from 'app/entities/projet';

@Component({
    selector: 'jhi-news-update',
    templateUrl: './news-update.component.html'
})
export class NewsUpdateComponent implements OnInit {
    news: INews;
    isSaving: boolean;

    projets: IProjet[];
    dateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected newsService: NewsService,
        protected projetService: ProjetService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ news }) => {
            this.news = news;
        });
        this.projetService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProjet[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProjet[]>) => response.body)
            )
            .subscribe((res: IProjet[]) => (this.projets = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.news.id !== undefined) {
            this.subscribeToSaveResponse(this.newsService.update(this.news));
        } else {
            this.subscribeToSaveResponse(this.newsService.create(this.news));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<INews>>) {
        result.subscribe((res: HttpResponse<INews>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackProjetById(index: number, item: IProjet) {
        return item.id;
    }
}
