import AccountsDropdown from "@/components/ui/Accounts/AccountsDropdown";
import { BreadcrumbRoot, BreadcrumbLink } from "@/components/ui/breadcrumb";

export default function Home() {
  return (
    <>
      <BreadcrumbRoot mb="1em">
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbRoot>
      <AccountsDropdown />
    </>
  );
}
