import { AuthConfig } from "angular-oauth2-oidc";

export interface Environment {
    production: boolean;
    vapidPublicKey: string;
    apiConnectorUrl: string;
    googleConfig: AuthConfig;
    keycloakConfig: AuthConfig;
};