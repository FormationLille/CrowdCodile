import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ICommentaire } from 'app/shared/model/commentaire.model';
import { CommentaireService } from './commentaire.service';
import { IProfil } from 'app/shared/model/profil.model';
import { ProfilService } from 'app/entities/profil';
import { IProjet } from 'app/shared/model/projet.model';
import { ProjetService } from 'app/entities/projet';

@Component({
    selector: 'jhi-commentaire-update',
    templateUrl: './commentaire-update.component.html'
})
export class CommentaireUpdateComponent implements OnInit {
    commentaire: ICommentaire;
    isSaving: boolean;

    profils: IProfil[];

    projets: IProjet[];
    dateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected commentaireService: CommentaireService,
        protected profilService: ProfilService,
        protected projetService: ProjetService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ commentaire }) => {
            this.commentaire = commentaire;
        });
        this.profilService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProfil[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProfil[]>) => response.body)
            )
            .subscribe((res: IProfil[]) => (this.profils = res), (res: HttpErrorResponse) => this.onError(res.message));
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
        if (this.commentaire.id !== undefined) {
            this.subscribeToSaveResponse(this.commentaireService.update(this.commentaire));
        } else {
            this.subscribeToSaveResponse(this.commentaireService.create(this.commentaire));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommentaire>>) {
        result.subscribe((res: HttpResponse<ICommentaire>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProfilById(index: number, item: IProfil) {
        return item.id;
    }

    trackProjetById(index: number, item: IProjet) {
        return item.id;
    }
}
