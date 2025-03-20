import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactarComponent } from './contactar.component';

describe('ContactarComponent', () => {
  let component: ContactarComponent;
  let fixture: ComponentFixture<ContactarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
