import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ActionReducerMap, Store, State } from '@ngrx/store';

// reducers
import * as fromAuth from './auth';
import * as fromUi from './ui';
import * as fromMusic from './music';
import * as fromMedia from './media';


// The top level Echoes Player application interface
// each reducer is reponsible for manipulating a certain state
export interface OrcaState {
  ui: fromUi.State;
  user: fromAuth.State;
  media: fromMedia.State;
  music: fromMusic.State;
}
export const OrcaReducers: ActionReducerMap<OrcaState> = {
  ui: fromUi.uiReducer,
  user: fromAuth.authReducer,
  media: fromMedia.mediaReducer,
  music: fromMusic.musicReducer,
};

export let OrcaActions = [
  fromAuth.ActionTypes,
  fromUi.ActionTypes,
  fromMedia.ActionTypes,
  fromMusic.ActionTypes,
];
  //  export const metaReducers: MetaReducer<AppState>[] =   !environment.production ? [storeFreeze] : [];
