"use client";

import React from "react";
import AccountSettings from "./account_settings";
import BillingAdddress from "./billing_address";
import ChangePassword from "./change_password";
import FinancialStatement from "./financial_statement";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/components/ui/loading";

function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />; // You can replace this with a spinner or loading animation
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  if (!session) {
    router.refresh();
    router.push("/login");
    return null;
  }
  return (
    <div className="bg-conic-purple flex flex-col space-y-4 items-center py-6">
      <h1
        className="font-lexend text-2xl font-semibold drop-shadow-text-white lg:text-3xl lg:py-5"
        style={{
          textShadow:
            "0px 0px 28.792px rgba(255, 255, 255, 0.40), 0px 0px 14.396px rgba(255, 255, 255, 0.80)",
        }}
      >
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
