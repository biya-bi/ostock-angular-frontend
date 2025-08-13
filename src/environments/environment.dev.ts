import { Environment } from '../models/environment';

export const environment: Environment = {
    production: false,
    vapidPublicKey: '',
    apiConnectorUrl: 'https://dev-ostockapi.nguiland.org/api',
    keycloakConfig: {
        issuer: 'https://dev-keycloak.nguiland.org/realms/ostock',
        requireHttps: true
    }
};