import { KeycloakConfig } from "./keycloak-config";

export interface Environment {
    production: boolean;
    vapidPublicKey: string;
    url: string;
    keycloakConfig: KeycloakConfig
};