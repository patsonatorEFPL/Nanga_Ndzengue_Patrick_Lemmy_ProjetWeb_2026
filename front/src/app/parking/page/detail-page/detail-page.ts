import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ParkingService } from '../../parking';
import { Parking } from '../../model';

@Component({
  selector: 'app-parking-detail-page',
  imports: [RouterLink],
  templateUrl: './detail-page.html',
})
export class ParkingDetailPage {
  private parkingService = inject(ParkingService);
  private route = inject(ActivatedRoute);

  parking = signal<Parking | null>(null);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.parkingService.detail(id).subscribe((p) => this.parking.set(p));
  }
}
