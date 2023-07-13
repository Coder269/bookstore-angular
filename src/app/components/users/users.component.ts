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
}
