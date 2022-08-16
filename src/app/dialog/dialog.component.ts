import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ApiService } from '../services/api.service';
import { addProductAction } from '../store/actions';
import { Product } from '../store/product.interface';
import { isSavingProductSelector } from '../store/selectors';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  freshList = ['New brand', 'Second hand', 'No freshness'];
  productForm!: FormGroup;
  actionButton: string = 'Save';
  isSaving$!: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initilValues();
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });

    if (this.editData) {
      this.actionButton = 'Update';

      this.productForm.controls['productName'].setValue(
        this.editData.productName
      );
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      console.log(this.editData, this.editData.id);
    }
  }

  initilValues() {
    this.isSaving$ = this.store.pipe(select(isSavingProductSelector));
  }

  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        //dispatch the actions of adding product
        const newProduct: Product = this.productForm.value;
        this.saveProduct(newProduct);
      }
    } else {
      this.updateProduct();
    }
  }

  saveProduct(newProduct: Product) {
    this.store.dispatch(addProductAction({ newProduct }));
  }
  updateProduct() {
    this.api.putProduct(this.productForm.value, this.editData.id).subscribe({
      next: (resp) => {
        alert('Updated Successfuly');
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert('Error while updating product');
      },
    });
  }
}
