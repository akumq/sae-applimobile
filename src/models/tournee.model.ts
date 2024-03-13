export interface TourneeModel {
    tournee_id: number,
    jardin_id: number,
    tournee: string,
    preparation_id: number,
    calendrier_id: number,
    ordre: number,
    couleur: string,
}


export interface TourneeModelDetails {
    tournee_id: string;
    tournee: string;
    preparation_id: string;
    calendrier_id: string;
    ordre: number;
    couleur: string;
    distribution: DistributionModel[];
}
  
export interface DistributionModel {
    distribution_id: string;
    depot_id: string;
    depot: string;
    ordre: number;
    capacite: number;
    adresse: string;
    codepostal: string;
    ville: string;
    st_x: number;
    st_y: number;
    livraisons: LivraisonModel[];
}

export interface LivraisonModel {
    count: string;
    panier_id: string;
    panier: string;
    adherents: number[];
}