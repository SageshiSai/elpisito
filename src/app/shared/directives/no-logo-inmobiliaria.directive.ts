import { Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNoLogoInmobiliaria]'
})
export class NoLogoInmobiliariaDirective {

   //ALLÁ DONDE COLOQUE ESTA DIRECTIVA EL "nodoDOM" (LA ETIQUETA HTML)
  //SERÁ LA ETIQUETA REFERENCIADA
  private nodoDOM : ElementRef = inject( ElementRef);
  private renderer : Renderer2 = inject(Renderer2);


  @HostListener("error")
  onError():void{

    this.renderer.setAttribute(this.nodoDOM.nativeElement, "src", "assets/img/no-logo.jpg");

  }

}
