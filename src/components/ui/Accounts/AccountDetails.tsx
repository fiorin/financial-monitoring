import { fetchAccounts } from "@/api/api";
import { Text } from "@chakra-ui/react";
import { Card } from "@chakra-ui/react/card";
import { useQuery } from "react-query";

interface AccountsDetailsProps {
  accountId: string;
}

type Account = {
  accountId: string;
  accountName: string;
  address: string;
  country: string;
  currency: string;
  email: string;
  phoneNumber: string;
};

const AccountsDetails = ({ accountId }: AccountsDetailsProps) => {
  const { data: accounts, isLoading } = useQuery(
    "fetchAccounts",
    fetchAccounts
  );

  if (!accountId) return null;

  if (isLoading || !accounts?.data) {
    return null;
  }

  const account: Account = accounts.data.find(
    (account: { accountId: string }) => account.accountId === accountId
  );

  return (
    <Card.Root mb="1em">
      <Card.Header>
        <Text color="#71717a" fontSize={"10px"} mb="1em">
          {account.accountId}
        </Text>
        <Text fontWeight="bold">
          {account.accountName}{" "}
          <Text as={"span"} color="#16a34a">
            {account.currency}
          </Text>
        </Text>
      </Card.Header>
      <Card.Body pt="0">
        <Text fontWeight="bold" color="#666" fontSize={"12px"}>
          {account.email}
        </Text>
        <Text fontWeight="bold" color="#666" fontSize={"12px"}>
          {account.phoneNumber}
        </Text>
        <Text fontSize={"12px"}>
          {account.address}, {account.country}
        </Text>
      </Card.Body>
    </Card.Root>
  );
};

export default AccountsDetails;
