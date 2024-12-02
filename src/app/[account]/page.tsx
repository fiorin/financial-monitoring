"use client";

import AccountsDropdown from "@/components/ui/Accounts/AccountsDropdown";
import { useParams } from "next/navigation";
import AccountDetails from "@/components/ui/Accounts/AccountDetails";
import Transactions from "@/components/ui/Transactions/Transactions";
import {
  BreadcrumbRoot,
  BreadcrumbLink,
  BreadcrumbCurrentLink,
} from "@/components/ui/breadcrumb";
import { Separator } from "@chakra-ui/react";

export default function Home() {
  const { account: accountId } = useParams();

  return (
    <>
      <BreadcrumbRoot mb="1em">
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
        <BreadcrumbCurrentLink>{accountId}</BreadcrumbCurrentLink>
      </BreadcrumbRoot>
      <AccountsDropdown accountId={accountId as string} />
      {accountId && <AccountDetails accountId={accountId as string} />}
      <Separator mb="1em" />
      {accountId && <Transactions accountId={accountId as string} />}
    </>
  );
}
