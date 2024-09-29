/* eslint-disable @typescript-eslint/no-explicit-any */
// declarations.d.ts
declare module "react-country-state-city" {
  export function GetCountries(): Promise<any[]>;
  export function GetState(countryId: number): Promise<any[]>;
  export function GetCity(countryId: number, stateId: number): Promise<any[]>;

  export const CountrySelect: any;
  export const StateSelect: any;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.gif" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const content: any;
  export default content;
}
