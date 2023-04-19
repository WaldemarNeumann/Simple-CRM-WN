import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore/';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User();
  birthDate: Date = new Date();
  loading = false;



  constructor(private firestore: AngularFirestore) {

  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current User is', this.user)
    this.loading = true;

    this.firestore
    .collection('users')
    .add(this.user)
    .then((result: any) => {
      console.log('Adding user finished', result);
    })
  }
}
