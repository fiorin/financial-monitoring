import { Table } from "@chakra-ui/react/table";
import { Text } from "@chakra-ui/react";
import { MdCallMade } from "react-icons/md";
import { MdCallReceived } from "react-icons/md";
import { formatDate } from "@/utils/utils";

interface TransactionsListProps {
  transactions: Array<{
    direction: string;
    account: string;
    amount: number;
    currency: string;
    timestamp: string;
    transactionId: string;
    destinationName: string;
    destinationId: string;
  }>;
}

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
}) => {
  return (
    <>
      <Text fontSize={"12px"} fontWeight={"bold"} mb={"1em"}>
        Showing {transactions.length} transactions
      </Text>
      <Table.Root variant="outline" stickyHeader>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader></Table.ColumnHeader>
            <Table.ColumnHeader>Account</Table.ColumnHeader>
            <Table.ColumnHeader>Amount</Table.ColumnHeader>
            <Table.ColumnHeader>Currency</Table.ColumnHeader>
            <Table.ColumnHeader>Time</Table.ColumnHeader>
            <Table.ColumnHeader>Transaction Id</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {!transactions.length && (
            <Table.Row>
              <Table.Cell>
                <Text>No transactions</Text>
              </Table.Cell>
            </Table.Row>
          )}
          {transactions.map((transaction) => {
            const isPositive = transaction.direction == "inflow";
            const time = formatDate(transaction.timestamp);
            return (
              <Table.Row key={transaction.transactionId}>
                <Table.Cell fontSize={"30px"}>
                  {isPositive ? (
                    <MdCallReceived color="#16a34a" />
                  ) : (
                    <MdCallMade color="#dc2626" />
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Text color="#3f3f46" fontWeight={"bold"}>
                    {transaction.destinationName}
                  </Text>
                  <Text color="#71717a" fontSize={"10px"}>
                    {transaction.destinationId}
                  </Text>
                </Table.Cell>
                <Table.Cell textAlign={"right"}>
                  {isPositive ? (
                    <Text color="#16a34a">{`+${transaction.amount}`}</Text>
                  ) : (
                    <Text color="#dc2626">{`-${transaction.amount}`}</Text>
                  )}
                </Table.Cell>
                <Table.Cell fontWeight={"bold"}>
                  {transaction.currency}
                </Table.Cell>
                <Table.Cell fontSize={"12px"}>{time}</Table.Cell>
                <Table.Cell>
                  <Text color="#71717a" fontSize={"10px"}>
                    {transaction.transactionId}
                  </Text>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default TransactionsList;
