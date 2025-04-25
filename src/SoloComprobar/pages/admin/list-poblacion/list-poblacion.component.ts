import { Component, inject } from '@angular/core';
import { PreloaderComponent } from "../../../shared/components/preloader/preloader.component";
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PoblacionService } from '../../../core/services/poblacion.service';
import { Poblacion } from '../../../core/models/entities';

@Component({
  selector: 'app-list-poblacion',
  imports: [PreloaderComponent,NgClass,RouterLink],
  templateUrl: './list-poblacion.component.html',
  styleUrl: './list-poblacion.component.css'
})
export class ListPoblacionComponent {

  /////////////////////////////////////////////////
  nFases:number = 1;
  cargaCompletada:boolean = false;
  fasesCargadas:number = 0;
  /////////////////////////////////////////////////

  private _poblacionService:PoblacionService = inject(PoblacionService);
  private _router:Router = inject(Router);

  aDatos:Array<Poblacion>= [];

  ngOnInit(): void {
    
    this.getDatos();
  }



  getDatos():void{

    this._poblacionService.getPoblaciones().subscribe({

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
