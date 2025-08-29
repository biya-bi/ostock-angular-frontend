import { AuthConfig } from "angular-oauth2-oidc";

export const GOOGLE_AUTH_CONFIG: AuthConfig = {
    issuer: 'https://accounts.google.com',
    strictDiscoveryDocumentValidation: false,
    redirectUri: document.location.origin,
    clientId: '479603210590-tg2941ec6ivracsia1sv2bf93di5b3rp.apps.googleusercontent.com',
    scope: 'openid profile email',
};
