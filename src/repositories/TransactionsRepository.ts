import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTrasactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    const balanceTotal = this.transactions.reduce<Balance>(
      (balance, transaction) => {
        if (transaction.type === 'income') {
          return {
            ...balance,
            income: balance.income + transaction.value,
            total: balance.total + transaction.value,
          };
        }
        return {
          ...balance,
          outcome: balance.outcome + transaction.value,
          total: balance.total - transaction.value,
        };
      },
      { income: 0, outcome: 0, total: 0 },
    );

    return balanceTotal;
  }

  public create({ title, value, type }: CreateTrasactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
