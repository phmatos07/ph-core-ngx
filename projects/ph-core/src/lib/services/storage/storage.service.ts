import { Injectable } from '@angular/core';
import { StorageTypeEnum } from './enum/storage-type.enum';

@Injectable({ providedIn: 'root' })
export class StorageService {

  keyName = 'phCoreNgx';

  setItem<T>(data: T, storageType = StorageTypeEnum.SESSION_STORAGE): void {

    if (data) {

      const dataJson = JSON.stringify(data);

      if (storageType === StorageTypeEnum.SESSION_STORAGE) {
        sessionStorage.setItem(this.keyName, dataJson);
        return;
      }
      localStorage.setItem(this.keyName, dataJson);
    }
  }

  getItem(storageType = StorageTypeEnum.SESSION_STORAGE): JSON {

    try {

      let dataJson = null;

      if (storageType === StorageTypeEnum.SESSION_STORAGE) {
        dataJson = sessionStorage.getItem(this.keyName);
      } else {
        dataJson = localStorage.getItem(this.keyName);
      }

      if (!dataJson) {
        throw storageType;
      }
      return JSON.parse(dataJson);

    } catch (err) {
      console.warn(`Infelizmente não existe dados armazenados na ${err}`);
      return JSON;
    }
  }

  removeItem(storageType = StorageTypeEnum.SESSION_STORAGE): void {

    if (storageType === StorageTypeEnum.SESSION_STORAGE) {
      sessionStorage.removeItem(this.keyName);
      return;
    }
    localStorage.removeItem(this.keyName);
  }

  clearStorage(): void {
    sessionStorage.clear();
  }
}
