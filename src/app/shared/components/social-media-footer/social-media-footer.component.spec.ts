import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaFooterComponent } from './social-media-footer.component';

describe('SocialMediaFooterComponent', () => {
  let component: SocialMediaFooterComponent;
  let fixture: ComponentFixture<SocialMediaFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialMediaFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialMediaFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
