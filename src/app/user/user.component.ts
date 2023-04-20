import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { AngularFirestore } from '@angular/fire/compat/firestore/';
import { User } from 'src/models/user.class';
import { UserDetailComponent } from '../user-detail/user-detail.component';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
user = new User();
allUsers: any[] = [];


  constructor(public dialog: MatDialog, private firestore: AngularFirestore) {

  }

  ngOnInit(): void {
    this.firestore
    .collection('users')
    .valueChanges({idField: 'customIdName'})
    .subscribe((changes: any) => {
      console.log('Received changes from DB', changes)
      this.allUsers = changes;
    })
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent)
    
  }

}
