import { Environment } from '../models/environment';

export const environment: Environment = {
    production: false,
    vapidPublicKey: '',
    apiConnectorUrl: 'http://localhost:3000/api',
    keycloakConfig: {
        issuer: 'http://keycloak.infra/realms/ostock',
        requireHttps: false
    }
};