import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICategorie } from 'app/shared/model/categorie.model';

@Component({
    selector: 'jhi-categorie-detail',
    templateUrl: './categorie-detail.component.html'
})
export class CategorieDetailComponent implements OnInit {
    categorie: ICategorie;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ categorie }) => {
            this.categorie = categorie;
        });
    }

    previousState() {
        window.history.back();
    }
}
