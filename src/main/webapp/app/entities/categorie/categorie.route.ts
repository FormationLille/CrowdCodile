import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Categorie } from 'app/shared/model/categorie.model';
import { CategorieService } from './categorie.service';
import { CategorieComponent } from './categorie.component';
import { CategorieDetailComponent } from './categorie-detail.component';
import { CategorieUpdateComponent } from './categorie-update.component';
import { CategorieDeletePopupComponent } from './categorie-delete-dialog.component';
import { ICategorie } from 'app/shared/model/categorie.model';

@Injectable({ providedIn: 'root' })
export class CategorieResolve implements Resolve<ICategorie> {
    constructor(private service: CategorieService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICategorie> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Categorie>) => response.ok),
                map((categorie: HttpResponse<Categorie>) => categorie.body)
            );
        }
        return of(new Categorie());
    }
}

export const categorieRoute: Routes = [
    {
        path: '',
        component: CategorieComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'crowdCodileApp.categorie.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CategorieDetailComponent,
        resolve: {
            categorie: CategorieResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'crowdCodileApp.categorie.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CategorieUpdateComponent,
        resolve: {
            categorie: CategorieResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'crowdCodileApp.categorie.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CategorieUpdateComponent,
        resolve: {
            categorie: CategorieResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'crowdCodileApp.categorie.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categoriePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CategorieDeletePopupComponent,
        resolve: {
            categorie: CategorieResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'crowdCodileApp.categorie.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
