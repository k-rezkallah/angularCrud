import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import { Product } from '../store/product.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [
    'productName',
    'category',
    'date',
    'price',
    'freshness',
    'comment',
    'actions',
  ];

  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource$!: Observable<MatTableDataSource<Product>>;

  constructor(private api: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.initialValues();
    // this.getAllProducts();
    this.api.RefreshRequired.subscribe(() => {
      console.log('inside RefreshRequired');
      this.getAllProducts();
    });
  }
  initialValues(): void {
    // this.store.dispatch(getAllProductsAction());
    this.getAllProducts();
  }

  getAllProducts() {
    this.api.getProduct().subscribe((product: Product[]) => {
      console.log('inside get All products', product);
      this.dataSource.data = product;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editProduct(row: Product) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '30%',
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'update') {
        console.log(result);
        this.getAllProducts();
      }
    });
  }

  deleteProduct(id: number) {
    this.api.deleteProduct(id).subscribe({
      next: () => {
        alert('deleted successfuly deleted');
        this.getAllProducts();
      },
      error: () => {
        alert('Error while deleting record');
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
