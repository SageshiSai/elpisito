import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PreloaderComponent } from '../../../shared/components/preloader/preloader.component';
import { TematicaService } from '../../../core/services/tematica.service';
import { Tematica } from '../../../core/models/entities';

@Component({
  selector: 'app-list-tematica',
  imports: [PreloaderComponent,NgClass,RouterLink],
  templateUrl: './list-tematica.component.html',
  styleUrl: './list-tematica.component.css'
})
export class ListTematicaComponent implements OnInit{


  /////////////////////////////////////////////////
  nFases:number = 1;
  cargaCompletada:boolean = false;
  fasesCargadas:number = 0;
  /////////////////////////////////////////////////

  private _tematicaService:TematicaService = inject(TematicaService);
  private _router:Router = inject(Router);

  aDatos:Array<Tematica>= [];

  ngOnInit(): void {
    
    this.getDatos();
  }



  getDatos():void{

    this._tematicaService.getTematicas().subscribe({

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
