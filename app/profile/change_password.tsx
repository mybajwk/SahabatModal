"use client";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";

const formSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "This field has to be filled." }),
    newPassword: z.string().min(1, { message: "This field has to be filled." }),
    confirmPassword: z
      .string()
      .min(1, { message: "This field has to be filled." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

function ChangePassword() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field: string) => {
    setShowPassword((prev: any) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="bg-[#FAFAFA] font-poppins flex flex-col border border-[#E6E6E6] rounded-md">
      <div className="w-full text-[#1A1A1A]">
        <h2 className="text-center text-sm font-semibold border-b border-[#E6E6E6] px-3 py-4 md:text-start">
          Change Password
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col p-4 space-y-4">
              <div className="flex flex-col space-y-1">
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-poppins font-[400] text-xs">
                        Current Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="text-[#666666] text-xs pr-10"
                            placeholder="Enter your current password"
                            {...field}
                            type={
                              showPassword.currentPassword ? "text" : "password"
                            }
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                            onClick={() =>
                              togglePasswordVisibility("currentPassword")
                            }
                          >
                            {showPassword.currentPassword ? (
                              <IoEyeOffOutline />
                            ) : (
                              <MdOutlineRemoveRedEye />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-poppins font-[400] text-xs">
                          New Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              className="text-[#666666] text-xs pr-10"
                              placeholder="Enter your new password"
                              {...field}
                              type={
                                showPassword.newPassword ? "text" : "password"
                              }
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                              onClick={() =>
                                togglePasswordVisibility("newPassword")
                              }
                            >
                              {showPassword.newPassword ? (
                                <IoEyeOffOutline />
                              ) : (
                                <MdOutlineRemoveRedEye />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-poppins font-[400] text-xs">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              className="text-[#666666] text-xs pr-10"
                              placeholder="Confirm your new password"
                              {...field}
                              type={
                                showPassword.confirmPassword
                                  ? "text"
                                  : "password"
                              }
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                              onClick={() =>
                                togglePasswordVisibility("confirmPassword")
                              }
                            >
                              {showPassword.confirmPassword ? (
                                <IoEyeOffOutline />
                              ) : (
                                <MdOutlineRemoveRedEye />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="bg-[#00B207] text-[#FFFFFF] text-xs rounded-full w-2/3 place-self-center font-semibold max-w-[200px] md:place-self-start"
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

export default ChangePassword;
