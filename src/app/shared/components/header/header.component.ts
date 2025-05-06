import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CarouselHomeComponent } from '../carousel-home/carousel-home.component';
import { PortadaAdminComponent } from '../portada-admin/portada-admin.component';
import { ComunicacionService } from '../../../core/services/comunicacion.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CarouselHomeComponent,PortadaAdminComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit,OnDestroy{

  private _comunicacionService:ComunicacionService = inject(ComunicacionService);

  veoCarousel:boolean;
  suscripcion:Subscription;

  ngOnInit(): void {
    this.suscripcion = this._comunicacionService.portada$.subscribe({
      next:(datos) => {
        this.veoCarousel = datos;
      },
      error:(error) =>  {},
      complete:() => {}
    })
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }


}
