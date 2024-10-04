import Image, { StaticImageData } from "next/image";
import { formatRupiah } from "@/lib/utils";

interface OrderCardProps {
  imageSrc: string | StaticImageData;
  title: string;
  quantity: string;
}

const OrderCard: React.FC<OrderCardProps> = ({ imageSrc, title, quantity }) => {
  return (
    <div className="flex flex-row space-x-2 items-center justify-between">
      <Image
        src={imageSrc}
        alt="thumbnail"
        width={0}
        height={0}
        sizes="100vw"
        className="w-1/4 max-w-[100px] object-cover object-center aspect-square"
      />
      <div className="flex flex-1 justify-between flex-row space-x-2 items-center">
        <p>{title}</p>
        <p>Min Invets {formatRupiah(parseInt(quantity))}</p>
      </div>
    </div>
  );
};

export default OrderCard;
