import { AuthConfig } from 'angular-oauth2-oidc';

export const KEYCLOAK_AUTH_CONFIG: AuthConfig = {
  strictDiscoveryDocumentValidation: false,
  redirectUri: document.location.origin,
  clientId: 'ostock',
  scope: 'openid profile email',
  requireHttps: true,
};
