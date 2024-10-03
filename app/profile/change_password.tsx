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
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

const formSchema = z
  .object({
    old_password: z
      .string()
      .min(1, { message: "This field has to be filled." }),
    new_password: z
      .string()
      .min(1, { message: "This field has to be filled." }),
    confirm_password: z
      .string()
      .min(1, { message: "This field has to be filled." }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords must match",
    path: ["confirm_password"],
  });

function ChangePassword() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const [showPassword, setShowPassword] = useState({
    old_password: false,
    new_password: false,
    confirm_password: false,
  });

  const togglePasswordVisibility = (field: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setShowPassword((prev: any) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post("/api/profile/password", values);
      console.log("response regis user", response);
      console.log(values);
      router.refresh();
      router.push("/profile");
    } catch (error) {
      console.error("Registration error:", error);
      toast({ variant: "destructive", title: "Fail to change password" });
    }
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
                  name="old_password"
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
                              showPassword.old_password ? "text" : "password"
                            }
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                            onClick={() =>
                              togglePasswordVisibility("old_password")
                            }
                          >
                            {showPassword.old_password ? (
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
                    name="new_password"
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
                                showPassword.new_password ? "text" : "password"
                              }
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                              onClick={() =>
                                togglePasswordVisibility("new_password")
                              }
                            >
                              {showPassword.new_password ? (
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
                    name="confirm_password"
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
                                showPassword.confirm_password
                                  ? "text"
                                  : "password"
                              }
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                              onClick={() =>
                                togglePasswordVisibility("confirm_password")
                              }
                            >
                              {showPassword.confirm_password ? (
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
                className="bg-[#18D3A7] text-[#FFFFFF] text-xs rounded-full w-2/3 place-self-center font-semibold max-w-[200px] md:place-self-start"
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
