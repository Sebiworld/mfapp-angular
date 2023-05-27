import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiService } from "@services/api/api.service";

import { ApiPermission, ApiRole } from "@models/api-user.model";

@Injectable({
  providedIn: 'root',
})
export class AuthApiService extends ApiService {

  loadUser(accessToken?: string): Observable<{
    id: string; name: string; roles?: ApiRole[]; permissions?: ApiPermission[]; loggedIn: boolean;
  }> {
    const headers: { [name: string]: string } = {};
    if (accessToken) {
      headers.Authorization = 'Bearer ' + accessToken;
    }
    return this.get(this.baseUrl + 'auth', undefined, undefined, headers);
  }

  login(email: string, password: string): Observable<{ refresh_token: string; username: string }> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + window.btoa(email + ':' + password)
    };

    return this.post(this.baseUrl + 'auth', {}, headers);
  }

  access(refreshToken: string): Observable<{ refresh_token: string; access_token: string }> {
    const headers = {
      Authorization: 'Bearer ' + refreshToken
    };

    return this.post(this.baseUrl + 'auth/access', {}, headers);
  }

  registration(
    email: string, password: string, firstname: string, lastname: string, birthdate: number,
    nickname?: string, rolestext?: string
  ): Observable<any> {
    return this.post(this.baseUrl + 'auth/registration', {
      email, password, firstname, lastname, nickname, birthdate, rolestext
    });
  }

  registrationConfirm(token: string): Observable<any> {
    return this.post(this.baseUrl + 'auth/registration_confirm', {
      token
    });
  }

  logout(): Observable<any> {
    return this.delete(this.baseUrl + 'auth');
  }
}
