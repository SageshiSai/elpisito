import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicaAnuncioComponent } from './publica-anuncio.component';

describe('PublicaAnuncioComponent', () => {
  let component: PublicaAnuncioComponent;
  let fixture: ComponentFixture<PublicaAnuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicaAnuncioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicaAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
