"use client";

import React, { useRef, useState } from "react";
import pp from "../assets/mawar.jpeg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
import { UserAccountW } from "../utils/Profile";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(1, { message: "This field has to be filled." }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  phone_number: z
    .string()
    .min(6, { message: "Phone number must at least 6 characters." }),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size < 2 * 1024 * 1024, {
      message: "File size must be less than 2MB",
    }),
});

function AccountSettings({ data }: UserAccountW) {
  const [image, setImage] = useState<null | File>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();
  const router = useRouter();

  const handleChooseClick = () => {
    fileInputRef?.current?.click();
  };

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files != null) {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
        form.setValue("image", file);
      }
    }
  };

  const imageUrl = image ? URL.createObjectURL(image) : pp;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      email: data.email,
      phone_number: data.phone_number,
      image: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post("/api/profile", values);
      console.log("response regis user", response);
      console.log(values);
      router.refresh();
      router.push("/profile");
    } catch (error) {
      console.error("Registration error:", error);
      toast({ variant: "destructive", title: "Fail to save profile" });
    }
  }

  return (
    <div className="bg-[#FAFAFA] font-poppins flex flex-col border border-[#E6E6E6] rounded-md">
      <div className="w-full text-center">
        <h2 className="text-[#1A1A1A] text-sm font-semibold border-b border-[#E6E6E6] px-3 py-4 md:text-start">
          Account Settings
        </h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="flex flex-col items-center space-y-3 p-2 md:w-1/2 md:p-8">
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                        ref={fileInputRef}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Image
                src={imageUrl}
                alt="thumbnail"
                width={0}
                height={0}
                sizes="100vw"
                className="rounded-full object-cover object-center aspect-square"
                style={{ width: "200px", height: "auto" }}
              />
              <Button
                onClick={handleChooseClick}
                className="rounded-full text-[#18D3A7] bg-white text-xs border-[#18D3A7] border-2"
              >
                Choose Image
              </Button>
            </div>

            <div className="flex flex-col space-y-4 text-[#1A1A1A] w-full px-4 py-4">
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
              <Button
                type="submit"
                className="bg-[#18D3A7] text-[#FFFFFF] text-xs rounded-full w-2/3 place-self-center font-semibold max-w-[200px] md:place-self-start"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default AccountSettings;
