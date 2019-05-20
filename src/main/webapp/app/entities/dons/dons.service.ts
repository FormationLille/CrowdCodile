import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDons } from 'app/shared/model/dons.model';

type EntityResponseType = HttpResponse<IDons>;
type EntityArrayResponseType = HttpResponse<IDons[]>;

@Injectable({ providedIn: 'root' })
export class DonsService {
    public resourceUrl = SERVER_API_URL + 'api/dons';

    constructor(protected http: HttpClient) {}

    create(dons: IDons): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(dons);
        return this.http
            .post<IDons>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(dons: IDons): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(dons);
        return this.http
            .put<IDons>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IDons>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDons[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(dons: IDons): IDons {
        const copy: IDons = Object.assign({}, dons, {
            date: dons.date != null && dons.date.isValid() ? dons.date.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.date = res.body.date != null ? moment(res.body.date) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((dons: IDons) => {
                dons.date = dons.date != null ? moment(dons.date) : null;
            });
        }
        return res;
    }
}
