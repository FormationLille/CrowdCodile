/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ProjetService } from 'app/entities/projet/projet.service';
import { IProjet, Projet } from 'app/shared/model/projet.model';

describe('Service Tests', () => {
    describe('Projet Service', () => {
        let injector: TestBed;
        let service: ProjetService;
        let httpMock: HttpTestingController;
        let elemDefault: IProjet;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ProjetService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new Projet(0, 'AAAAAAA', 0, 0, 0, 'AAAAAAA', 'AAAAAAA', 'image/png', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Projet', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new Projet(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Projet', async () => {
                const returnedFromService = Object.assign(
                    {
                        nomProjet: 'BBBBBB',
                        cout: 1,
                        sommeActuelle: 1,
                        delai: 1,
                        lieu: 'BBBBBB',
                        description: 'BBBBBB',
                        photoVideo: 'BBBBBB',
                        url: 'BBBBBB',
                        contreparties: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Projet', async () => {
                const returnedFromService = Object.assign(
                    {
                        nomProjet: 'BBBBBB',
                        cout: 1,
                        sommeActuelle: 1,
                        delai: 1,
                        lieu: 'BBBBBB',
                        description: 'BBBBBB',
                        photoVideo: 'BBBBBB',
                        url: 'BBBBBB',
                        contreparties: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Projet', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
