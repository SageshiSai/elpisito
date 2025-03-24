import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNoImagen]'
})
export class NoImagenDirective {

  constructor(
    private _nodoDOM: ElementRef,
    private _renderer: Renderer2
  ) { }


  @HostListener('error')
  onError():void{
    this._renderer.setAttribute(this._nodoDOM.nativeElement, 'src', 'assets/img/no-imagen.jpg');
  }
}
