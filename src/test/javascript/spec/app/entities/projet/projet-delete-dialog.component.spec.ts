/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CrowdCodileTestModule } from '../../../test.module';
import { ProjetDeleteDialogComponent } from 'app/entities/projet/projet-delete-dialog.component';
import { ProjetService } from 'app/entities/projet/projet.service';

describe('Component Tests', () => {
    describe('Projet Management Delete Component', () => {
        let comp: ProjetDeleteDialogComponent;
        let fixture: ComponentFixture<ProjetDeleteDialogComponent>;
        let service: ProjetService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CrowdCodileTestModule],
                declarations: [ProjetDeleteDialogComponent]
            })
                .overrideTemplate(ProjetDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProjetDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjetService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
