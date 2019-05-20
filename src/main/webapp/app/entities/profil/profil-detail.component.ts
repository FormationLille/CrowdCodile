import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IProfil } from 'app/shared/model/profil.model';

@Component({
    selector: 'jhi-profil-detail',
    templateUrl: './profil-detail.component.html'
})
export class ProfilDetailComponent implements OnInit {
    profil: IProfil;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ profil }) => {
            this.profil = profil;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
