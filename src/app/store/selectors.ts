import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from './appState.interface';
import { Product } from './product.interface';

export const saveProductFeatureSelector =
  createFeatureSelector<AppStateInterface>('saveProduct');

export const isSavingProductSelector = createSelector(
  saveProductFeatureSelector,
  (saveProductState: AppStateInterface) => saveProductState.isSaved
);

export const getAllProductsFeatureSelector =
  createFeatureSelector<Product[]>('getAllProducts');

export const getAllProductsSelector = createSelector(
  getAllProductsFeatureSelector,
  (getAllProductsState: Product[]) => getAllProductsState
);
