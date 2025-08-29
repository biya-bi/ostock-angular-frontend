/**
 * We have decided not to use the breakpoints in `@angular/cdk/layout` because we want
 * to use Bootstrap grid breakpoints. These values were taken from the `$grid-breakpoints`
 * variable defined in node_modules/bootstrap/scss/_variables.scss and the `breakpoint-max`
 * function defined in node_modules/bootstrap/scss/mixins/_breakpoints.scss. Here is a link
 * which may be helpful: https://getbootstrap.com/docs/5.3/layout/breakpoints/#max-width.
 *
 * We are using Bootstrap and we want to avoid unnecessary surprises due to differences in
 * breakpoints between Bootstrap and `@angular/cdk`. `@angular/cdk` devices are larger. For example,
 * in `@angular/cdk`, a small device has a minimum width of 600px, whereas in Bootstrap, a small
 * device has a minimum width of 576px.
 */
export const Breakpoints = {
  XS: '(min-width: 0) and (max-width: 575.98px)',
  SM: '(min-width: 576px) and (max-width: 767.98px)',
  MD: '(min-width: 768px) and (max-width: 991.98px)',
  LG: '(min-width: 992px) and (max-width: 1199.98px)',
  XL: '(min-width: 1200px) and (max-width: 1399.98px)',
  XXL: '(min-width: 1400px)',
};

export type DeviceType = keyof typeof Breakpoints;
