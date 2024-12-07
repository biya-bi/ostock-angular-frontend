import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseDeleteComponent } from './license-delete.component';

describe('LicenseDeleteComponent', () => {
  let component: LicenseDeleteComponent;
  let fixture: ComponentFixture<LicenseDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenseDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LicenseDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
