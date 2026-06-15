import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ParkingService } from '../../parking';

@Component({
  selector: 'app-parking-create-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './create-page.html',
})
export class ParkingCreatePage {
  private parkingService = inject(ParkingService);
  private router = inject(Router);

  nom = '';
  adresse = '';
  capacite = 0;
  tarif_horaire = 0;

  create() {
    this.parkingService
      .create({
        nom: this.nom,
        adresse: this.adresse,
        capacite: this.capacite,
        tarif_horaire: this.tarif_horaire,
      })
      .subscribe(() => this.router.navigate(['parking']));
  }
}
