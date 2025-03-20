import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaHipotecaComponent } from './consulta-hipoteca.component';

describe('ConsultaHipotecaComponent', () => {
  let component: ConsultaHipotecaComponent;
  let fixture: ComponentFixture<ConsultaHipotecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaHipotecaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaHipotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
