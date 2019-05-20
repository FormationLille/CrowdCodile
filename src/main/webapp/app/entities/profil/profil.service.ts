import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProfil } from 'app/shared/model/profil.model';

type EntityResponseType = HttpResponse<IProfil>;
type EntityArrayResponseType = HttpResponse<IProfil[]>;

@Injectable({ providedIn: 'root' })
export class ProfilService {
    public resourceUrl = SERVER_API_URL + 'api/profils';

    constructor(protected http: HttpClient) {}

    create(profil: IProfil): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(profil);
        return this.http
            .post<IProfil>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(profil: IProfil): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(profil);
        return this.http
            .put<IProfil>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IProfil>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IProfil[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(profil: IProfil): IProfil {
        const copy: IProfil = Object.assign({}, profil, {
            dateInscription:
                profil.dateInscription != null && profil.dateInscription.isValid() ? profil.dateInscription.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dateInscription = res.body.dateInscription != null ? moment(res.body.dateInscription) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((profil: IProfil) => {
                profil.dateInscription = profil.dateInscription != null ? moment(profil.dateInscription) : null;
            });
        }
        return res;
    }
}
