"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Button } from "../../components/ui/button";
import { cn } from "@/lib/utils";
import { format, setHours, setMinutes } from "date-fns";
import { Calendar } from "../../components/ui/calendar";
import { TimePicker } from "../../components/time-picker/time-picker";
import { useRouter } from "next/navigation";
import arrow from "../../public/icons/icon-arrow-right.svg";
import Image from "next/image";
import { FormPengajuanMentoring } from "./formSchema"; // Make sure this schema matches the interface
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import Loading from "@/components/ui/loading";

// Define the interface
export interface CreateMentoringRequest {
  title: string;
  description: string;
  requestDate: Date;
}

const PengajuanFunding: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session, status } = useSession();

  const form = useForm<CreateMentoringRequest>({
    resolver: zodResolver(FormPengajuanMentoring),
    defaultValues: {
      title: "",
      description: "",
      requestDate: new Date(),
    },
  });

  if (status === "loading") {
    return <Loading />;
  }

  if (session?.user.role !== 3) {
    router.push("/");
  }

  const onSubmit = async (values: CreateMentoringRequest) => {
    try {
      const response = await axios.post("/api/mentoring", values);

      const data = response.data;

      toast({
        variant: "default",
        title: data.message,
      });

      router.push("/dashboard-seeker/description");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error when requesting mentoring",
        description: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex justify-center items-center bg-white"
      >
        <section className="flex w-full justify-between mx-[120px]">
          {/* Left banner */}
          <div
            className="relative flex-[0.2] h-auto flex flex-col justify-center items-center p-7 my-10 mx-[0px]"
            style={{
              borderRadius: "20px",
              background:
                "conic-gradient(from 140deg at 50% 20.76%, #00326C 44.65deg, #0061D2 360deg)",
            }}
          >
            <button
              type="button"
              onClick={() => router.push("/dashboard-seeker/list-investor")}
              className="absolute top-2 left-2 p-3 rounded-[35px] bg-gradient-to-b from-[#F49916] to-[#EFC78D]"
            >
              <Image
                src={arrow}
                alt="arrow"
                width={0}
                height={0}
                sizes="100vw"
                className="w-7 h-7"
              />
            </button>
            <h1 className="text-[32px] font-bricolage font-bold text-white z-2">
              Empower Your Business
            </h1>
            {/* Other decorative elements */}
          </div>

          <div className="flex-1 flex flex-col gap-5 justify-center items-center">
            <div className="flex flex-row w-full">
              <div className="flex-1 flex flex-col gap-5 p-8">
                {/* Title Field */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-lexend text-base text-[#0010A4]">
                        Topik Mentoring
                        <span className="text-[#DC2522]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-[#9EA2AD] border-[#9EA2AD] text-base font-lexend"
                          placeholder="Topik Mentoring yang akan dibahas"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Description Field */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-lexend text-base text-[#0010A4]">
                        Deskripsi Detail Mentoring
                        <span className="text-[#DC2522]">*</span>
                      </FormLabel>
                      <FormControl>
                        <textarea
                          className="text-[#9EA2AD] border-[#9EA2AD] border text-base font-lexend w-full h-44 p-4 rounded-md resize-none focus:outline-none focus:border-[#0010A4]"
                          placeholder="Deskripsi"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Date and Time Picker */}
                <div className="flex justify-start">
                  <FormField
                    control={form.control}
                    name="requestDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="font-lexend text-base text-[#0010A4]">
                          Pilih Tanggal dan Waktu
                          <span className="text-[#DC2522]">*</span>
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[280px] justify-start text-left font-lexend font-normal border border-[#9EA2AD] rounded-md",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                <span style={{ color: "#9EA2AD" }}>
                                  {format(field.value, "PPP HH:mm:ss")}
                                </span>
                              ) : (
                                <span className="text-[#9EA2AD]">
                                  Pilih tanggal dan waktu
                                </span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                if (date) {
                                  const updatedDate = setHours(
                                    setMinutes(date, field.value.getMinutes()),
                                    field.value.getHours(),
                                  );
                                  field.onChange(updatedDate);
                                }
                              }}
                              initialFocus
                            />
                            <div className="p-3 border-t border-border">
                              <TimePicker
                                setDate={(time) => {
                                  if (time) {
                                    const updatedTime = setHours(
                                      setMinutes(
                                        field.value,
                                        time.getMinutes(),
                                      ),
                                      time.getHours(),
                                    );
                                    field.onChange(updatedTime);
                                  }
                                }}
                                date={field.value}
                              />
                            </div>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Submit Button */}
                <div className="flex pb-10 justify-end items-center w-full">
                  <Button
                    type="submit"
                    className={`rounded-full px-6 sm:px-10 text-[20px] sm:text-[24px] py-4 sm:py-6 text-white font-lexend transition duration-200`}
                    style={{
                      borderRadius: "269.667px",
                      background:
                        "radial-gradient(61.94% 48.96% at 49.96% 96.22%, #3B47BC 0%, #374583 100%)",
                      boxShadow: `
                          0px 0px 0px 11.865px rgba(255, 255, 255, 0.07), 
                          0px -1.079px 0px 2.697px rgba(0, 0, 0, 0.20) inset, 
                          0px 1.079px 0px 2.697px rgba(255, 255, 255, 0.40) inset
                        `,
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </Form>
  );
};

export default PengajuanFunding;
