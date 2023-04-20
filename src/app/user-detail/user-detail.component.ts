import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditNameComponent } from '../dialog-edit-name/dialog-edit-name.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userId: string = '';
  user: User = new User();


  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog,) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    console.log('User ID:', this.userId);
    this.getUser();
  }

  getUser() {
    this.firestore
    .collection('users')
    .doc(this.userId)
    .valueChanges()
    .subscribe((user: any) =>{
      this.user = new User(user);
      console.log('Collection user is:', this.user);
    })
  }

  editName() {
    const dialog = this.dialog.open(DialogEditNameComponent)
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  editAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent)
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }
}
