import { useForm } from "react-hook-form";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import FileUpload from "./file-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";

interface FormFundingAddRewardProps {
  addReward: (r: z.infer<typeof FormFundingRewardSchema>) => void;
  setStatePage: Dispatch<SetStateAction<string>>;
}

const allowedFileType = ["image/jpg", "image/png", "image/jpeg"];

export const FormFundingRewardSchema = z.object({
  itemTitle: z.string().min(1, "Judul item wajib diisi"),
  itemType: z.string().min(1, "Jenis item wajib diisi"),
  fundLimit: z.number().min(1, "Batas pendanaan harus positif"),
  itemDesc: z.string(),
  itemImage: z
    .union([
      z.string().or(z.literal("")),
      z
        .instanceof(File)
        .refine((file) => {
          return file.size <= 5000000;
        }, "Max image size is 5MB")
        .refine((file) => {
          return allowedFileType.includes(file.type);
        }, "Only .jpg, .jpeg, and .png are supported"),
    ])
    .nullable(),
});

const FormFundingAddReward: React.FC<FormFundingAddRewardProps> = ({
  addReward,
  setStatePage,
}) => {
  const form = useForm<z.infer<typeof FormFundingRewardSchema>>({
    resolver: zodResolver(FormFundingRewardSchema),
    defaultValues: {
      itemTitle: "",
      itemDesc: "",
      itemImage: null,
      itemType: "",
      fundLimit: 0,
    },
  });

  const onSubmit = (data: z.infer<typeof FormFundingRewardSchema>) => {
    addReward(data);
    form.reset();
    setStatePage("list");
  };

  const onCancel = () => {
    setStatePage("list");
  };
  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="font-lexend text-black text-[28px] font-[500]">
        Tambahkan Item Baru
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="p-8 border-[1.5px] border-[#C9C9C9] rounded-md flex flex-col w-full gap-4">
            <FormField
              control={form.control}
              name={`itemTitle`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lexend text-base text-[#0010A4]">
                    Judul Item <span className="text-[#DC2522]">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-[#9EA2AD] border-[#9EA2AD] text-base font-lexend"
                      placeholder="Judul Item"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`itemType`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lexend text-base text-[#0010A4]">
                    Jenis Item <span className="text-[#DC2522]">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        classNameIcon="size-9 font-bold text-[#9EA2AD] opacity-100"
                        className="w-full font-lexend border-[#9EA2AD] px-5 text-base text-[#9EA2AD] bg-transparent"
                      >
                        <SelectValue placeholder="Jenis Item" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="font-lexend text-[#9EA2AD] text-base max-h-[400px]">
                      <SelectItem className="text-base" value="barang">
                        Barang
                      </SelectItem>
                      <SelectItem className="text-base" value="jasa">
                        Jasa
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`fundLimit`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lexend text-base text-[#0010A4]">
                    Minimal Pendanaan <span className="text-[#DC2522]">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-[#9EA2AD] border-[#9EA2AD] text-base font-lexend"
                      placeholder="Minimal Pendanaan"
                      type="number"
                      name={field.name}
                      disabled={field.disabled}
                      onBlur={field.onBlur}
                      value={field.value}
                      ref={field.ref}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value ?? "0"))
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`itemDesc`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lexend text-base text-[#0010A4]">
                    Deskripsi Item
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="text-[#9EA2AD] border-[#9EA2AD] text-base font-lexend"
                      placeholder="Deskripsi Item"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`itemImage`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lexend text-base text-[#0010A4]">
                    Upload Image Item <span className="text-[#DC2522]">*</span>
                  </FormLabel>
                  <FormControl>
                    <FileUpload setFile={field.onChange} file={field.value} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row py-10 gap-4 w-full items-center justify-center">
            <Button
              type="button"
              onClick={onCancel}
              className="font-lexend text-[24px] hover:bg-slate-300 py-5 bg-white text-black border border-black flex flex-row items-center justify-center gap-3"
            >
              Cancel
            </Button>
            <Button className="font-lexend text-[24px] hover:bg-black/70 py-5 text-white bg-black flex flex-row items-center justify-center gap-3">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormFundingAddReward;
