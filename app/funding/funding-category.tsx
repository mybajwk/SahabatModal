import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "../../components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../../components/ui/select";
import { z } from "zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

interface FundingCategoryPageProps {
  setCurrentPage: Dispatch<SetStateAction<string>>;
  setId: Dispatch<SetStateAction<string | undefined>>;
  setStatus: Dispatch<SetStateAction<number | undefined>>;
}

export const FormFundingCategorySchema = z.object({
  title: z.string(),
});

const FundingCategoryPage: React.FC<FundingCategoryPageProps> = ({
  setCurrentPage,
  setId,
  setStatus,
}) => {
  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof FormFundingCategorySchema>) => {
    console.log(data);
    try {
      const resp = await axios.post("/api/crowdfunding", { title: data.title });
      setId(resp.data.data.id);
      setStatus((prev) => {
        if (prev) {
          if (prev <= 0) {
            return 0;
          } else {
            return prev;
          }
        } else {
          return 0;
        }
      });

      toast({
        variant: "default",
        title: "Submit successfull",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Submit failed",
      });
    }
    setCurrentPage("tahapan");
  };

  const form = useForm<z.infer<typeof FormFundingCategorySchema>>({
    resolver: zodResolver(FormFundingCategorySchema),
    defaultValues: {
      title: "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="w-screen h-screen bg-white flex justify-center items-center flex-col gap-10">
          <h1 className="font-lexend text-black text-[48px] font-light text-center">
            Tentukan judul untuk Usaha/Ide Usaha <br /> yang akan didanai
          </h1>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-[600px] font-lexend border-[#9EA2AD] py-7 px-5 text-[24px] text-[#9EA2AD] bg-white"
                    {...field}
                  />
                </FormControl>
                {/* <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                > */}

                {/* <SelectTrigger className="w-[600px] font-lexend border-[#9EA2AD] py-7 px-5 text-[24px] text-[#9EA2AD] bg-white">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="font-lexend text-[#9EA2AD] text-[24px] max-h-[400px]">
                    <SelectItem className="text-[24px]" value="teknologi">
                      Teknologi
                    </SelectItem>
                    <SelectItem className="text-[24px]" value="FnB">
                      FnB
                    </SelectItem>
                    <SelectItem className="text-[24px]" value="Bisnis">
                      Bisnis
                    </SelectItem>
                  </SelectContent>
                </Select> */}
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-blue-gradient-radial hover:opacity-90 rounded-full font-lexend text-[24px] text-white font-medium w-[480px] py-7 shadow-custom-shadow-blue-button"
          >
            Continue
          </Button>
        </section>
      </form>
    </Form>
  );
};

export default FundingCategoryPage;
