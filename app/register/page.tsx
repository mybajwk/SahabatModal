import FormRegister from '@/components/ui/formregister'

export default function Register() {
  return (
      <div className="flex justify-center items-center h-auto">
        {/* Bagian Kiri (Gambar) */}
        <div
          className="relative flex flex-col text-white"
          style={{
            width: '40%',
            height: '1100px',
            opacity: 0.75,
            background: 'conic-gradient(from -68deg at 50.89% 17.15%,#18D3A7 30deg, #2F919E 200.53201389312744deg)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <img
            src="/logo.png"
            alt="SahabatModal Logo"
            className="absolute z-20 top-0 left-0 m-4"
            style={{ width: '82.68px', height: 'auto' }}
          />
          <img
            src="ellipse-login.svg"
            alt="Ellipse"
            className="absolute z-10"
            style={{ top: '150px', right: '0', width: '453px', height: 'auto' }}
          />
          <img
            src="ellipse-login.svg"
            alt="Ellipse"
            className="absolute z-30"
            style={{ top: '0px', left: '50px', width: '675px', height: 'auto' }}
          />
          <div
            className="text-center p-10 flex-grow flex flex-col justify-center"
            style={{ marginTop: '-200px' }}
          >
            <h1 className="text-3xl font-bold mb-4">Koneksi, Inkubasi, Ekspansi</h1>
            <p className="text-lg" style={{ fontSize: '42px' }}>with</p>
            <h2 className="text-4xl font-bold mt-2" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              = SahabatModal
            </h2>
          </div>
        </div>

        {/* Bagian Kanan (Form) */}
        <div
          className="flex items-center justify-center bg-white"
          style={{ width: '60%', height: '1100px' }}
        >
          <div className="w-3/4 relative" style={{ marginTop: '-900px' }}>
            {/* <div
              className="absolute top-0 right-0 flex flex-col justify-center items-center mb-4"
              style={{
                width: '60px',
                height: '60px',
                padding: '26px 16px',
                borderRadius: '50%',
                border: '2.633px solid',
                borderImage: 'linear-gradient(135deg, #F103CF, #74A3FF) 1',
              }}
            >
              <p className="text-gray-500">1/3</p>
            </div> */}
            <h2
              className="text-4xl mb-20 font-semibold mt-12 text-center text-black"
              style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
            >
              REGISTER
            </h2>
            {/* Komponen Form */}
            <FormRegister />
          </div>
        </div>
      </div>
  );
}
