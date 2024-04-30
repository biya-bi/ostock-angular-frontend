import { Observable } from "rxjs";
import { UserProfile } from "../models/user-profile";

export interface AuthenticationService {
    logIn(): Observable<UserProfile>;
    logOut(): void;
}