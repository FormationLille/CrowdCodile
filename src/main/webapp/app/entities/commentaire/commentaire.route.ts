import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Commentaire } from 'app/shared/model/commentaire.model';
import { CommentaireService } from './commentaire.service';
import { CommentaireComponent } from './commentaire.component';
import { CommentaireDetailComponent } from './commentaire-detail.component';
import { CommentaireUpdateComponent } from './commentaire-update.component';
import { CommentaireDeletePopupComponent } from './commentaire-delete-dialog.component';
import { ICommentaire } from 'app/shared/model/commentaire.model';

@Injectable({ providedIn: 'root' })
export class CommentaireResolve implements Resolve<ICommentaire> {
    constructor(private service: CommentaireService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICommentaire> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Commentaire>) => response.ok),
                map((commentaire: HttpResponse<Commentaire>) => commentaire.body)
            );
        }
        return of(new Commentaire());
    }
}

export const commentaireRoute: Routes = [
    {
        path: '',
        component: CommentaireComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'crowdCodileApp.commentaire.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CommentaireDetailComponent,
        resolve: {
            commentaire: CommentaireResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'crowdCodileApp.commentaire.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CommentaireUpdateComponent,
        resolve: {
            commentaire: CommentaireResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'crowdCodileApp.commentaire.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CommentaireUpdateComponent,
        resolve: {
            commentaire: CommentaireResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'crowdCodileApp.commentaire.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const commentairePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CommentaireDeletePopupComponent,
        resolve: {
            commentaire: CommentaireResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'crowdCodileApp.commentaire.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
