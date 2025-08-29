import { AuthConfig } from "angular-oauth2-oidc";
import { OAuthProviderType } from "./oauth-provider-type";

export interface Environment {
    production: boolean;
    vapidPublicKey: string;
    apiConnectorUrl: string;
    oAuthProviders: { [key in OAuthProviderType]: AuthConfig }
};