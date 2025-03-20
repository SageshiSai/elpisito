import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPortadaComponent } from './list-portada.component';

describe('ListPortadaComponent', () => {
  let component: ListPortadaComponent;
  let fixture: ComponentFixture<ListPortadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPortadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPortadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
