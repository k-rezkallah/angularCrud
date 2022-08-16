import { createReducer, on } from '@ngrx/store';

import { AppStateInterface } from 'src/app/store/appState.interface';
import {
  addProductAction,
  addProductSuccessAction,
} from 'src/app/store/actions';

const initialState: AppStateInterface = {
  isSaved: false,
};

export const dialogReducer = createReducer(
  initialState,
  on(
    addProductAction,
    (state): AppStateInterface => ({
      ...state,
      isSaved: true,
    })
  ),
  on(
    addProductSuccessAction,
    (state): AppStateInterface => ({
      ...state,
      isSaved: false,
    })
  )
);

// export function reducers(state: AppStateInterface, action: Action) {
//   return dialogReducer(state, action);
// }
