import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { Injectable } from "@angular/core";
import { map, Observable } from 'rxjs';
import { Breakpoints, DeviceType } from "../models/breakpoints";

@Injectable({
	providedIn: 'root'
})
export class BreakpointService {
	private readonly breakpoints = [Breakpoints.XS, Breakpoints.SM, Breakpoints.MD, Breakpoints.LG, Breakpoints.XL, Breakpoints.XXL];

	readonly deviceType$ = this.getDeviceType();

	constructor(private readonly breakpointObserver: BreakpointObserver) { }

	private getDeviceType(): Observable<DeviceType> {
		return this.breakpointObserver.observe(this.breakpoints).pipe(map(state => this.retrieveDeviceType(state)));
	}

	private retrieveDeviceType(state: BreakpointState): DeviceType {
		if (state.matches) {
			const mediaFeature = Object.keys(state.breakpoints).find(key => state.breakpoints[key]);
			return Object.keys(Breakpoints).find(key => Breakpoints[key] === mediaFeature) as DeviceType;
		}
		return null;
	}
}
