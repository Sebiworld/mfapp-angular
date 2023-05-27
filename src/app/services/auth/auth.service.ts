import { Injectable } from "@angular/core";

import { StorageService } from "@services/storage.service";

import { AuthStoreFacade } from "./+store/auth-store.facade";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private authStoreFacade: AuthStoreFacade,
    private storageService: StorageService
  ) { }

  async setNickname(nickname: string, shouldSave = true) {
    if (!nickname || typeof nickname !== 'string') { return; }
    this.authStoreFacade.setNickname(nickname);
    if (shouldSave) { await this.storageService.set('nickname', nickname); }
  }

  login(email: string, password: string, timestamp: number) {
    return this.authStoreFacade.login(email, password, timestamp);
  }

  logout(alert?: string, preventServerLogout?: boolean): void {
    return this.authStoreFacade.logout(alert, preventServerLogout);
  }

  registration(
    email: string, password: string, firstname: string, lastname: string, birthdate: number, timestamp: number,
    nickname?: string, rolestext?: string) {
    this.authStoreFacade.registration(email, password, firstname, lastname, birthdate, timestamp, nickname, rolestext);
  }

  confirmRegistration(token: string) {
    this.authStoreFacade.confirmRegistration(token);
  }

  setInterruptedUrl(url: string): void {
    return this.authStoreFacade.setInterruptedUrl(url);
  }
}
