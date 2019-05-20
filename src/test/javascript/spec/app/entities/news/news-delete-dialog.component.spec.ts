/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CrowdCodileTestModule } from '../../../test.module';
import { NewsDeleteDialogComponent } from 'app/entities/news/news-delete-dialog.component';
import { NewsService } from 'app/entities/news/news.service';

describe('Component Tests', () => {
    describe('News Management Delete Component', () => {
        let comp: NewsDeleteDialogComponent;
        let fixture: ComponentFixture<NewsDeleteDialogComponent>;
        let service: NewsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CrowdCodileTestModule],
                declarations: [NewsDeleteDialogComponent]
            })
                .overrideTemplate(NewsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NewsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NewsService);
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
