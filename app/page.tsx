import Navbar from '../components/ui/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <section
        className="min-h-screen bg-cover bg-center text-white"
        style={{
          backgroundImage: "url('/BG.png')", // Ensure correct path for background image
          backgroundSize: 'contains', // Ensure full coverage of the background
          backgroundPosition: 'center', // Ensure the image is centered
          backgroundRepeat: 'no-repeat', // No repeating of the image
        }}
      >
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Text Content */}
            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight">
                Beri Solusi Melalui Parsial Investasi dan Inkubasi bagi UMKM dan Startup.
              </h1>
              <button className="mt-6 bg-gradient-to-r from-blue-400 to-purple-500 text-white px-8 py-3 rounded-full text-xl">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
