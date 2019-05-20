import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICommentaire } from 'app/shared/model/commentaire.model';
import { CommentaireService } from './commentaire.service';

@Component({
    selector: 'jhi-commentaire-delete-dialog',
    templateUrl: './commentaire-delete-dialog.component.html'
})
export class CommentaireDeleteDialogComponent {
    commentaire: ICommentaire;

    constructor(
        protected commentaireService: CommentaireService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.commentaireService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'commentaireListModification',
                content: 'Deleted an commentaire'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-commentaire-delete-popup',
    template: ''
})
export class CommentaireDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ commentaire }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CommentaireDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.commentaire = commentaire;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/commentaire', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/commentaire', { outlets: { popup: null } }]);
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
