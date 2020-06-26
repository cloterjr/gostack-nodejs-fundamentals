import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;

    const incomeTransactions: Transaction[] = this.transactions.filter(
      t => t.type === 'income',
    );

    const outcomeTransactions: Transaction[] = this.transactions.filter(
      t => t.type === 'outcome',
    );

    if (incomeTransactions.length > 0) {
      income = this.transactions
        .filter(t => t.type === 'income')
        .map(t => t.value)
        .reduce((t1, t2) => t1 + t2);
    }

    if (outcomeTransactions.length > 0) {
      outcome = this.transactions
        .filter(t => t.type === 'outcome')
        .map(t => t.value)
        .reduce((t1, t2) => t1 + t2);
    }

    const total = income - outcome;

    const balance: Balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction: Transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
