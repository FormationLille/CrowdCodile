/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CrowdCodileTestModule } from '../../../test.module';
import { CategorieUpdateComponent } from 'app/entities/categorie/categorie-update.component';
import { CategorieService } from 'app/entities/categorie/categorie.service';
import { Categorie } from 'app/shared/model/categorie.model';

describe('Component Tests', () => {
    describe('Categorie Management Update Component', () => {
        let comp: CategorieUpdateComponent;
        let fixture: ComponentFixture<CategorieUpdateComponent>;
        let service: CategorieService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CrowdCodileTestModule],
                declarations: [CategorieUpdateComponent]
            })
                .overrideTemplate(CategorieUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CategorieUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategorieService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Categorie(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.categorie = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Categorie();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.categorie = entity;
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
