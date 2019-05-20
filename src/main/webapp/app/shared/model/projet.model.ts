import { ICommentaire } from 'app/shared/model/commentaire.model';
import { INews } from 'app/shared/model/news.model';
import { IProfil } from 'app/shared/model/profil.model';
import { ICategorie } from 'app/shared/model/categorie.model';

export interface IProjet {
    id?: number;
    nomProjet?: string;
    cout?: number;
    sommeActuelle?: number;
    delai?: number;
    lieu?: string;
    description?: string;
    photoVideoContentType?: string;
    photoVideo?: any;
    url?: string;
    contreparties?: string;
    commentaires?: ICommentaire[];
    news?: INews[];
    profilPorteur?: IProfil;
    profilsContributeurs?: IProfil[];
    profilsSuiveurs?: IProfil[];
    categories?: ICategorie[];
}

export class Projet implements IProjet {
    constructor(
        public id?: number,
        public nomProjet?: string,
        public cout?: number,
        public sommeActuelle?: number,
        public delai?: number,
        public lieu?: string,
        public description?: string,
        public photoVideoContentType?: string,
        public photoVideo?: any,
        public url?: string,
        public contreparties?: string,
        public commentaires?: ICommentaire[],
        public news?: INews[],
        public profilPorteur?: IProfil,
        public profilsContributeurs?: IProfil[],
        public profilsSuiveurs?: IProfil[],
        public categories?: ICategorie[]
    ) {}
}
