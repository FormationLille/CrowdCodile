import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IProjet } from 'app/shared/model/projet.model';

export interface IProfil {
    id?: number;
    nom?: string;
    prenom?: string;
    age?: number;
    photoContentType?: string;
    photo?: any;
    description?: string;
    dateInscription?: Moment;
    user?: IUser;
    projetsPortes?: IProjet[];
    projetContribues?: IProjet[];
    projetSuivis?: IProjet[];
}

export class Profil implements IProfil {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public age?: number,
        public photoContentType?: string,
        public photo?: any,
        public description?: string,
        public dateInscription?: Moment,
        public user?: IUser,
        public projetsPortes?: IProjet[],
        public projetContribues?: IProjet[],
        public projetSuivis?: IProjet[]
    ) {}
}
