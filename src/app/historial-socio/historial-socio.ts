import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { SocioService } from '../services/socio.service';

@Component({
  selector: 'app-historial-socio',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule  
  ],
  templateUrl: './historial-socio.html'
})
export class HistorialSocioComponent {
  historial: any;

  constructor(
    private socioService: SocioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.socioService.getHistorialSocio(id).subscribe(data => {
      this.historial = data;
    });
  }
}
