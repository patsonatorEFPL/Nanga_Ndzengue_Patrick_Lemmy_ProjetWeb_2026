export interface Ticket {
  ticket_id: string;
  immatriculation: string;
  entree: string;
  sortie: string | null;
  montant: number;
}

export interface Parking {
  parking_id: string;
  nom: string;
  adresse: string;
  capacite: number;
  tarif_horaire: number;
  tickets: Ticket[];
}

export interface ParkingPayload {
  nom: string;
  adresse: string;
  capacite: number;
  tarif_horaire: number;
}
