import { Environment } from '../models/environment';
import { GOOGLE_AUTH_CONFIG } from '../models/google-auth-config';
import { KEYCLOAK_AUTH_CONFIG } from '../models/keycloak-auth-config';
import { OAuthProviderType } from '../models/oauth-provider-type';

export const environment: Environment = {
  production: false,
  vapidPublicKey: '',
  apiConnectorUrl: 'http://gateway-service.ostock/api',
  oAuthProviders: {
    [OAuthProviderType.google]: {
      ...GOOGLE_AUTH_CONFIG,
    },
    [OAuthProviderType.keycloak]: {
      ...KEYCLOAK_AUTH_CONFIG,
      issuer: 'http://keycloak.infra:8080/realms/ostock',
      requireHttps: false,
    },
  },
};
