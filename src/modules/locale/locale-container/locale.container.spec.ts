import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocaleContainer } from './locale.container';

describe('LocaleContainer', () => {
  let component: LocaleContainer;
  let fixture: ComponentFixture<LocaleContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocaleContainer]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocaleContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
