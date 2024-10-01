import React from "react";
import Image, { StaticImageData } from "next/image";
import { RxArrowTopRight } from "react-icons/rx";
import { MdFileUpload } from "react-icons/md";

interface PerusahaanCardProps {
  imageUrl: string | StaticImageData;
  namaPerusahaan: string;
  namaPemilik: string;
  topic: string;
  tanggal: string;
}

const PerusahaanCard: React.FC<PerusahaanCardProps> = ({
  imageUrl,
  namaPerusahaan,
  namaPemilik,
  topic,
  tanggal,
}) => {
  return (
    <div className="max-w-[600px] w-full shadow-custom-inset rounded-lg flex flex-row space-x-4 px-5 py-4">
      <Image
        src={imageUrl}
        alt="thumbnail"
        width={50}
        height={50}
        sizes="100vw"
        className="object-cover rounded-lg object-center aspect-square w-1/3"
      />
      <div className="md:text-xs flex flex-col flex-1 space-y-3 text-[8px] relative">
        <div className="absolute hover:cursor-pointer flex justify-center items-center bg-light-linear-yellow aspect-square w-[25px] rounded-full top-0 right-0">
          <RxArrowTopRight className="w-1/2 h-auto text-black" />
        </div>
        <h1 className="md:text-xl">{namaPerusahaan}</h1>
        <p>{namaPemilik}</p>
        <p className="text-wrap">{topic}</p>
        <p>{tanggal}</p>
        <div className="md:text-sm flex flex-row w-full justify-between text-[6px] space-x-2">
          <button className="flex flex-row items-center space-x-1 bg-orange-linear rounded-full hover:cursor-pointer">
            <div className="aspect-square h-full bg-white rounded-full flex justify-center items-center">
              <MdFileUpload className="text-black w-full" />
            </div>
            <p className="text-nowrap pr-2 md:pr-4 md:py-2"> Upload Materi</p>
          </button>
          <button className="px-2 py-1 bg-green-gradient rounded-full hover:cursor-pointer">
            Upload Link Zoom
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerusahaanCard;
