import "../styles/Hero.css";
export default function Hero({ setPage }) {
  return (
    <section className="relative overflow-hidden bg-[#F9F6EC]">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#FFF5D8_0%,transparent_35%),radial-gradient(circle_at_bottom_right,#DDF6E3_0%,transparent_35%)]"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}

          <div>

            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 rounded-full px-5 py-2 font-semibold tracking-wide">
              🌱 100% ORGANIC
            </div>

            <h1 className="mt-8 text-5xl md:text-7xl font-black leading-none text-[#1C1C1C]">

              FROM OUR
              <br />

              <span className="text-green-700">
                FARMS
              </span>

              <br />

              TO YOUR

              <br />

              <span className="text-green-700">
                FAMILY
              </span>

            </h1>

            <div className="w-28 h-1 bg-green-700 rounded-full mt-8"></div>

            <p className="mt-8 text-lg text-gray-700 leading-8">

              Pure • Fresh • Chemical Free
              <br />
              Lab Tested For Your Family's Safety

            </p>

            <div className="mt-8 space-y-5">

              <div className="flex items-center gap-4 text-lg">

                <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center">
                  🌿
                </div>

                <span>100% Organic</span>

              </div>

              <div className="flex items-center gap-4 text-lg">

                <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center">
                  🚜
                </div>

                <span>Farm Fresh</span>

              </div>

              <div className="flex items-center gap-4 text-lg">

                <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center">
                  🧪
                </div>

                <span>Chemical Free</span>

              </div>

              <div className="flex items-center gap-4 text-lg">

                <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center">
                  ✅
                </div>

                <span>Lab Tested</span>

              </div>

            </div>

            <div className="mt-12 flex flex-wrap gap-5">

              <button
                onClick={() => setPage("shop")}
                className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-full font-bold shadow-lg transition"
              >
                Shop Now
              </button>

              <button
                onClick={() => setPage("track")}
                className="border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white px-8 py-4 rounded-full font-bold transition"
              >
                Track Order
              </button>

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex justify-center">

            <img
              src="/hero.png"
              alt="Nano Farms"
              className="w-full max-w-2xl"
            />

          </div>

        </div>

      </div>

    </section>
  );
}