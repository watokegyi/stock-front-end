import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductScrComponent } from './all-product-scr.component';

describe('AllProductScrComponent', () => {
  let component: AllProductScrComponent;
  let fixture: ComponentFixture<AllProductScrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllProductScrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllProductScrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
