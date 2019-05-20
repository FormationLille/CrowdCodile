import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDons } from 'app/shared/model/dons.model';
import { DonsService } from './dons.service';

@Component({
    selector: 'jhi-dons-delete-dialog',
    templateUrl: './dons-delete-dialog.component.html'
})
export class DonsDeleteDialogComponent {
    dons: IDons;

    constructor(protected donsService: DonsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.donsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'donsListModification',
                content: 'Deleted an dons'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dons-delete-popup',
    template: ''
})
export class DonsDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dons }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DonsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.dons = dons;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/dons', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/dons', { outlets: { popup: null } }]);
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
