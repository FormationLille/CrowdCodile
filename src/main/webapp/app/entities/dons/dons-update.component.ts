import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IDons } from 'app/shared/model/dons.model';
import { DonsService } from './dons.service';
import { IProjet } from 'app/shared/model/projet.model';
import { ProjetService } from 'app/entities/projet';
import { IProfil } from 'app/shared/model/profil.model';
import { ProfilService } from 'app/entities/profil';

@Component({
    selector: 'jhi-dons-update',
    templateUrl: './dons-update.component.html'
})
export class DonsUpdateComponent implements OnInit {
    dons: IDons;
    isSaving: boolean;

    projets: IProjet[];

    profils: IProfil[];
    dateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected donsService: DonsService,
        protected projetService: ProjetService,
        protected profilService: ProfilService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ dons }) => {
            this.dons = dons;
        });
        this.projetService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProjet[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProjet[]>) => response.body)
            )
            .subscribe((res: IProjet[]) => (this.projets = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.profilService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProfil[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProfil[]>) => response.body)
            )
            .subscribe((res: IProfil[]) => (this.profils = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.dons.id !== undefined) {
            this.subscribeToSaveResponse(this.donsService.update(this.dons));
        } else {
            this.subscribeToSaveResponse(this.donsService.create(this.dons));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDons>>) {
        result.subscribe((res: HttpResponse<IDons>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProfilById(index: number, item: IProfil) {
        return item.id;
    }
}
