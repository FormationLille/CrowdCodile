/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CrowdCodileTestModule } from '../../../test.module';
import { DonsUpdateComponent } from 'app/entities/dons/dons-update.component';
import { DonsService } from 'app/entities/dons/dons.service';
import { Dons } from 'app/shared/model/dons.model';

describe('Component Tests', () => {
    describe('Dons Management Update Component', () => {
        let comp: DonsUpdateComponent;
        let fixture: ComponentFixture<DonsUpdateComponent>;
        let service: DonsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CrowdCodileTestModule],
                declarations: [DonsUpdateComponent]
            })
                .overrideTemplate(DonsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DonsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DonsService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Dons(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.dons = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Dons();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.dons = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
