import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();
const createTransactionService = new CreateTransactionService(
  transactionsRepository,
);

transactionRouter.get('/', (request, response) => {
  try {
    const transactions: Transaction[] = transactionsRepository.all();
    const balance: Balance = transactionsRepository.getBalance();

    return response.status(200).json({ transactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    try {
      const { title, value, type } = request.body;

      const transaction: Transaction = createTransactionService.execute({
        title,
        value,
        type: type.toLowerCase(),
      });

      return response.status(201).json(transaction);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
