import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IProfil } from 'app/shared/model/profil.model';
import { ProfilService } from './profil.service';
import { IUser, UserService } from 'app/core';
import { IProjet } from 'app/shared/model/projet.model';
import { ProjetService } from 'app/entities/projet';

@Component({
    selector: 'jhi-profil-update',
    templateUrl: './profil-update.component.html'
})
export class ProfilUpdateComponent implements OnInit {
    profil: IProfil;
    isSaving: boolean;

    users: IUser[];

    projets: IProjet[];
    dateInscriptionDp: any;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected profilService: ProfilService,
        protected userService: UserService,
        protected projetService: ProjetService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ profil }) => {
            this.profil = profil;
        });
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.projetService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProjet[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProjet[]>) => response.body)
            )
            .subscribe((res: IProjet[]) => (this.projets = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.profil, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.profil.id !== undefined) {
            this.subscribeToSaveResponse(this.profilService.update(this.profil));
        } else {
            this.subscribeToSaveResponse(this.profilService.create(this.profil));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfil>>) {
        result.subscribe((res: HttpResponse<IProfil>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
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
