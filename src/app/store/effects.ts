import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ApiService } from '../services/api.service';
import {
  addProductAction,
  addProductFailureAction,
  addProductSuccessAction,
} from './actions';
import { Product } from './product.interface';

@Injectable()
export class Effects {
  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProductAction),

      switchMap(({ newProduct }) => {
        return this.api.addProduct(newProduct).pipe(
          map((product: Product) => {
            return addProductSuccessAction();
          }),
          catchError(() => {
            return of(addProductFailureAction());
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private api: ApiService) {}
}
