import { Environment } from '../models/environment';
import { GOOGLE_AUTH_CONFIG } from '../models/google-auth-config';
import { KEYCLOAK_AUTH_CONFIG } from '../models/keycloak-auth-config';
import { OAuthProviderType } from '../models/oauth-provider-type';

export const environment: Environment = {
  production: true,
  vapidPublicKey:
    'BFLuRSPx2KF53-x_gCHwqd7ZG_QD29dTEVDbLj4VUaJvcDXgDiBH2piAebQ69-wkchJLOczyon29aTqsowhzN0I',
  apiConnectorUrl: 'https://ostockapi.nguiland.org/api',
  oAuthProviders: {
    [OAuthProviderType.google]: {
      ...GOOGLE_AUTH_CONFIG,
      // TODO: Don't forget to override clientId for the prod environment
    },
    [OAuthProviderType.keycloak]: {
      ...KEYCLOAK_AUTH_CONFIG,
      issuer: 'https://keycloak.nguiland.org/realms/ostock',
    },
  },
};
