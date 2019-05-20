/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CrowdCodileTestModule } from '../../../test.module';
import { ProjetUpdateComponent } from 'app/entities/projet/projet-update.component';
import { ProjetService } from 'app/entities/projet/projet.service';
import { Projet } from 'app/shared/model/projet.model';

describe('Component Tests', () => {
    describe('Projet Management Update Component', () => {
        let comp: ProjetUpdateComponent;
        let fixture: ComponentFixture<ProjetUpdateComponent>;
        let service: ProjetService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CrowdCodileTestModule],
                declarations: [ProjetUpdateComponent]
            })
                .overrideTemplate(ProjetUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProjetUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjetService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Projet(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.projet = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Projet();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.projet = entity;
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
