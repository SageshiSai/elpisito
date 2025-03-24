import { Component, OnInit } from '@angular/core';
import { FinderComponent } from "../../../shared/components/finder/finder.component";
import { BannerHorizontalComponent } from "../../../shared/components/banner-horizontal/banner-horizontal.component";
import { ListPortadaComponent } from "../../../shared/components/list-portada/list-portada.component";
import { CommonModule } from '@angular/common';
import { BannerHorizontal } from '../../../core/models/entities';
import { BannerService } from '../../../core/services/banner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FinderComponent, BannerHorizontalComponent, ListPortadaComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  nFases: number = 1;
  cargaCompletada: boolean = false;
  fasesCargadas: number = 0;
  aBanners: BannerHorizontal[] = [];


  constructor(
    private _bannerService: BannerService,
    private _router: Router
  ) { }

  ngOnInit(): void {
     this.getDatos();
  }

  getDatos():void{
    this._bannerService.getBannersHorizontalesActivosHome().subscribe({
      next:(datos) => {
        this.aBanners = datos
        console.log(this.aBanners)
      },
      error: (error) => {this._router.navigate(['/error'])},
      complete: () => {this.faseCarga()}
    })
  }

  faseCarga():void{

    this.fasesCargadas++;

    if(this.fasesCargadas == this.nFases){

      this.cargaCompletada = true;
    }
  }


  // datos1:BannerHorizontal = {
  //   altImagen: "chica con gafas pensando",
  //   imagen: "assets/img/banner-agencias-inmobiliarias.jpg",
  //   titular: "Te recomendamos las agencias inmobiliarias más adecuadas para vender tu casa",
  //   claim: "Seleccionamos hasta 4 agencias, según sean las características de tu inmueble, que te ayudarán a vender rapidamente",
  //   link: "#",
  //   textoLink: "Buscar una agencia inmobiliaria"
  // }

  // datos2:BannerHorizontal = {
  //   altImagen: "Persona consultando una tablet",
  //   imagen: "assets/img/banner-cuanto-vale-tu-casa.jpg",
  //   titular: "¿Cuánto vale tu casa?",
  //   claim: "Una valoración online en segundos con un rango de precio preciso en venta y alquiler comparando con inmuebles similares. ",
  //   link: "#",
  //   textoLink: "Buscar una agencia inmobiliaria"
  // }


}
