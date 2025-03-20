import { Component } from '@angular/core';
import { FinderComponent } from "../../../shared/components/finder/finder.component";
import { BannerHorizontalComponent } from "../../../shared/components/banner-horizontal/banner-horizontal.component";
import { ListPortadaComponent } from "../../../shared/components/list-portada/list-portada.component";

@Component({
  selector: 'app-home',
  imports: [FinderComponent, BannerHorizontalComponent, ListPortadaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
