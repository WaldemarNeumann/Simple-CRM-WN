import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore/';

@Component({
  selector: 'app-dialog-edit-name',
  templateUrl: './dialog-edit-name.component.html',
  styleUrls: ['./dialog-edit-name.component.scss']
})
export class DialogEditNameComponent {
  user: User = new User();
  loading = false;
  birthDate: Date = new Date();
  userId: string = '';

  constructor(public dialogRef: MatDialogRef<DialogEditNameComponent>, private firestore: AngularFirestore) {

  }

  saveUser() {
    this.loading = true;
    this.firestore
    .collection('users')
    .doc(this.userId)
    .update(this.user.toJSON())
    .then(() => {
      this.loading = false;
    })
  }
}
