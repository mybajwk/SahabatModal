import React from "react";
import AccountSettings from "./account_settings";

function ProfilePage() {
  return (
    <div className="bg-conic-purple flex flex-col space-y-4 items-center py-6">
      <h1 className="font-lexend text-lg font-semibold drop-shadow-text-white">
        Profil
      </h1>
      <div className="relative bg-white p-6 rounded-lg w-[85vw]">
        <AccountSettings />
      </div>
    </div>
  );
}

export default ProfilePage;
