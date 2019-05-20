import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICategorie } from 'app/shared/model/categorie.model';
import { CategorieService } from './categorie.service';
import { IProjet } from 'app/shared/model/projet.model';
import { ProjetService } from 'app/entities/projet';

@Component({
    selector: 'jhi-categorie-update',
    templateUrl: './categorie-update.component.html'
})
export class CategorieUpdateComponent implements OnInit {
    categorie: ICategorie;
    isSaving: boolean;

    projets: IProjet[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected categorieService: CategorieService,
        protected projetService: ProjetService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ categorie }) => {
            this.categorie = categorie;
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
        if (this.categorie.id !== undefined) {
            this.subscribeToSaveResponse(this.categorieService.update(this.categorie));
        } else {
            this.subscribeToSaveResponse(this.categorieService.create(this.categorie));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategorie>>) {
        result.subscribe((res: HttpResponse<ICategorie>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    getSelected(selectedVals: Array<any>, option: any) {
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
