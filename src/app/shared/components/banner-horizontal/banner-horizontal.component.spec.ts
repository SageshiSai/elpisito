import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerHorizontalComponent } from './banner-horizontal.component';

describe('BannerHorizontalComponent', () => {
  let component: BannerHorizontalComponent;
  let fixture: ComponentFixture<BannerHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerHorizontalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
