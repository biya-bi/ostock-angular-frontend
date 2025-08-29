import { Environment } from '../models/environment';
import { KEYCLOAK_AUTH_CONFIG } from '../models/keycloak-auth-config';

export const environment: Environment = {
    production: false,
    vapidPublicKey: '',
    apiConnectorUrl: 'https://dev-ostockapi.nguiland.org/api',
    keycloakConfig: {
        ...KEYCLOAK_AUTH_CONFIG,
        issuer: 'https://dev-keycloak.nguiland.org/realms/ostock',
    }
};