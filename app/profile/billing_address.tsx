/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { GetCountries, GetState } from "react-country-state-city";
import { Button } from "@/components/ui/button";

function BillingAddress() {
  const [countryId, setCountryId] = useState<number | null>(null);
  const [stateId, setStateId] = useState<number | null>(null);

  const [countriesList, setCountriesList] = useState<any[]>([]);
  const [stateList, setStateList] = useState<any[]>([]);
  //   const [cityList, setCityList] = useState<any[]>([]);

  // Fetch the countries list on component mount
  useEffect(() => {
    async function fetchCountries() {
      const result = await GetCountries();
      setCountriesList(result);
    }
    fetchCountries();
  }, []);

  // Fetch the states list when countryId is updated
  useEffect(() => {
    if (countryId !== null) {
      const fetchStates = async () => {
        const result = await GetState(countryId);
        setStateList(result);
      };
      fetchStates();
    }
  }, [countryId]);

  //   useEffect(() => {
  //     if (countryId !== null && stateId !== null) {
  //       async function fetchCities() {
  //         const result = await GetCity(countryId, stateId);
  //         setCityList(result);
  //       }
  //       fetchCities();
  //     }
  //   }, [countryId, stateId]);

  return (
    <div className="bg-[#FAFAFA] font-poppins flex flex-col border border-[#E6E6E6] rounded-md">
      <div className="w-full text-[#1A1A1A]">
        <h2 className="text-center text-sm font-semibold border-b border-[#E6E6E6] px-3 py-4 md:text-start">
          Billing Address
        </h2>
        <div className="flex flex-col p-4 space-y-4">
          {/* First Name, Last Name, Company Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col space-y-1">
              <Label className="font-poppins font-[400] text-xs">
                First Name
              </Label>
              <Input className="text-[#666666] text-xs" placeholder="Dianne" />
            </div>
            <div className="flex flex-col space-y-1">
              <Label className="font-poppins font-[400] text-xs">
                Last Name
              </Label>
              <Input className="text-[#666666] text-xs" placeholder="Russell" />
            </div>
            <div className="flex flex-col space-y-1 md:col-span-2 lg:col-span-1">
              <Label className="font-poppins font-[400] text-xs">
                Company Name <span className="text-[#808080]">(optional)</span>
              </Label>
              <Input
                className="text-[#666666] text-xs"
                placeholder="Zakirsoft"
              />
            </div>
          </div>

          {/* Street Address */}
          <div className="flex flex-col space-y-1 mt-1">
            <Label className="font-poppins font-[400] text-xs">
              Street Address
            </Label>
            <Input
              className="text-[#666666] text-xs"
              placeholder="76471 Shields Extension, Stevemouth, IN 21053-1876"
            />
          </div>

          {/* Country, State, Zip Code */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Country */}
            <div className="flex flex-col space-y-1">
              <Label className="font-poppins font-[400] text-xs">
                Country / Region
              </Label>
              <Select
                onValueChange={(value) => {
                  const country = countriesList.find(
                    (item) => item.id === value
                  );
                  setCountryId(country.id);
                  setStateList([]);
                }}
              >
                <SelectTrigger className="text-[#666666] text-xs">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent className="text-[#666666] text-xs">
                  {countriesList.map((country) => (
                    <SelectItem key={country.id} value={country.id}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* States */}
            <div className="flex flex-col space-y-1">
              <Label className="font-poppins font-[400] text-xs">State</Label>
              <Select
                onValueChange={(value) => {
                  const state = stateList.find((item) => item.id === value);
                  setStateId(state.id);
                }}
                disabled={stateList.length === 0}
              >
                <SelectTrigger className="text-[#666666] text-xs">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent className="text-[#666666] text-xs">
                  {stateList.map((state) => (
                    <SelectItem key={state.id} value={state.id}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Zip Code */}
            <div className="flex flex-col space-y-1 md:col-span-2 lg:col-span-1">
              <Label className="font-poppins font-[400] text-xs">
                Zip Code
              </Label>
              <Input className="text-[#666666] text-xs" placeholder="40134" />
            </div>
          </div>
          {/* Email Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <Label className="font-poppins font-[400] text-xs">Email</Label>
              <Input className="text-[#666666] text-xs" placeholder="Dianne" />
            </div>
            <div className="flex flex-col space-y-1">
              <Label className="font-poppins font-[400] text-xs">Phone</Label>
              <Input className="text-[#666666] text-xs" placeholder="Russell" />
            </div>
          </div>
          <Button
            type="submit"
            className="bg-[#00B207] text-[#FFFFFF] text-xs rounded-full w-2/3 place-self-center font-semibol max-w-[200px] md:place-self-start"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BillingAddress;
