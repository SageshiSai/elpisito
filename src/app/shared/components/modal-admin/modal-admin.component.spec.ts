import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdminComponent } from './modal-admin.component';

describe('ModalAdminComponent', () => {
  let component: ModalAdminComponent;
  let fixture: ComponentFixture<ModalAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
