import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActionTypes, Actions } from './music.actions';
import { IScore, Origin, MediaType, Score } from '../../models/';

export interface State {
  partitura: IScore;
  grupos: string[];
  favoritos: IScore[];
}
const initialState: State = {
  partitura: {
    its: 0,
    obra: '',
    almacenamiento: [],
  },
  grupos: [],
  favoritos: [],
};

export function musicReducer(state = initialState, action: Actions) {
  switch (action.type) {
    case ActionTypes.SET_GRUPOS: {
      return {
        ...state,
        grupos: action.payload as string[],
      };
    }
    case ActionTypes.ADD_ORIGIN: {
      return addOrigin(state, action.payload as { origin: Origin, type: MediaType });
    }
    case ActionTypes.SET_PARTITURA:
      return {
        ...state,
        partitura: action.payload as IScore,
      };
    default: {
      return state;
    }
  }
}
function addOrigin(state: State, payload: { origin: Origin, type: MediaType }): State {
  const partitura = new Score(state.partitura);
  partitura.addMediaOrigin(payload.type, payload.origin);
  return { ...state, partitura };
}

