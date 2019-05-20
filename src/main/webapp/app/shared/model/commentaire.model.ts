import { Moment } from 'moment';
import { IProfil } from 'app/shared/model/profil.model';
import { IProjet } from 'app/shared/model/projet.model';

export interface ICommentaire {
    id?: number;
    contenu?: string;
    date?: Moment;
    note?: number;
    profil?: IProfil;
    projet?: IProjet;
}

export class Commentaire implements ICommentaire {
    constructor(
        public id?: number,
        public contenu?: string,
        public date?: Moment,
        public note?: number,
        public profil?: IProfil,
        public projet?: IProjet
    ) {}
}
