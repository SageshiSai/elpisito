import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTipoComponent } from './edit-tipo.component';

describe('EditTipoComponent', () => {
  let component: EditTipoComponent;
  let fixture: ComponentFixture<EditTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTipoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
