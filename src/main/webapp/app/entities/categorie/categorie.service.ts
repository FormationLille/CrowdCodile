import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICategorie } from 'app/shared/model/categorie.model';

type EntityResponseType = HttpResponse<ICategorie>;
type EntityArrayResponseType = HttpResponse<ICategorie[]>;

@Injectable({ providedIn: 'root' })
export class CategorieService {
    public resourceUrl = SERVER_API_URL + 'api/categories';

    constructor(protected http: HttpClient) {}

    create(categorie: ICategorie): Observable<EntityResponseType> {
        return this.http.post<ICategorie>(this.resourceUrl, categorie, { observe: 'response' });
    }

    update(categorie: ICategorie): Observable<EntityResponseType> {
        return this.http.put<ICategorie>(this.resourceUrl, categorie, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICategorie>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICategorie[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
