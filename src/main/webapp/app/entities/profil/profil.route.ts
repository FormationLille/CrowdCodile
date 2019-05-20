import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Profil } from 'app/shared/model/profil.model';
import { ProfilService } from './profil.service';
import { ProfilComponent } from './profil.component';
import { ProfilDetailComponent } from './profil-detail.component';
import { ProfilUpdateComponent } from './profil-update.component';
import { ProfilDeletePopupComponent } from './profil-delete-dialog.component';
import { IProfil } from 'app/shared/model/profil.model';

@Injectable({ providedIn: 'root' })
export class ProfilResolve implements Resolve<IProfil> {
    constructor(private service: ProfilService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProfil> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Profil>) => response.ok),
                map((profil: HttpResponse<Profil>) => profil.body)
            );
        }
        return of(new Profil());
    }
}

export const profilRoute: Routes = [
    {
        path: '',
        component: ProfilComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'crowdCodileApp.profil.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ProfilDetailComponent,
        resolve: {
            profil: ProfilResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'crowdCodileApp.profil.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ProfilUpdateComponent,
        resolve: {
            profil: ProfilResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'crowdCodileApp.profil.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ProfilUpdateComponent,
        resolve: {
            profil: ProfilResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'crowdCodileApp.profil.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const profilPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ProfilDeletePopupComponent,
        resolve: {
            profil: ProfilResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'crowdCodileApp.profil.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
