import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElPisitoComponent } from './el-pisito.component';

describe('ElPisitoComponent', () => {
  let component: ElPisitoComponent;
  let fixture: ComponentFixture<ElPisitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElPisitoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElPisitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
