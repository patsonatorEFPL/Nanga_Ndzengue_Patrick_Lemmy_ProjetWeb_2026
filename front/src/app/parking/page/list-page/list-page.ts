import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParkingService } from '../../parking';
import { Parking } from '../../model';

@Component({
  selector: 'app-parking-list-page',
  imports: [RouterLink],
  templateUrl: './list-page.html',
})
export class ParkingListPage {
  private parkingService = inject(ParkingService);

  parkings = signal<Parking[]>([]);
  error = signal('');

  constructor() {
    this.parkingService.list().subscribe({
      next: (parkings) => this.parkings.set(parkings),
      error: () => this.error.set('Erreur de chargement'),
    });
  }
}
