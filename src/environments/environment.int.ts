import { Environment } from '../models/environment';

export const environment: Environment = {
    production: false,
    vapidPublicKey: '',
    apiConnectorUrl: 'https://int-ostockapi.nguiland.org/api',
    keycloakConfig: {
        issuer: 'https://int-keycloak.nguiland.org/realms/ostock',
        requireHttps: true,
    }
};
