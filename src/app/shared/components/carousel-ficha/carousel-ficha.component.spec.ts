import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselFichaComponent } from './carousel-ficha.component';

describe('CarouselFichaComponent', () => {
  let component: CarouselFichaComponent;
  let fixture: ComponentFixture<CarouselFichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselFichaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
