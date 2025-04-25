import { Component, inject, Input, OnInit } from '@angular/core';
import { CarouselFichaComponent } from '../carousel-ficha/carousel-ficha.component';
import { Inmueble } from '../../../core/models/entities';
import { GLOBAL } from '../../../core/environments/global';
import { EurosPipe } from "../../pipes/euros.pipe";
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ComunicacionService } from '../../../core/services/comunicacion.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ficha-inmueble',
  imports: [CarouselFichaComponent, EurosPipe, RouterLink],
  templateUrl: './ficha-inmueble.component.html',
  styleUrl: './ficha-inmueble.component.css'
})
export class FichaInmuebleComponent implements OnInit{


  @Input() datos:Inmueble; //Cuando lleguen los datos por parte del parent estarán incluídos todos los datos del inmueble (incluídas las imágenes)

  url:string = GLOBAL.url_imagen_logo_inmobiliaria;

  private _comunicacionService:ComunicacionService = inject(ComunicacionService);
  private _authService:AuthService = inject(AuthService);
  private _router:Router = inject(Router);

  isLogged:boolean;
  rol:string;
  suscripcion:Subscription;

  ngOnInit(): void {
    this.suscripcion = this._comunicacionService.logueo$.subscribe({

      next: (datos) => {

        this.isLogged = datos;
        if(this.isLogged){
          this.rol = this._authService.getRol();     
        }


      }
      ,
      error: (error) => {this._router.navigate(["/error"])}
      ,
      complete: () => {}
    });
  }


  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

}
