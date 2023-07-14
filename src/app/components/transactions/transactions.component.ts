import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Purchase } from 'src/app/Model/Purchase';
import { AutheticationService } from 'src/app/Service/authetication.service';
import { TransactionService } from 'src/app/Service/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  purchases: Purchase[] = [];

  constructor(
    private transactionService: TransactionService,
    private authenticationService: AutheticationService
  ) {}
  ngOnInit(): void {
    this.getUserPurchases();
  }

  getUserPurchases() {
    let userEmail: string = this.authenticationService.currentUser.email;
    this.transactionService.getUserPurchases(userEmail).subscribe({
      next: (response: Purchase[]) => {
        this.purchases = response;
      },
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }
}
