import { Environment } from '../models/environment';

export const environment: Environment = {
    production: false,
    vapidPublicKey: '',
    url: 'http://localhost:8072/api',
    keycloakConfig: {
        issuer: 'https://devkeycloak.nguiland.org/realms/ostock',
        requireHttps: true
    }
};