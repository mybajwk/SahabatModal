import { formatRupiah } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";

interface RewardCardSeekerProps {
  imageSrc: StaticImageData | string;
  title: string;
  min_amount: number;
}

const RewardCardSeeker: React.FC<RewardCardSeekerProps> = ({
  title,
  imageSrc,
  min_amount,
}) => {
  return (
    <div className="flex hover:cursor-pointer flex-row space-x-7 sm:max-w-[900px] items-center shadow-custom-inset p-3 rounded-md">
      <Image
        src={imageSrc}
        alt="thumbnail"
        width={0}
        height={0}
        sizes="100vw"
        className="rounded-full w-1/4 max-w-[100px] object-cover object-center aspect-square"
      />
      <div className="flex flex-col font-poppins items-start space-y-1">
        <h2 className="sm:text-lg">{title}</h2>
        <p className="text-[12px] sm:text-sm font-extralight">
          &gt; {formatRupiah(min_amount)}
        </p>
      </div>
    </div>
  );
};

export default RewardCardSeeker;
