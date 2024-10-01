import React from "react";
import AccountSettings from "./account_settings";
import BillingAdddress from "./billing_address";
import ChangePassword from "./change_password";
import FinancialStatement from "./financial_statement";

function ProfilePage() {
  return (
    <div className="bg-conic-purple flex flex-col space-y-4 items-center py-6">
      <h1 className="font-lexend text-lg font-semibold drop-shadow-text-white">
        Profil
      </h1>
      <div className="relative bg-white p-6 lg:py-14 lg:px-24 space-y-4 rounded-t-lg w-[85vw] max-w-[900px]">
        <AccountSettings />
        <BillingAdddress />
        <ChangePassword />
        <FinancialStatement />
      </div>
    </div>
  );
}

export default ProfilePage;
