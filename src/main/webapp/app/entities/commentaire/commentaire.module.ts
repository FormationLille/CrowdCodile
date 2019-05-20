import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CrowdCodileSharedModule } from 'app/shared';
import {
    CommentaireComponent,
    CommentaireDetailComponent,
    CommentaireUpdateComponent,
    CommentaireDeletePopupComponent,
    CommentaireDeleteDialogComponent,
    commentaireRoute,
    commentairePopupRoute
} from './';

const ENTITY_STATES = [...commentaireRoute, ...commentairePopupRoute];

@NgModule({
    imports: [CrowdCodileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CommentaireComponent,
        CommentaireDetailComponent,
        CommentaireUpdateComponent,
        CommentaireDeleteDialogComponent,
        CommentaireDeletePopupComponent
    ],
    entryComponents: [CommentaireComponent, CommentaireUpdateComponent, CommentaireDeleteDialogComponent, CommentaireDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CrowdCodileCommentaireModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
