import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseContainer } from './license.container';

describe('LicenseContainer', () => {
  let component: LicenseContainer;
  let fixture: ComponentFixture<LicenseContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenseContainer]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LicenseContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
