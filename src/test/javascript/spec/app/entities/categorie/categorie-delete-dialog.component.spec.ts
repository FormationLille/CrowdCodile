/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CrowdCodileTestModule } from '../../../test.module';
import { CategorieDeleteDialogComponent } from 'app/entities/categorie/categorie-delete-dialog.component';
import { CategorieService } from 'app/entities/categorie/categorie.service';

describe('Component Tests', () => {
    describe('Categorie Management Delete Component', () => {
        let comp: CategorieDeleteDialogComponent;
        let fixture: ComponentFixture<CategorieDeleteDialogComponent>;
        let service: CategorieService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CrowdCodileTestModule],
                declarations: [CategorieDeleteDialogComponent]
            })
                .overrideTemplate(CategorieDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CategorieDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategorieService);
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
