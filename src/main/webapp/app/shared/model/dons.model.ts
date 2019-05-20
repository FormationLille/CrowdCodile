import { Moment } from 'moment';
import { IProjet } from 'app/shared/model/projet.model';
import { IProfil } from 'app/shared/model/profil.model';

export interface IDons {
    id?: number;
    date?: Moment;
    montant?: number;
    projet?: IProjet;
    profil?: IProfil;
}

export class Dons implements IDons {
    constructor(public id?: number, public date?: Moment, public montant?: number, public projet?: IProjet, public profil?: IProfil) {}
}
