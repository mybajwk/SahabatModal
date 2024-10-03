/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { GetCountries, GetState } from "react-country-state-city";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { UserAccountW } from "../utils/Profile";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, { message: "This field has to be filled." }),
  company_name: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .optional(),
  address_line: z.string().min(1, { message: "This field has to be filled." }),
  country: z.string().min(1, { message: "This field has to be filled." }),
  state_province: z
    .string()
    .min(1, { message: "This field has to be filled." }),
  zip_code: z.string().min(1, { message: "This field has to be filled." }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  phone_number: z
    .string()
    .min(6, { message: "Phone number must at least 6 characters." }),
});

function BillingAddress({ data }: UserAccountW) {
  const [countryId, setCountryId] = useState<number | null>(null);
  const [stateId, setStateId] = useState<number | null>(null);

  const [countriesList, setCountriesList] = useState<any[]>([]);
  const [stateList, setStateList] = useState<any[]>([]);
  //   const [cityList, setCityList] = useState<any[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.UserBillingAddress?.name,
      company_name: data.UserBillingAddress?.company_name,
      address_line: data.UserBillingAddress?.address_line,
      country: data.UserBillingAddress?.country,
      state_province: data.UserBillingAddress?.state_province,
      zip_code: data.UserBillingAddress?.zip_code,
      email: data.UserBillingAddress?.email,
      phone_number: data.UserBillingAddress?.phone_number,
    },
  });

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post("/api/profile/billing", values);
      console.log("response regis user", response);
      console.log(values);
      router.refresh();
      router.push("/profile");
    } catch (error) {
      console.error("Registration error:", error);
      toast({ variant: "destructive", title: "Fail to register" });
    }
  }
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col p-4 space-y-4">
              {/* First Name, Last Name, Company Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex flex-col space-y-1">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-poppins font-[400] text-xs">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-[#666666] text-xs"
                            placeholder="Dianne"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1 md:col-span-2 lg:col-span-1">
                  <FormField
                    control={form.control}
                    name="company_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-poppins font-[400] text-xs">
                          Company Name
                          <span className="text-[#808080]"> (optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-[#666666] text-xs"
                            placeholder="Zakirsoft"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Street Address */}
              <div className="flex flex-col space-y-1 mt-1">
                <FormField
                  control={form.control}
                  name="address_line"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-poppins font-[400] text-xs">
                        Street Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-[#666666] text-xs"
                          placeholder="Suite 902 581 Danika Via, South Lenardfurt, WV 54257-4233"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Country, State, Zip Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Country */}
                <div className="flex flex-col space-y-1">
                  <FormField
                    control={form.control}
                    name="country"
                    render={() => (
                      <FormItem>
                        <FormLabel className="font-poppins font-[400] text-xs">
                          Country / Region
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              const country = countriesList.find(
                                (item) => item.id === Number(value)
                              );
                              if (country) {
                                setCountryId(country.id);
                                setStateList([]);
                                form.setValue("country", country.name);
                                form.setValue("state_province", "");
                              } else {
                                console.error(
                                  `Country with id ${value} not found.`
                                );
                              }
                            }}
                            value={countryId !== null ? String(countryId) : ""}
                          >
                            <SelectTrigger className="text-[#666666] text-xs">
                              <SelectValue placeholder="Select Country" />
                            </SelectTrigger>
                            <SelectContent className="text-[#666666] text-xs">
                              {countriesList.map((country) => (
                                <SelectItem
                                  key={country.id}
                                  value={String(country.id)}
                                >
                                  {country.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* States */}
                <div className="flex flex-col space-y-1">
                  <FormField
                    control={form.control}
                    name="state_province"
                    render={() => (
                      <FormItem>
                        <FormLabel className="font-poppins font-[400] text-xs">
                          State
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              const state = stateList.find(
                                (item) => item.id === Number(value)
                              );
                              if (state) {
                                setStateId(state.id);
                                form.setValue("state_province", state.name);
                              } else {
                                console.error(
                                  `State with id ${value} not found.`
                                );
                              }
                            }}
                            disabled={stateList.length === 0}
                            value={stateId !== null ? String(stateId) : ""}
                          >
                            <SelectTrigger className="text-[#666666] text-xs">
                              <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                            <SelectContent className="text-[#666666] text-xs">
                              {stateList.map((state) => (
                                <SelectItem
                                  key={state.id}
                                  value={String(state.id)}
                                >
                                  {state.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Zip Code */}
                <div className="flex flex-col space-y-1 md:col-span-2 lg:col-span-1">
                  <FormField
                    control={form.control}
                    name="zip_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-poppins font-[400] text-xs">
                          Zip Code
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-[#666666] text-xs"
                            placeholder="40134"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* Email Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-poppins font-[400] text-xs">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-[#666666] text-xs"
                            placeholder="dianne.russell@gmail.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-poppins font-[400] text-xs">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-[#666666] text-xs"
                            placeholder="(603) 555-0123"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="bg-[#18D3A7] text-[#FFFFFF] text-xs rounded-full w-2/3 place-self-center font-semibol max-w-[200px] md:place-self-start"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default BillingAddress;
