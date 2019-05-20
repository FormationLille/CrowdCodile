/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CrowdCodileTestModule } from '../../../test.module';
import { CommentaireUpdateComponent } from 'app/entities/commentaire/commentaire-update.component';
import { CommentaireService } from 'app/entities/commentaire/commentaire.service';
import { Commentaire } from 'app/shared/model/commentaire.model';

describe('Component Tests', () => {
    describe('Commentaire Management Update Component', () => {
        let comp: CommentaireUpdateComponent;
        let fixture: ComponentFixture<CommentaireUpdateComponent>;
        let service: CommentaireService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CrowdCodileTestModule],
                declarations: [CommentaireUpdateComponent]
            })
                .overrideTemplate(CommentaireUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CommentaireUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommentaireService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Commentaire(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.commentaire = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Commentaire();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.commentaire = entity;
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
