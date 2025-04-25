import { Component } from '@angular/core';
import { CarouselHomeComponent } from '../carousel-home/carousel-home.component';

@Component({
  selector: 'app-header',
  imports: [CarouselHomeComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
