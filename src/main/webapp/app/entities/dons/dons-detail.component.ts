import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDons } from 'app/shared/model/dons.model';

@Component({
    selector: 'jhi-dons-detail',
    templateUrl: './dons-detail.component.html'
})
export class DonsDetailComponent implements OnInit {
    dons: IDons;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dons }) => {
            this.dons = dons;
        });
    }

    previousState() {
        window.history.back();
    }
}
