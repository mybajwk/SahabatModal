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
  import { StaticImageData } from "next/image";
  const content: StaticImageData;
  export default content;
}

declare module "*.jpg" {
  import { StaticImageData } from "next/image";
  const content: StaticImageData;
  export default content;
}

declare module "*.jpeg" {
  import { StaticImageData } from "next/image";
  const content: StaticImageData;
  export default content;
}

declare module "*.svg" {
  import { StaticImageData } from "next/image";
  const content: StaticImageData;
  export default content;
}
