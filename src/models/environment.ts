import { KeycloakConfig } from "./keycloak-config";

export interface Environment {
    production: boolean;
    vapidPublicKey: string;
    apiConnectorUrl: string;
    keycloakConfig: KeycloakConfig
};