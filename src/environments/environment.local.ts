import { Environment } from '../models/environment';

export const environment: Environment = {
    production: false,
    vapidPublicKey: '',
    apiConnectorUrl: 'http://gateway-service.ostock/api',
    keycloakConfig: {
        issuer: 'http://keycloak.infra/realms/ostock',
        requireHttps: false
    }
};