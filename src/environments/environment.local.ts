import { Environment } from '../models/environment';
import { KEYCLOAK_AUTH_CONFIG } from '../models/keycloak-auth-config';

export const environment: Environment = {
    production: false,
    vapidPublicKey: '',
    apiConnectorUrl: 'http://gateway-service.ostock/api',
    keycloakConfig: {
        ...KEYCLOAK_AUTH_CONFIG,
        issuer: 'http://keycloak.infra:8080/realms/ostock',
        requireHttps: false
    }
};