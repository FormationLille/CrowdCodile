import { IProjet } from 'app/shared/model/projet.model';

export interface ICategorie {
    id?: number;
    nom?: string;
    description?: string;
    projets?: IProjet[];
}

export class Categorie implements ICategorie {
    constructor(public id?: number, public nom?: string, public description?: string, public projets?: IProjet[]) {}
}
