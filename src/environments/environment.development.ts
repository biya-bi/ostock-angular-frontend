import { Environment } from '../models/environment';

export const environment: Environment = {
    production: false,
    vapidPublicKey: '',
    apiConnectorUrl: 'https://devostockapi.nguiland.org/api',
    keycloakConfig: {
        issuer: 'https://devkeycloak.nguiland.org/realms/ostock',
        requireHttps: true
    }
};