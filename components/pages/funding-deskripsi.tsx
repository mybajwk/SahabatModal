import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextEditor from "../text-editor";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

export const FundingDescSchema = z.object({
  deskripsi: z.string(),
  faq: z.array(
    z.object({
      question: z.string().min(1, "Pertanyaan wajib diisi"),
      answer: z.string().min(1, "Jawaban wajib diisi"),
    })
  ),
});
const FundingDescPage = () => {
  const form = useForm<z.infer<typeof FundingDescSchema>>({
    resolver: zodResolver(FundingDescSchema),
    defaultValues: {
      deskripsi: "",
      faq: [],
    },
  });

  const onSubmit = (data: z.infer<typeof FundingDescSchema>) => {
    console.log(data);
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "faq",
  });

  const addFAQ = () => {
    const newFAQ = {
      question: "",
      answer: "",
    };

    append(newFAQ);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex justify-center items-center"
      >
        <section className="bg-white w-[70%] z-[5] rounded-lg flex flex-col gap-5 p-10 justify-center items-center">
          <FormField
            control={form.control}
            name="deskripsi"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-lexend text-base text-[#0010A4]">
                  Deskripsi{" "}
                </FormLabel>
                <FormControl>
                  {/* <Textarea
                    className="text-[#9EA2AD] border-[#9EA2AD] text-base font-lexend"
                    placeholder="Judul Pendanaan"
                    {...field}
                  /> */}
                  <TextEditor
                    setValue={field.onChange}
                    value={field.value}
                    disabled={field.disabled}
                    placeholder="deskripsi pendanaan"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator className="h-[1.5px] bg-[#DDD]" />
          <div className="flex flex-row gap-10 py-10 w-full">
            <div className="flex flex-col flex-[0.3] py-5 text-black gap-4 font-lexend">
              <h1 className="text-[28px] font-semibold">
                Frequently Asked Questions
              </h1>
              <p className="text-base font-[300]">
                Tambahkan pertanyaan dasar yang sering ditanya- kan investor.
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-4">
              {fields.map((f, i) => (
                <div
                  key={f.id}
                  className="border-[1.5px] flex-1 flex flex-col gap-3 border-[#C9C9C9] rounded-sm p-12"
                >
                  <FormField
                    control={form.control}
                    name={`faq.${i}.question`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-lexend text-base text-[#0010A4]">
                          Pertanyaan <span className="text-[#DC2522]">*</span>
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
                    name={`faq.${i}.answer`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-lexend text-base text-[#0010A4]">
                          Jawaban <span className="text-[#DC2522]">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            className="text-[#9EA2AD] border-[#9EA2AD] text-base font-lexend"
                            placeholder="Judul Pendanaan"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex w-full items-center flex-row justify-end">
                    <Button
                      type="button"
                      onClick={() => remove(i)}
                      className="flex bg-transparent border border-[#DC2522] hover:bg-[#DC2522]/10 py-1 px-3 rounded-md flex-row justify-center items-center gap-2"
                    >
                      <p className="font-lexend text-base text-[#DC2522]">
                        Delete
                      </p>
                      <Trash className="text-[#DC2522]" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                onClick={addFAQ}
                className="font-lexend text-[24px] px-12 hover:bg-black/70 py-5 text-white bg-black flex flex-row items-center justify-center gap-3"
              >
                Add Another FAQ
              </Button>
            </div>
          </div>
          <Separator className="h-[1.5px] bg-[#DDD]" />
          <div className="w-full flex justify-center items-center">
            <Button className="font-lexend text-[24px] px-12 hover:bg-black/70 py-5 text-white bg-black flex flex-row items-center justify-center gap-3">
              Save
            </Button>
          </div>
        </section>
      </form>
    </Form>
  );
};

export default FundingDescPage;
