import { Component, inject, OnInit } from '@angular/core';
import { PreloaderComponent } from "../../../shared/components/preloader/preloader.component";
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TipoService } from '../../../core/services/tipo.service';
import { Tipo } from '../../../core/models/entities';

@Component({
  selector: 'app-list-tipo',
  imports: [PreloaderComponent,NgClass,RouterLink],
  templateUrl: './list-tipo.component.html',
  styleUrl: './list-tipo.component.css'
})
export class ListTipoComponent implements OnInit {

  /////////////////////////////////////////////////
  nFases:number = 1;
  cargaCompletada:boolean = false;
  fasesCargadas:number = 0;
  /////////////////////////////////////////////////

  private _tipoService:TipoService = inject(TipoService);
  private _router:Router = inject(Router);

  aDatos:Array<Tipo>= [];

  ngOnInit(): void {

    this.getDatos();
  }



  getDatos():void{

    this._tipoService.getTipos().subscribe({

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
