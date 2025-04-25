import { Component, inject, OnInit } from '@angular/core';
import { PreloaderComponent } from "../../../shared/components/preloader/preloader.component";
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProvinciaService } from '../../../core/services/provincia.service';
import { Provincia } from '../../../core/models/entities';

@Component({
  selector: 'app-list-provincia',
  imports: [PreloaderComponent,NgClass,RouterLink],
  templateUrl: './list-provincia.component.html',
  styleUrl: './list-provincia.component.css'
})
export class ListProvinciaComponent implements OnInit {

  /////////////////////////////////////////////////
  nFases:number = 1;
  cargaCompletada:boolean = false;
  fasesCargadas:number = 0;
  /////////////////////////////////////////////////

  private _provinciaService:ProvinciaService = inject(ProvinciaService);
  private _router:Router = inject(Router);

  aDatos:Array<Provincia>= [];

  ngOnInit(): void {
    this.getDatos();
  }


  getDatos():void{

    this._provinciaService.getProvincias().subscribe({

      next: (datos) => {this.aDatos = datos}
      ,
      error: (error) => { this._router.navigate(['/error'])}
      ,
      complete: () => { this.faseCarga()}
    });


  }


  ///////////////////////////////////////////////////////
  faseCarga():void{

    this.fasesCargadas++;

    if(this.fasesCargadas == this.nFases){

      this.cargaCompletada = true;
    }
  }
  //////////////////////////////////////////////////////



}
