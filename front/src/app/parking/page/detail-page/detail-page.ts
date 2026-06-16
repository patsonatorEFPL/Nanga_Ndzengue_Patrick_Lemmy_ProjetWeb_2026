import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  private router = inject(Router);

  id = this.route.snapshot.paramMap.get('id')!;
  parking = signal<Parking | null>(null);

  constructor() {
    this.parkingService.detail(this.id).subscribe((p) => this.parking.set(p));
  }

  remove() {
    this.parkingService.delete(this.id).subscribe(() => this.router.navigate(['parking']));
  }
}
