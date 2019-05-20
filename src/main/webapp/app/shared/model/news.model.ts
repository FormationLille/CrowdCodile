import { Moment } from 'moment';
import { IProjet } from 'app/shared/model/projet.model';

export interface INews {
    id?: number;
    contenu?: string;
    date?: Moment;
    projet?: IProjet;
}

export class News implements INews {
    constructor(public id?: number, public contenu?: string, public date?: Moment, public projet?: IProjet) {}
}
