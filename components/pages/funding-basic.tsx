import React, { Dispatch, SetStateAction } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import FileUpload from "../file-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "../date-picker";
import { Button } from "../ui/button";

interface FundingBasicPageProps {
  setCurrentPage: Dispatch<SetStateAction<string>>;
  
}

const allowedFileType = ["image/jpg", "image/png", "image/jpeg", "video/mp4"];

export const FormFundingBasicSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  address: z.string().min(1, "Alamat wajib diisi"),
  gmaps: z.string().min(1, "Link GMaps wajib diisi"),
  image: z
    .union([
      z.string().or(z.literal("")),
      z
        .instanceof(File)
        // .refine((file) => {
        //   return file.size <= 5000000;
        // }, "Max image size is 5MB")
        .refine((file) => {
          return allowedFileType.includes(file.type);
        }, "Only .mp4, .jpg, .jpeg, and .png are supported"),
    ])
    .nullable(),
  fund: z.number().min(1, "Dana harus positif"),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
});

const FundingBasicPage: React.FC<FundingBasicPageProps> = ({
  setCurrentPage,
}) => {
  const form = useForm<z.infer<typeof FormFundingBasicSchema>>({
    resolver: zodResolver(FormFundingBasicSchema),
    defaultValues: {
      address: "",
      fund: 0,
      image: null,
      title: "",
      gmaps: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormFundingBasicSchema>) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex justify-center items-center"
      >
        <section className="bg-white w-[70%] z-[5] rounded-lg flex flex-col gap-5 px-10 justify-center items-center">
          <div className="flex flex-row gap-10 py-10 w-full">
            <div className="flex flex-col flex-[0.3] py-5 text-black gap-4 font-lexend">
              <h1 className="text-[28px] font-semibold">Nama Pendanaan</h1>
              <p className="text-base font-[300]">
                Tulis nama dengan jelas untuk membantu orang dengan cepat
                memahami usaha Anda. Keduanya akan muncul di halaman list
                pendanaan
              </p>
              <p className="text-base font-[300]">
                Calon Investor juga akan melihatnya jika Pendanaan Usaha Anda
                muncul di halaman list pendanaan.
              </p>
            </div>
            <div className="border-[1.5px] flex-1 border-[#C9C9C9] rounded-sm p-12">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-lexend text-base text-[#0010A4]">
                      Judul Pendanaan Usaha{" "}
                      <span className="text-[#DC2522]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-[#9EA2AD] border-[#9EA2AD] text-base font-lexend"
                        placeholder="Judul Pendanaan"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Separator className="h-[1.5px] bg-[#DDD]" />
          <div className="flex flex-row gap-10 py-10 w-full">
            <div className="flex flex-col flex-[0.3] py-5 text-black gap-4 font-lexend">
              <h1 className="text-[28px] font-semibold">Lokasi Usaha</h1>
              <p className="text-base font-[300]">
                Masukkan alamat lokasi usaha Anda dengan detail.
              </p>
            </div>
            <div className="border-[1.5px] flex-1 border-[#C9C9C9] flex flex-col gap-5 rounded-sm p-12">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-lexend text-base text-[#0010A4]">
                      Alamat Lengkap <span className="text-[#DC2522]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-[#9EA2AD] border-[#9EA2AD] text-base font-lexend"
                        placeholder="Judul Pendanaan"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gmaps"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-lexend text-base text-[#0010A4]">
                      Link GMaps <span className="text-[#DC2522]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-[#9EA2AD] border-[#9EA2AD] text-base font-lexend"
                        placeholder="Judul Pendanaan"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Separator className="h-[1.5px] bg-[#DDD]" />
          <div className="flex flex-row gap-10 py-10 w-full">
            <div className="flex flex-col flex-[0.3] py-5 text-black gap-4 font-lexend">
              <h1 className="text-[28px] font-semibold">
                Gambar atau Video Usaha
              </h1>
              <p className="text-base font-[300]">
                Masukkan Gambar atau Video menarik terkait pendanaan untuk usaha
                Anda.
              </p>
            </div>
            <div className="border-[1.5px] flex-1 border-[#C9C9C9] flex flex-col gap-5 rounded-sm p-12">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-lexend text-base text-[#0010A4]">
                      Upload <span className="text-[#DC2522]">*</span>
                    </FormLabel>
                    <FormControl>
                      <FileUpload setFile={field.onChange} file={field.value} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Separator className="h-[1.5px] bg-[#DDD]" />
          <div className="flex flex-row gap-10 py-10  w-full">
            <div className="flex flex-col flex-[0.3] py-5 text-black gap-4 font-lexend">
              <h1 className="text-[28px] font-semibold">Target Dana</h1>
              <p className="text-base font-[300]">
                Masukkan alamat lokasi usaha Anda dengan detail.
              </p>
            </div>
            <div className="border-[1.5px] flex-1 border-[#C9C9C9] rounded-sm p-12">
              <FormField
                control={form.control}
                name="fund"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-lexend text-base text-[#0010A4]">
                      Total Dana <span className="text-[#DC2522]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-[#9EA2AD] border-[#9EA2AD] text-base font-lexend"
                        placeholder="Judul Pendanaan"
                        type="number"
                        name={field.name}
                        disabled={field.disabled}
                        onBlur={field.onBlur}
                        value={field.value}
                        ref={field.ref}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Separator className="h-[1.5px] bg-[#DDD]" />c
          <div className="flex flex-row gap-10 py-10  w-full">
            <div className="flex flex-col flex-[0.3] py-5 text-black gap-4 font-lexend">
              <h1 className="text-[28px] font-semibold">Durasi Pendanaan</h1>
              <p className="text-base font-[300]">
                Tetapkan durasi pendanaan Anda, Anda tidak dapat mengubah durasi
                ketika sudah diterbitkan.
              </p>
            </div>
            <div className="border-[1.5px] flex-1 border-[#C9C9C9] rounded-sm space-y-3 p-12">
              <FormField
                control={form.control}
                name="fund"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-lexend text-base text-[#0010A4]">
                      Total Dana <span className="text-[#DC2522]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-[#9EA2AD] border-[#9EA2AD] text-base font-lexend"
                        placeholder="Judul Pendanaan"
                        type="number"
                        name={field.name}
                        disabled={field.disabled}
                        onBlur={field.onBlur}
                        value={field.value}
                        ref={field.ref}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-3 items-center">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-lexend text-base text-[#0010A4]">
                        Tanggal Mulai <span className="text-[#DC2522]">*</span>
                      </FormLabel>
                      <FormControl>
                        <DatePicker
                          date={field.value}
                          setDate={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-lexend text-base text-[#0010A4]">
                        Tanggal Selesai{" "}
                        <span className="text-[#DC2522]">*</span>
                      </FormLabel>
                      <FormControl>
                        <DatePicker
                          date={field.value}
                          setDate={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex pb-10 justify-center items-center w-full">
            <Button className="rounded-full px-20 text-[30px] py-8 text-white font-lexend bg-green-gradient shadow-custom-shadow-green-button">
              Submit
            </Button>
          </div>
        </section>
      </form>
    </Form>
  );
};

export default FundingBasicPage;
