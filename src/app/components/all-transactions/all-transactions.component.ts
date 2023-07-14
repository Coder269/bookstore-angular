import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Purchase } from 'src/app/Model/Purchase';
import { TransactionService } from 'src/app/Service/transaction.service';

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.css'],
})
export class AllTransactionsComponent {
  purchases: Purchase[] = [];

  constructor(private transactionService: TransactionService) {}
  ngOnInit(): void {
    this.getAllPurchases();
  }

  getAllPurchases() {
    this.transactionService.getAllPurchases().subscribe({
      next: (response: Purchase[]) => {
        this.purchases = response;
      },
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }
}
