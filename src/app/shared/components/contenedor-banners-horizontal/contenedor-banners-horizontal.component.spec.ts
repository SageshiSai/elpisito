import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorBannersHorizontalComponent } from './contenedor-banners-horizontal.component';

describe('ContenedorBannersHorizontalComponent', () => {
  let component: ContenedorBannersHorizontalComponent;
  let fixture: ComponentFixture<ContenedorBannersHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenedorBannersHorizontalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorBannersHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
