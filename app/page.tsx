import Navbar from '../components/ui/Navbar';
import GetStartedButton from '../components/ui/get-started-button';
import StartButton from '../components/ui/start-button';
import StartButton2 from '../components/ui/start-button-2';
import InspiringSection from '../components/ui/inspiring-section';
import Footer from '../components/ui/footer';
import FAQSection from '@/components/ui/faq';


export default function Home() {
  return (
    <>
      <Navbar />
      <section
        className="min-h-screen bg-cover bg-center text-white"
        style={{
          backgroundImage: "url('/BG.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="container mx-auto px-4 py-20" style={{ paddingTop: '20rem', marginLeft: '7rem' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              {/* Apply Lexend font to this heading */}
              <h1 className="text-7xl font-bold leading-tight mb-6" style={{ fontFamily: 'Lexend, sans-serif' }}>
                Beri Solusi Melalui Parsial Investasi dan Inkubasi bagi UMKM dan Startup.
              </h1>
              <GetStartedButton />
            </div>
          </div>
        </div>
      </section>

      {/* Adjust the section to remove unnecessary padding/margins */}
      <section className="bg-white py-0">
        <div className="w-screen overflow-hidden">
          <img
            src="/iklan.png"
            alt="Iklan Promo"
            className="w-screen h-auto"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      </section>

      <section
        className="bg-blue-900 text-white py-20" // Remove extra padding
        style={{
          backgroundImage: "url('/cara_kerja.png')",
          backgroundSize: 'cover', // Change to 'contain' so the image fits within the section without cropping
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '70vh', // Adjust height to ensure the section has enough height without whitespace
        }}
      >
        <div className="container mx-auto text-center">
          {/* Title */}
          <h2
            className="text-7xl font-bold mt-3 mb-12 text-left -ml-20" // Align text to the left
            style={{
              fontFamily: 'Lexend, sans-serif',
              textShadow: '0 0 15px rgba(255, 255, 255, 0.8)', // Glow effect using text-shadow
            }}
          >
            Bagaimana Cara Kerjanya?
          </h2>

        </div>
      </section>
      <section
        className="min-h-screen bg-cover bg-center text-white"
        style={{
          backgroundImage: "url('/BG-2.png')", // Ensure correct path for background image
          backgroundSize: 'cover', // Cover the section, ensure the background stretches
          backgroundPosition: 'top', // Center the image
          backgroundRepeat: 'no-repeat', // Prevent background from repeating
          backgroundAttachment: 'scroll', // Background scrolls with the content
        }}
      >
        <div className="container mx-auto py-20">
          {/* Title with Glow Effect */}
          <h2
            className="text-7xl font-bold mt-60 -mb-10 -ml-20 text-left"
            style={{
              fontFamily: 'Lexend, sans-serif',
              textShadow: '0 0 15px rgba(255, 255, 255, 0.8)', // Glow effect
            }}
          >
            Apa Benefit Yang
          </h2>
        </div>
        <div className="container mx-auto py-20">

          <h2
            className="text-7xl font-bold -mt-20 -ml-20 text-left"
            style={{
              fontFamily: 'Lexend, sans-serif',
              textShadow: '0 0 15px rgba(255, 255, 255, 0.8)', // Glow effect
            }}
          >
            Didapat Oleh Seeker?
          </h2>
        </div>

        <StartButton />
        <div className="container mx-auto py-20">
        {/* Title with Glow Effect */}
        <h2
          className="text-7xl font-bold mt-92 -mb-10 -mr-40 text-right"
          style={{
            fontFamily: 'Lexend, sans-serif',
            textShadow: '0 0 15px rgba(255, 255, 255, 0.8)', // Glow effect
            marginTop: '23rem'
          }}
        >
          Apa Benefit Yang
        </h2>
      </div>
      <div className="container mx-auto py-20">

        <h2
          className="text-7xl font-bold -mt-20 -mb-10 -mr-40 text-right"
          style={{
            fontFamily: 'Lexend, sans-serif',
            textShadow: '0 0 15px rgba(255, 255, 255, 0.8)', // Glow effect
            
          }}
        >
          Didapat Oleh Investor?
        </h2>
      </div>
      <StartButton2 />
      </section>
      <section className="bg-white py-0">
        <div className="w-screen overflow-hidden">
          <img
            src="/forum.png"
            alt="Forum"
            className="w-screen h-auto"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      </section>
      {/* <section
        className="bg-blue-900 text-white py-20" // Remove extra padding
        style={{
          backgroundImage: "url('/faq.png')",
          backgroundSize: 'cover', // Change to 'contain' so the image fits within the section without cropping
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '70vh', // Adjust height to ensure the section has enough height without whitespace
        }}
      >
      </section> */}
      <FAQSection />
      <InspiringSection />
      <Footer />
    </>
  );
}
