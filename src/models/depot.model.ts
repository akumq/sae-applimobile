export interface DepotModel {
    ordre: number
    depot_id: number,
    jardin_id: number,
    depot: string,
    capacite: number,
    adresse: string,
    codepostal: string,
    ville: string,
    telephone: string,
    email: string,
    localisation: {
        type: string,
        crs: {
            type: string,
            properties: {
                name: string
            }
        }
        coordinates: number[],
    }
}