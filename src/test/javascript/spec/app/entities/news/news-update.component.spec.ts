/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CrowdCodileTestModule } from '../../../test.module';
import { NewsUpdateComponent } from 'app/entities/news/news-update.component';
import { NewsService } from 'app/entities/news/news.service';
import { News } from 'app/shared/model/news.model';

describe('Component Tests', () => {
    describe('News Management Update Component', () => {
        let comp: NewsUpdateComponent;
        let fixture: ComponentFixture<NewsUpdateComponent>;
        let service: NewsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CrowdCodileTestModule],
                declarations: [NewsUpdateComponent]
            })
                .overrideTemplate(NewsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NewsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NewsService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new News(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.news = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new News();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.news = entity;
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
