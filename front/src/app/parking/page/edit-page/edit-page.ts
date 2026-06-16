import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ParkingService } from '../../parking';

@Component({
  selector: 'app-parking-edit-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './edit-page.html',
})
export class ParkingEditPage {
  private parkingService = inject(ParkingService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id = this.route.snapshot.paramMap.get('id')!;
  nom = signal('');
  adresse = signal('');
  capacite = signal(0);
  tarif_horaire = signal(0);

  constructor() {
    this.parkingService.detail(this.id).subscribe((p) => {
      this.nom.set(p.nom);
      this.adresse.set(p.adresse);
      this.capacite.set(p.capacite);
      this.tarif_horaire.set(p.tarif_horaire);
    });
  }

  save() {
    this.parkingService
      .update(this.id, {
        nom: this.nom(),
        adresse: this.adresse(),
        capacite: this.capacite(),
        tarif_horaire: this.tarif_horaire(),
      })
      .subscribe(() => this.router.navigate(['parking', this.id]));
  }
}
