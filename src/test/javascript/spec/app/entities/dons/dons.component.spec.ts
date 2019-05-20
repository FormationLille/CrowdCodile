/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CrowdCodileTestModule } from '../../../test.module';
import { DonsComponent } from 'app/entities/dons/dons.component';
import { DonsService } from 'app/entities/dons/dons.service';
import { Dons } from 'app/shared/model/dons.model';

describe('Component Tests', () => {
    describe('Dons Management Component', () => {
        let comp: DonsComponent;
        let fixture: ComponentFixture<DonsComponent>;
        let service: DonsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CrowdCodileTestModule],
                declarations: [DonsComponent],
                providers: []
            })
                .overrideTemplate(DonsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DonsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DonsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Dons(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.dons[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
