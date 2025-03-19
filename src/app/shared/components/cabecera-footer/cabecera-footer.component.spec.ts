import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabeceraFooterComponent } from './cabecera-footer.component';

describe('CabeceraFooterComponent', () => {
  let component: CabeceraFooterComponent;
  let fixture: ComponentFixture<CabeceraFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CabeceraFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabeceraFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
