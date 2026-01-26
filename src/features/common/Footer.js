function Footer() {
  return (
    <>
      <div className="bg-gray-900 w-full">
        <div className="max-w-7xl mx-auto text-white py-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl mb-3 font-semibold">
              Download our Ecommerce App
            </h3>
            <p className="text-sm sm:text-base">Buy what you want.</p>
            <div className="flex flex-col items-center gap-4 my-10 sm:flex-row sm:justify-center">
              <div className="flex items-center border border-gray-600 bg-gray-800 rounded-lg px-4 py-3 w-full max-w-xs sm:w-60 sm:mx-2 transition-all hover:scale-105">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                  alt="Google Play Store"
                  className="w-8 h-8"
                />
                <div className="text-left ml-3">
                  <p className="text-xs text-gray-300">Download on</p>
                  <p className="text-sm sm:text-base whitespace-nowrap font-medium">
                    Google Play Store
                  </p>
                </div>
              </div>
              <div className="flex items-center border border-gray-600 bg-gray-800 rounded-lg px-4 py-3 w-full max-w-xs sm:w-56 sm:mx-2 transition-all hover:scale-105">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
                  alt="Apple Store"
                  className="w-8 h-8"
                />
                <div className="text-left ml-3">
                  <p className="text-xs text-gray-300">Download on</p>
                  <p className="text-sm sm:text-base whitespace-nowrap font-medium">
                    Apple Store
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 flex flex-col sm:flex-row sm:justify-between items-center text-xs sm:text-sm text-gray-400 gap-2">
            <p className="order-2 sm:order-1 mt-4 sm:mt-0 text-center">
              © SEM 5, 2024.
            </p>
            <div className="order-1 sm:order-2 flex flex-col sm:flex-row text-center">
              <span className="px-2 py-1 hover:text-white transition-colors cursor-pointer">
                About us
              </span>
              <span className="px-2 py-1 border-t sm:border-t-0 sm:border-l border-gray-500 hover:text-white transition-colors cursor-pointer">
                Contact us
              </span>
              <span className="px-2 py-1 border-t sm:border-t-0 sm:border-l border-gray-500 hover:text-white transition-colors cursor-pointer">
                Privacy Policy
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
