import { Injectable } from '@angular/core';
import { MediaType, User, Score } from '../../models';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';

@Injectable()
export class FbStorageService {
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<firebase.storage.UploadTaskSnapshot>;
  downloadURL: Observable<string>;

  constructor(private storage: AngularFireStorage) { }
  upload(type: MediaType, data: User | Score, file: File) {
    try {
      const path = this.setPath(type, data);
      console.log(path);
      const customMetadata = { app: 'CUSTOM METADATA BIAATCH!' };
      this.task = this.storage.upload(<string> path, file, { customMetadata });
      this.percentage = this.task.percentageChanges();
      this.snapshot = this.task.snapshotChanges();
      const fileRef = this.storage.ref(<string> path);
      this.downloadURL = (type === MediaType.AVATAR || type === MediaType.IMG)
        ? fileRef.getDownloadURL()
        : of('assets/file.png');
    }
    catch (e) { console.error(e); }
  }
  private setPath(type: MediaType, data: User | Score): string | Error {
    switch (type) {
      case MediaType.AVATAR:
        if (data instanceof User) {
          return `test/${type}/${data.nombre}-${data.apellido}`;
        }
        break;
      case MediaType.MP3:
      case MediaType.IMG:
      case MediaType.MIDI:
      case MediaType.MXML:
      case MediaType.PDF:
        if (data instanceof Score) {
          return `test/${type}/${data.generos[0]}/${data.obra}/`;
        }
        break;
      case MediaType.YOUTUBE:
        return new Error('A youtube no se suben archivos');
      default:
        return new Error('No hay posible path');
    }
  }
}