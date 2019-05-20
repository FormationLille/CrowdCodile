/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrowdCodileTestModule } from '../../../test.module';
import { DonsDetailComponent } from 'app/entities/dons/dons-detail.component';
import { Dons } from 'app/shared/model/dons.model';

describe('Component Tests', () => {
    describe('Dons Management Detail Component', () => {
        let comp: DonsDetailComponent;
        let fixture: ComponentFixture<DonsDetailComponent>;
        const route = ({ data: of({ dons: new Dons(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CrowdCodileTestModule],
                declarations: [DonsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DonsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DonsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.dons).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
