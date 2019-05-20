import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProfil } from 'app/shared/model/profil.model';
import { ProfilService } from './profil.service';

@Component({
    selector: 'jhi-profil-delete-dialog',
    templateUrl: './profil-delete-dialog.component.html'
})
export class ProfilDeleteDialogComponent {
    profil: IProfil;

    constructor(protected profilService: ProfilService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.profilService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'profilListModification',
                content: 'Deleted an profil'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-profil-delete-popup',
    template: ''
})
export class ProfilDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ profil }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProfilDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.profil = profil;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/profil', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/profil', { outlets: { popup: null } }]);
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
