import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CrowdCodileSharedModule } from 'app/shared';
import {
    NewsComponent,
    NewsDetailComponent,
    NewsUpdateComponent,
    NewsDeletePopupComponent,
    NewsDeleteDialogComponent,
    newsRoute,
    newsPopupRoute
} from './';

const ENTITY_STATES = [...newsRoute, ...newsPopupRoute];

@NgModule({
    imports: [CrowdCodileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [NewsComponent, NewsDetailComponent, NewsUpdateComponent, NewsDeleteDialogComponent, NewsDeletePopupComponent],
    entryComponents: [NewsComponent, NewsUpdateComponent, NewsDeleteDialogComponent, NewsDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CrowdCodileNewsModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
