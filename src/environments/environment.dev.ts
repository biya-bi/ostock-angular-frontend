import { Environment } from '../models/environment';
import { GOOGLE_AUTH_CONFIG } from '../models/google-auth-config';
import { KEYCLOAK_AUTH_CONFIG } from '../models/keycloak-auth-config';

export const environment: Environment = {
    production: false,
    vapidPublicKey: '',
    apiConnectorUrl: 'https://dev-ostockapi.nguiland.org/api',
    googleConfig: {
        ...GOOGLE_AUTH_CONFIG,
        // TODO: Don't forget to override clientId for the dev environment
    },
    keycloakConfig: {
        ...KEYCLOAK_AUTH_CONFIG,
        issuer: 'https://dev-keycloak.nguiland.org/realms/ostock',
    }
};