import Image from "next/image";
import DashboardInvestorNavbar from "./dashboard-seeker-nav";

const DashboardInvestorLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="relative bg-conic-blue w-full min-h-screen">
      <div className="absolute -top-2 z-[1] right-0 md:size-[300px] size-[200px]">
        <Image
          src="/img/Subtract_dash.png"
          alt="image bg"
          fill
          className="object-contain"
        />
      </div>
      <div className="absolute z-[1] top-0 w-full flex justify-center items-center">
        <Image
          src="/img/Subtract_dash_2.png"
          alt="image bg"
          width={400}
          height={60}
          className="object-contain"
        />
      </div>

      <div className="absolute z-[1] -left-3 top-12 md:w-[250px] md:h-[500px] w-[100px] h-[200px]">
        <Image
          src="/img/Subtract_dash_3.png"
          alt="image bg"
          fill
          className="object-contain"
        />
      </div>
      <div className="md:px-40 md:py-10 z-[10] relative px-10 py-8">
        <h1
          className="w-full mb-5 text-white text-center font-lexend text-[42px] md:text-[48px] font-semibold"
          style={{
            textShadow:
              "0px 0px 28.792px rgba(255, 255, 255, 0.40), 0px 0px 14.396px rgba(255, 255, 255, 0.80)",
          }}
        >
          Pendanaan
        </h1>
        <section className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
          <figure className="w-full md:flex-[0.8] relative">
            {".mp4".endsWith(".mp4") ? (
              <video
                className="w-full"
                controls
                preload="none"
                aria-label="Video player funding"
              >
                <source src="@/app/assets/video.mp4" type="video/mp4" />
              </video>
            ) : (
              <Image className="object-cover" fill alt="image funding" src="" />
            )}
          </figure>
          <div className="flex flex-col gap-4 md:flex-1">
            <div className="bg-white w-full h-[4px] overflow-hidden rounded-full">
              <div
                className="bg-[#18D3A7] h-full"
                style={{
                  width: "60%",
                }}
              />
            </div>

            <div className="flex flex-col">
              <h1 className="text-[#18D3A7] text-left text-[28px] md:text-[32px] font-semibold font-lexend">
                Rp20.000.000
              </h1>
              <h2 className="text-white text-[20px] md:text-[24px] font-lexend font-light">
                dana yang terkumpul dari Rp100.000.000
              </h2>
            </div>

            <div className="flex flex-col font-lexend text-white">
              <h3 className="text-[28px] md:text-[32px] font-semibold">10</h3>
              <p className="text-[20px] md:text-[24px] font-light">Investor</p>
            </div>

            <div className="flex flex-col font-lexend text-white">
              <h3 className="text-[28px] md:text-[32px] font-semibold">12</h3>
              <p className="text-[20px] md:text-[24px] font-light">
                Hari tersisa
              </p>
            </div>
          </div>
        </section>
      </div>

      <DashboardInvestorNavbar />
      {children}
    </div>
  );
};

export default DashboardInvestorLayout;
