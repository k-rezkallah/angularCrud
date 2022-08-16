import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import { isSavingProductSelector } from '../store/selectors';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  isSaving$ = new Observable<boolean>();

  constructor(private dialog: MatDialog, private store: Store) {}
  ngOnInit(): void {
    this.isSaving$ = this.store.pipe(select(isSavingProductSelector));
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '30%',
    });

    this.isSaving$.subscribe((response) => {
      console.log('inside open dialog out the if ', response);
      if (response) {
        dialogRef.close();
        console.log('inside open dialog in is saving', response);
      }
    });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result === 'save') {
    //     console.log(`Dialog result: ${result}`);
    //     // this.router.navigateByUrl('/');
    //   } else {
    //     console.log('im in else of save open dialog');
    //   }
    // });
  }
}
