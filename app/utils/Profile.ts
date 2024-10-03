export interface UserBillingAddress {
  id: string;
  created_at: Date;
  name: string;
  company_name: string;
  address_line: string;
  country: string;
  state_province: string;
  zip_code: string;
  email: string;
  phone_number: string;
}

// Interface for UserAccount
export interface UserAccount {
  id: string;
  created_at: Date;
  email: string;
  phone_number: string;
  username: string;
  name: string;
  role: number;
  image?: string;
  //   Business?: any; // Define a more specific type if known
  UserBillingAddress?: UserBillingAddress;
}
export interface UserAccountW {
  data: UserAccount;
}
