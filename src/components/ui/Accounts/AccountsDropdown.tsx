"use client";

import { createListCollection, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../select";
import { fetchAccounts } from "@/api/api";
import { useQuery } from "react-query";
import { SetStateAction } from "react";
import { Alert } from "../alert";

interface Account {
  accountId: string;
  accountName: string;
}

interface AccountsDropdownProps {
  accountId?: string;
}

const AccountsDropdown = ({ accountId }: AccountsDropdownProps) => {
  const { push } = useRouter();

  const { data: accounts, isLoading } = useQuery(
    "fetchAccounts",
    fetchAccounts
  );

  if (isLoading) {
    return <Spinner mb={"1em"} />;
  }

  if (!accounts?.data) {
    if (!!accounts.error) {
      return <Alert mb={"1em"} status="error" title={accounts.error} />;
    }
    return null;
  }

  const accountKeyValues = accounts.data.map((account: Account) => ({
    label: account.accountName,
    value: account.accountId,
  }));

  const accountCollection = createListCollection({ items: accountKeyValues });

  const handleAccount = (e: { value: SetStateAction<string[]> }) => {
    const accountId = e.value;
    push(`/${accountId}`);
  };

  return (
    <>
      <SelectRoot
        collection={accountCollection}
        size="lg"
        width="320px"
        onValueChange={handleAccount}
        value={[accountId ?? ""]}
        mb={"1em"}
      >
        <SelectTrigger>
          <SelectValueText placeholder="Select the account" />
        </SelectTrigger>
        <SelectContent>
          {(accountCollection.items as { value: string; label: string }[]).map(
            (account) => (
              <SelectItem item={account} key={account.value}>
                {account.label}
              </SelectItem>
            )
          )}
        </SelectContent>
      </SelectRoot>
    </>
  );
};

export default AccountsDropdown;
