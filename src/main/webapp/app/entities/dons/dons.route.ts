import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Dons } from 'app/shared/model/dons.model';
import { DonsService } from './dons.service';
import { DonsComponent } from './dons.component';
import { DonsDetailComponent } from './dons-detail.component';
import { DonsUpdateComponent } from './dons-update.component';
import { DonsDeletePopupComponent } from './dons-delete-dialog.component';
import { IDons } from 'app/shared/model/dons.model';

@Injectable({ providedIn: 'root' })
export class DonsResolve implements Resolve<IDons> {
    constructor(private service: DonsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDons> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Dons>) => response.ok),
                map((dons: HttpResponse<Dons>) => dons.body)
            );
        }
        return of(new Dons());
    }
}

export const donsRoute: Routes = [
    {
        path: '',
        component: DonsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'crowdCodileApp.dons.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DonsDetailComponent,
        resolve: {
            dons: DonsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'crowdCodileApp.dons.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DonsUpdateComponent,
        resolve: {
            dons: DonsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'crowdCodileApp.dons.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DonsUpdateComponent,
        resolve: {
            dons: DonsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'crowdCodileApp.dons.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const donsPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DonsDeletePopupComponent,
        resolve: {
            dons: DonsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'crowdCodileApp.dons.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
