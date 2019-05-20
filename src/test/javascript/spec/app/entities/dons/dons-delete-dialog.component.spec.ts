/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CrowdCodileTestModule } from '../../../test.module';
import { DonsDeleteDialogComponent } from 'app/entities/dons/dons-delete-dialog.component';
import { DonsService } from 'app/entities/dons/dons.service';

describe('Component Tests', () => {
    describe('Dons Management Delete Component', () => {
        let comp: DonsDeleteDialogComponent;
        let fixture: ComponentFixture<DonsDeleteDialogComponent>;
        let service: DonsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CrowdCodileTestModule],
                declarations: [DonsDeleteDialogComponent]
            })
                .overrideTemplate(DonsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DonsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DonsService);
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
