import { Environment } from '../models/environment';
import { KEYCLOAK_AUTH_CONFIG } from '../models/keycloak-auth-config';

export const environment: Environment = {
    production: false,
    vapidPublicKey: '',
    apiConnectorUrl: 'https://int-ostockapi.nguiland.org/api',
    keycloakConfig: {
        ...KEYCLOAK_AUTH_CONFIG,
        issuer: 'https://int-keycloak.nguiland.org/realms/ostock',
    }
};
