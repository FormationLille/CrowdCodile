import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CrowdCodileSharedModule } from 'app/shared';
import {
    DonsComponent,
    DonsDetailComponent,
    DonsUpdateComponent,
    DonsDeletePopupComponent,
    DonsDeleteDialogComponent,
    donsRoute,
    donsPopupRoute
} from './';

const ENTITY_STATES = [...donsRoute, ...donsPopupRoute];

@NgModule({
    imports: [CrowdCodileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [DonsComponent, DonsDetailComponent, DonsUpdateComponent, DonsDeleteDialogComponent, DonsDeletePopupComponent],
    entryComponents: [DonsComponent, DonsUpdateComponent, DonsDeleteDialogComponent, DonsDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CrowdCodileDonsModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
