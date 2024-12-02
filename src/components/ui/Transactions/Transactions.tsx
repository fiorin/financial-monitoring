/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import TransactionsList from "./TransactionsList";
import TransactionsListener from "./TransactionsListener";
import { Separator } from "@chakra-ui/react/separator";
import TransactionsFilters from "./TransactionsFilters";

interface TransactionsProps {
  accountId: string;
}

const getLastTransactionId = (transactions: any[]) => {
  return transactions[transactions.length - 1].transactionId;
};

const Transactions = ({ accountId }: TransactionsProps) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);
  const [active, setActive] = useState(true);
  const [filters, setFilters] = useState({});

  const handleApplyFilters = useCallback(
    (filters: { min?: number; max?: number; currencies?: string[] }) => {
      const { min, max, currencies } = filters;
      setFilters(filters);

      const filtered = transactions.filter((transaction) => {
        const matchesMin = min === undefined || transaction.amount >= min;
        const matchesMax = max === undefined || transaction.amount <= max;
        const matchesCurrency =
          !currencies ||
          currencies.length === 0 ||
          currencies.includes(transaction.currency);

        return matchesMin && matchesMax && matchesCurrency;
      });

      setFilteredTransactions(filtered);
    },
    [transactions]
  );

  useEffect(() => {
    if (!active) return;

    const lastTransactionId = transactions.length
      ? getLastTransactionId(transactions)
      : null;
    const sinceParam = lastTransactionId ? `?since=${lastTransactionId}` : "";
    const url = `https://paloma-financial-auditor-0aff70148dbe.herokuapp.com/accounts/${accountId}/transactions${sinceParam}`;

    const websocket = new WebSocket(url);

    websocket.onopen = () => {};

    websocket.onmessage = (event) => {
      const newTransaction = JSON.parse(event.data);
      setTransactions((prevTransactions) => [
        newTransaction,
        ...prevTransactions,
      ]);
    };

    return () => {
      websocket.close();
    };
  }, [accountId, active, transactions]);

  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      handleApplyFilters(filters);
    } else {
      setFilteredTransactions(transactions);
    }
  }, [filters, handleApplyFilters, transactions]);

  if (!accountId) return null;

  if (!transactions.length) return null;

  return (
    <>
      <TransactionsFilters onApplyFilters={handleApplyFilters} />
      <Separator mb="1em" />
      <TransactionsListener onClick={setActive} />
      <TransactionsList transactions={filteredTransactions} />
    </>
  );
};

export default Transactions;
