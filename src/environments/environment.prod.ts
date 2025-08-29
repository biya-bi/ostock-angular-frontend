import { Environment } from '../models/environment';
import { KEYCLOAK_AUTH_CONFIG } from '../models/keycloak-auth-config';

export const environment: Environment = {
    production: true,
    vapidPublicKey: 'BFLuRSPx2KF53-x_gCHwqd7ZG_QD29dTEVDbLj4VUaJvcDXgDiBH2piAebQ69-wkchJLOczyon29aTqsowhzN0I',
    apiConnectorUrl: 'https://ostockapi.nguiland.org/api',
    keycloakConfig: {
        ...KEYCLOAK_AUTH_CONFIG,
        issuer: 'https://keycloak.nguiland.org/realms/ostock',
    }
};