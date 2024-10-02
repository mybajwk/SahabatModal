"use client";
import React, { Dispatch, SetStateAction, useEffect,useState} from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { Button } from "../../components/ui/button";
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '../../components/ui/calendar';
import { TimePicker } from '../../components/time-picker/time-picker';
import { useRouter } from "next/navigation";
// import { useNavigate } from 'react-router-dom';

interface PengajuanMentoring {
  setCurrentPage: Dispatch<SetStateAction<string>>;
}


export const FormPengajuanMentoring= z.object({
  topik: z.string().min(1, "Topik mentoring wajib diisi"),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
  dateTime: z.date(),
});

const PengajuanFunding: React.FC<PengajuanMentoring> = ({}) => {
  const form = useForm<z.infer<typeof FormPengajuanMentoring>>({
    resolver: zodResolver(FormPengajuanMentoring),
    defaultValues: {
      topik: "",
      deskripsi: "",
    },
  });
  const [progress, setProgress] = useState(0);

  const onSubmit = async (data: z.infer<typeof FormPengajuanMentoring>) => {
    setLoading(true);

    try {
      const response = await fetch("/pengajuan-mentoring", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit mentoring request");
      }

    //   // Redirect to dashboardpengusaha after successful submission
      router.push("/dashboardpengusaha");
    } catch (error) {
      console.error("Error submitting mentoring request:", error);
    } finally {
      setLoading(false);
    }
    console.log(data);
  };
  const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     const calculateProgress = () => {
//       let filledFields = 0;
//       const totalFields = 3; 
//       if (form.watch("topik")) filledFields += 1;
//       if (form.watch("deskripsi")) filledFields += 1;
//       if (form.watch("dateTime")) filledFields += 1;

//       setProgress((filledFields / totalFields) * 100);
//     };

//     calculateProgress();
//   }, [form.watch("topik"), form.watch("deskripsi"), form.watch("dateTime")]);

  const router = useRouter();

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
              borderRadius: '20px',
              background: 'conic-gradient(from 140deg at 50% 20.76%, #00326C 44.65deg, #0061D2 360deg)',
            }}
          >
           <button
              type="button" 
              onClick={() => router.push('/dashboard-pengusaha')}
              className="absolute top-2 left-2 p-3 rounded-[35px] bg-gradient-to-b from-[#F49916] to-[#EFC78D]"
            >
              <img src="/icons/icon-arrow-right.svg" alt="Arrow Icon" className="w-7 h-7" />
            </button>
            <h1 className="text-[32px] font-bricolage font-bold text-white z-2">Empower Your Business</h1>
            <div
              className="absolute z-0"
              style={{
                top: '125px', 
                left: '77px',
                borderTopLeftRadius: '54.888px', 
                borderBottomLeftRadius: '54.888px', 
                background: 'rgba(255, 255, 255, 0.01)',
                boxShadow: `
                  0px 2.676px 3.842px -2.47px rgba(4, 199, 130, 0.30) inset, 
                  0px 0.48px 0.755px -0.274px #FFF inset, 
                  0px -5.626px 4.665px -4.391px rgba(96, 68, 144, 0.30) inset, 
                  0px 6.724px 6.861px -3.293px rgba(202, 172, 255, 0.30) inset, 
                  0px 0.274px 1.235px 2.058px rgba(154, 146, 210, 0.25) inset, 
                  0px 0.069px 2.744px 0px rgba(227, 222, 255, 0.20) inset`,
                backdropFilter: 'blur(5.838px)',
                width: '140px',
                height: '45px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
            <div
              className="absolute z-0"
              style={{
                bottom: '125px', 
                left: '0px', 
                borderTopRightRadius: '54.888px', 
                borderBottomRightRadius: '54.888px',
                background: 'rgba(255, 255, 255, 0.01)',
                boxShadow: `
                  0px 2.676px 3.842px -2.47px rgba(4, 199, 130, 0.30) inset, 
                  0px 0.48px 0.755px -0.274px #FFF inset, 
                  0px -5.626px 4.665px -4.391px rgba(96, 68, 144, 0.30) inset, 
                  0px 6.724px 6.861px -3.293px rgba(202, 172, 255, 0.30) inset, 
                  0px 0.274px 1.235px 2.058px rgba(154, 146, 210, 0.25) inset, 
                  0px 0.069px 2.744px 0px rgba(227, 222, 255, 0.20) inset`,
                backdropFilter: 'blur(5.838px)',
                width: '140px',
                height: '45px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </div>
            
          {/* Form Section */}
          <div className="flex-1 flex flex-col gap-5 justify-center items-center">
            {/* Progress Bar */}
            {/* <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: '#00326C' }} />
            </div>
            <div className="text-sm font-medium text-gray-700 mt-2">
                {progress <= 33 && <p>Step 1: Input Mentoring Topic</p>}
                {progress > 33 && progress <= 66 && <p>Step 2: Input Description</p>}
                {progress > 66 && <p>Step 3: Select Date and Time</p>}
            </div> */}
            <div className="flex flex-row w-full">
              <div className="flex-1 flex flex-col gap-5 p-8">
                <FormField
                  control={form.control}
                  name="topik"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-lexend text-base text-[#0010A4]">
                        Topik Mentoring <span className="text-[#DC2522]">*</span>
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
                <FormField
                  control={form.control}
                  name="deskripsi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-lexend text-base text-[#0010A4]">
                        Deskripsi Detail Mentoring <span className="text-[#DC2522]">*</span>
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
                  <div className="flex justify-start">
                    <FormField
                      control={form.control}
                      name='dateTime'
                      render={({ field }) => (
                        <FormItem className='flex flex-col'>
                          <FormLabel className="font-lexend text-base text-[#0010A4]">
                            Pilih Tanggal dan Waktu{" "}
                            <span className="text-[#DC2522]">*</span>
                          </FormLabel>
                          {/* popover */}
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-[280px] justify-start text-left font-lexend font-normal border border-[#9EA2AD] rounded-md',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                             {field.value ? (
                                <span style={{ color: '#9EA2AD' }}>
                                {format(field.value, 'PPP HH:mm:ss')}
                                </span>
                            ) : (
                                <span className="text-[#9EA2AD]">Pick a date and time</span>
                            )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className='w-auto p-0'>
                              <Calendar
                                mode='single'
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() || date < new Date('1900-01-01')
                                }
                                initialFocus
                              />
                              <div className='p-3 border-t border-border'>
                                <TimePicker setDate={field.onChange} date={field.value} />
                              </div>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                        )}
                    />
                  </div>

              <div className="flex pb-10 justify-end items-center w-full">
                    <Button
                        type="submit"
                        className={`rounded-full px-6 sm:px-10 text-[20px] sm:text-[24px] py-4 sm:py-6 text-white font-lexend transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        style={{
                        borderRadius: "269.667px",
                        background: "radial-gradient(61.94% 48.96% at 49.96% 96.22%, #3B47BC 0%, #374583 100%)",
                        boxShadow: `
                          0px 0px 0px 11.865px rgba(255, 255, 255, 0.07), 
                          0px -1.079px 0px 2.697px rgba(0, 0, 0, 0.20) inset, 
                          0px 1.079px 0px 2.697px rgba(255, 255, 255, 0.40) inset
                        `,
                      }}
                      disabled={loading} 
                    >
                    {loading ? "Loading..." : "Book Sesi"}
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