import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Model/User';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[];
  currentUserId: number = 0;

  constructor(private userService: UserService) {
    this.users = [];
  }
  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (response: User[]) => {
        this.users = response;
      },
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: () => this.getAllUsers(),
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }

  makeAdmin(email: string) {
    this.userService.makeAdmin(email).subscribe({
      next: () => this.getAllUsers(),
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }

  updateUserId(id: number) {
    this.currentUserId = id;
    for (let user of this.users) {
      if (user.id == id) {
        (document.getElementById('firstname') as HTMLInputElement).value =
          user.firstname;
        (document.getElementById('lastname') as HTMLInputElement).value =
          user.lastname;
        (document.getElementById('email') as HTMLInputElement).value =
          user.email;
      }
    }
  }

  updateUser() {
    let newFirstname: string = (
      document.getElementById('firstname') as HTMLInputElement
    ).value;
    let newLastname: string = (
      document.getElementById('lastname') as HTMLInputElement
    ).value;
    let newEmail: string = (
      document.getElementById('email') as HTMLInputElement
    ).value;

    this.userService.updateUserEmail(this.currentUserId, newEmail).subscribe({
      next: () => console.log('update successful'),
      error: (error: HttpErrorResponse) =>
        alert('Error updating email, email already exists!'),
    });

    this.userService
      .updateUserFirstname(this.currentUserId, newFirstname)
      .subscribe({
        next: () => console.log('Update first name done'),
        error: (error: HttpErrorResponse) => console.log(error.message),
      });

    this.userService
      .updateUserLastname(this.currentUserId, newLastname)
      .subscribe({
        next: () => this.getAllUsers(),
        error: (error: HttpErrorResponse) => console.log(error.message),
      });
  }
}
