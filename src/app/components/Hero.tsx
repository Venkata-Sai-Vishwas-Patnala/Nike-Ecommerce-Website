export function Hero() {
  return (
    <section className="bg-gray-50 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold mb-2">Just In</p>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              NIKE AIR MAX PULSE
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
              Extreme comfort. Hyper durable. Max volume. Introducing the Air Max Pulse—designed to push you past your limits and help you go to the max.
            </p>
            <div className="flex gap-4">
              <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors">
                Notify Me
              </button>
              <button className="bg-white text-black px-6 py-3 rounded-full border border-gray-300 hover:border-gray-800 transition-colors">
                Shop Air Max
              </button>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWtlJTIwc2hvZXN8ZW58MXx8fHwxNzc4ODczMTk1fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Nike Air Max Pulse"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
