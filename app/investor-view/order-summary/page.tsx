"use client";

import { Suspense, useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { formatRupiah } from "@/lib/utils";
import FileUpload from "@/components/file-upload";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const OrderSummaryContent = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [file, setFile] = useState<string | File>("");
  const [reward, setReward] = useState<
    | {
        id: string;
        image: string;
        name: string;
        amount: bigint;
        description: string;
        created_at: Date;
        crowdfunding_id: string;
        jenis_item: string;
      }
    | undefined
  >();
  const params = useSearchParams();

  const router = useRouter();

  const amount = params.get("a");
  const idCfd = params.get("id");
  const idRew = params.get("idr");

  // const amount = "10";
  // const idCfd = "adae";
  // const idRew = "ad";

  useEffect(() => {
    const get = async () => {
      try {
        const dataFetch = await axios.get(`/api/reward/${idRew}`);
        // console.log(dataFetch);
        setReward(dataFetch.data.data);
        console.log(reward);
      } catch (error) {
        console.log(error);
        return router.push(`/investor-view/detail/${idCfd}`);
        // return null;
      }
    };

    get();
  }, [idRew]);

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPaymentMethod(event.target.value);
  };

  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const onSubmit = async () => {
    console.log({
      amount,
      proof: file,
      idReward: idRew,
    });
    try {
      await axios.post(`/api/investor-view/${idCfd}/invest`, {
        amount,
        proof: file,
        idReward: idRew,
      });

      toast({
        variant: "default",
        title: "Success to invest",
      });
      setOpen(false);
      router.push("/investor-view");
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Fail to submit",
      });
      router.push(`/investor-view/detail/${idCfd}`);

      // return null;
    }
  };

  // console.log(reward);
  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <div className="bg-conic-blue min-h-screen w-full flex items-center justify-center font-lexend text-black ">
      <div className="bg-white rounded-lg flex flex-col w-[90%] py-8 px-4 space-y-4 max-w-[500px]">
        <h1 className="font-semibold">Reward Summary</h1>
        <div className="flex pb-4 flex-col justify-center border-b-2 border-b-[#E6E6E6] w-full space-y-2 text-xs">
          {reward && (
            <OrderCard
              imageSrc={reward.image}
              title={reward.name}
              quantity={`${reward.amount}`}
            />
          )}
        </div>
        <div className="w-full text-sm flex justify-between pb-4 border-b-2 border-b-[#E6E6E6]">
          <p>Total Investment : </p>
          <p className="font-bold">{formatRupiah(parseInt(amount!))}</p>
        </div>
        <h1 className="font-semibold">
          Payment Method <span className="text-red-700">*</span>
        </h1>
        <div className="flex flex-col space-y-2">
          <label className="text-xs flex flex-row space-x-3 items-center cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              id="bankTransfer"
              value="bankTransfer"
              checked={paymentMethod === "bankTransfer"}
              onChange={handlePaymentMethodChange}
              className="text-green-[#00B307] border-[#00B307]"
            />
            <span>Transfer Bank</span>
          </label>
          <label className="text-xs flex flex-row space-x-3 items-center cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              id="paypal"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={handlePaymentMethodChange}
              className="text-green-[#00B307] border-[#00B307]"
            />
            <span>Paypal</span>
          </label>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            disabled={paymentMethod.length === 0}
            className={`h-9 px-4 py-2 text-white rounded-full bg-purple-gradient-radial shadow-custom-shadow-blue-button hover:cursor-pointer ${
              paymentMethod.length === 0 ? "hover:cursor-not-allowed" : ""
            }`}
          >
            Investasikan
          </DialogTrigger>
          {paymentMethod.length === 0 && (
            <span className="text-red-500">*) Choose payment first</span>
          )}
          <DialogContent className="flex font-lexend flex-col space-y-2 justify-start bg-white w-[90%] rounded-lg text-[#0010A4] py-12">
            <DialogTitle>
              Upload Bukti Pembayaran <span className="text-red-700">*</span>
            </DialogTitle>
            <DialogDescription className="flex flex-col space-y-12">
              <FileUpload file={file} setFile={setFile} />

              <Button
                onClick={onSubmit}
                className="text-white rounded-full bg-purple-gradient-radial shadow-custom-shadow-blue-button hover:cursor-pointer w-1/2 place-self-center"
              >
                Upload
              </Button>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </div>
    // </Suspense>
  );
};

const OrderSummaryPage = () => {
  return (
    <Suspense fallback={<div>Loading Order Summary...</div>}>
      <OrderSummaryContent />
    </Suspense>
  );
};

export default OrderSummaryPage;
