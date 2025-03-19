import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieFooterComponent } from './pie-footer.component';

describe('PieFooterComponent', () => {
  let component: PieFooterComponent;
  let fixture: ComponentFixture<PieFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PieFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
