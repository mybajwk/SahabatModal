"use client";

import React, { useState } from "react";
import barista from "../../assets/barista.png";
import OrderCard from "./OrderCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const sampleData = [
  {
    imageSrc: barista,
    title: "Product A",
    quantity: "2",
  },
  {
    imageSrc: barista,
    title: "Product B",
    quantity: "3",
  },
  {
    imageSrc: barista,
    title: "Product C",
    quantity: "1",
  },
];

function OrderSummary() {
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div className="bg-conic-blue min-h-screen w-full flex items-center justify-center font-lexend text-black ">
      <div className="bg-white rounded-lg flex flex-col w-[90%] py-8 px-4 space-y-4 max-w-[500px]">
        <h1 className="font-semibold">Reward Summary</h1>
        <div className="flex pb-4 flex-col justify-center border-b-2 border-b-[#E6E6E6] w-full space-y-2 text-xs">
          {sampleData.map((item, index) => (
            <OrderCard
              key={index}
              imageSrc={item.imageSrc}
              title={item.title}
              quantity={item.quantity}
            />
          ))}
        </div>
        <div className="w-full text-sm flex justify-between pb-4 border-b-2 border-b-[#E6E6E6]">
          <p>Total Investment : </p>
          <p className="font-bold">Rp10.000.000</p>
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
        <Dialog>
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
              <div className="border border-black px-3 py-2 rounded-lg">
                Upload Field
              </div>

              <Button className="text-white rounded-full bg-purple-gradient-radial shadow-custom-shadow-blue-button hover:cursor-pointer w-1/2 place-self-center">
                Upload
              </Button>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default OrderSummary;
