import { MediaTipo, Media } from './media.model';
import { IUploadFile } from './upload.media.interface';
import { IScoreId } from './score.model';

export interface IUser {
  email: string;
  nombre?: string;
  apellido?: string;
  password: string;
  grupo?: string;
  isAdmin?: boolean;
  uid?: string;
  favs?: string[];
  fcmTokens?: { [token: string]: boolean };
}
export class User implements IUser {
  email: string;
  nombre: string;
  apellido: string;
  password: string;
  uid?: string;
  favs?: string[];
  isAdmin: boolean;

  grupo: string;
  avatar: string = '/assets/user.jpg';
  fcmTokens?: { [token: string]: boolean };
  constructor(i: IUser) {
    this.email = (i.email) ? i.email : '';
    this.nombre = (i.nombre) ? i.nombre : '';
    this.apellido = (i.apellido) ? i.apellido : '';
    this.password = (i.password) ? i.password : '';
    this.isAdmin = (i.isAdmin) ? i.isAdmin : false;
    this.uid = (i.uid) ? i.uid : '';
    this.favs = (i.favs) ? i.favs : [];
    this.grupo = (!i.grupo || i.grupo === '') ? 'Desconocido' : i.grupo;
  }


  static isUser(arg: any): arg is User {
    return (arg.email !== undefined) && (arg.password !== undefined);
  }
  setPath(tipo: MediaTipo): string {
    switch (tipo) {
      case MediaTipo.AVATAR:
        return `OSJIG/avatar/${this.email}`;
      case MediaTipo.MP3:
      case MediaTipo.IMG:
      case MediaTipo.MIDI:
      case MediaTipo.PDF:
      case MediaTipo.YOUTUBE:
      default:
        const err = `Media ${tipo} no se suben archivos`;
        console.log(err);
        return err;
    }
  }
}

