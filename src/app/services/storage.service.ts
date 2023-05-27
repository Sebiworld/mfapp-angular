import { Injectable, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, combineLatest, firstValueFrom, Observable, Subject } from 'rxjs';
import { filter, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements OnDestroy {

  private unsubscribe$ = new Subject<void>();

  private _storage$: BehaviorSubject<Storage | null> = new BehaviorSubject(null);
  private _initialized$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private storage$: Observable<Storage | null> = combineLatest([
    this._storage$.asObservable(),
    this._initialized$.asObservable()
  ]).pipe(
    filter(([, initialized]) => !!initialized),
    map(([storage]) => storage)
  );

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage$.next(storage);
    this._initialized$.next(true);
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  /**
   * Saves a value to the local-storage. Values can be strings, numbers, booleans but also objects or
   * array (everything which is serializable via JSON.stringify).
   *
   * @param key
   * @param value
   */
  async set(key: string, value: any): Promise<void> {
    const storage = await firstValueFrom(this.storage$);
    await storage?.set(key, JSON.stringify(value));
  }

  /**
   * Returns a value from storage.
   *
   * @param key
   */
  async get(key: string): Promise<any> {
    const storage = await firstValueFrom(this.storage$);
    const value = await storage?.get(key);
    return JSON.parse(value);
  }

  /**
   * Removes a value from storage
   *
   * @param key
   */
  async remove(key: string): Promise<void> {
    const storage = await firstValueFrom(this.storage$);
    await storage?.remove(key);
  }

  /**
   * Returns all keys, that are currently in use
   */
  async keys(): Promise<any> {
    const storage = await firstValueFrom(this.storage$);
    const keys = await storage?.keys();
    if (keys?.keys) { return keys.keys; }
    return keys;
  }

  /**
   * Clears everything from storage (not used)
   */
  async clear(): Promise<void> {
    const storage = await firstValueFrom(this.storage$);
    await storage?.clear();
  }
}
