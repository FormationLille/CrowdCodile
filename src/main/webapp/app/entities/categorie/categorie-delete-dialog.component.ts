import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICategorie } from 'app/shared/model/categorie.model';
import { CategorieService } from './categorie.service';

@Component({
    selector: 'jhi-categorie-delete-dialog',
    templateUrl: './categorie-delete-dialog.component.html'
})
export class CategorieDeleteDialogComponent {
    categorie: ICategorie;

    constructor(
        protected categorieService: CategorieService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.categorieService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'categorieListModification',
                content: 'Deleted an categorie'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-categorie-delete-popup',
    template: ''
})
export class CategorieDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ categorie }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CategorieDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.categorie = categorie;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/categorie', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/categorie', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
