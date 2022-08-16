import { createAction, props } from '@ngrx/store';
import { ActionTypes } from './actionTypes';
import { Product } from './product.interface';

export const addProductAction = createAction(
  ActionTypes.ADD_PRODUCT,
  props<{ newProduct: Product }>()
);

export const addProductSuccessAction = createAction(
  ActionTypes.ADD_PRODUCT_SUCCESS
);

export const addProductFailureAction = createAction(
  ActionTypes.ADD_PRODUCT_FAILURE
);
