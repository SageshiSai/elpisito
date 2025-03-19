import { Component } from '@angular/core';
import { CabeceraFooterComponent } from "../cabecera-footer/cabecera-footer.component";
import { MenuFooterComponent } from "../menu-footer/menu-footer.component";
import { PieFooterComponent } from "../pie-footer/pie-footer.component";

@Component({
  selector: 'app-footer',
  imports: [CabeceraFooterComponent, MenuFooterComponent, PieFooterComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
