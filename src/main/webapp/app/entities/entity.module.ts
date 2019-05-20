import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'projet',
                loadChildren: './projet/projet.module#CrowdCodileProjetModule'
            },
            {
                path: 'profil',
                loadChildren: './profil/profil.module#CrowdCodileProfilModule'
            },
            {
                path: 'dons',
                loadChildren: './dons/dons.module#CrowdCodileDonsModule'
            },
            {
                path: 'commentaire',
                loadChildren: './commentaire/commentaire.module#CrowdCodileCommentaireModule'
            },
            {
                path: 'categorie',
                loadChildren: './categorie/categorie.module#CrowdCodileCategorieModule'
            },
            {
                path: 'news',
                loadChildren: './news/news.module#CrowdCodileNewsModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CrowdCodileEntityModule {}
