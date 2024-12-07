import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationToggleComponent } from './authentication-toggle.component';

describe('AuthenticationToggleComponent', () => {
	let component: AuthenticationToggleComponent;
	let fixture: ComponentFixture<AuthenticationToggleComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AuthenticationToggleComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(AuthenticationToggleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
