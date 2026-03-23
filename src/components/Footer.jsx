import React from 'react';
import { Truck, RotateCcw, ShieldCheck, HeartPulse } from 'lucide-react';

function Footer() {
  return (
    <footer className="w-full bg-white mt-auto pt-16 border-t border-gray-100">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 pb-12">
          
          <div className="flex flex-col gap-4">
            <h3 className="font-black tracking-widest text-dark text-sm mb-2">ONLINE SHOPPING</h3>
            <a href="#" className="text-gray-500 hover:text-brand transition-colors text-sm font-medium">Men</a>
            <a href="#" className="text-gray-500 hover:text-brand transition-colors text-sm font-medium">Women</a>
            <a href="#" className="text-gray-500 hover:text-brand transition-colors text-sm font-medium">Kids</a>
            <a href="#" className="text-gray-500 hover:text-brand transition-colors text-sm font-medium">Home & Living</a>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-black tracking-widest text-dark text-sm mb-2">CUSTOMER POLICIES</h3>
            <a href="#" className="text-gray-500 hover:text-brand transition-colors text-sm font-medium">Contact Us</a>
            <a href="#" className="text-gray-500 hover:text-brand transition-colors text-sm font-medium">FAQ</a>
            <a href="#" className="text-gray-500 hover:text-brand transition-colors text-sm font-medium">T&C</a>
            <a href="#" className="text-gray-500 hover:text-brand transition-colors text-sm font-medium">Terms Of Use</a>
          </div>

          <div className="flex flex-col gap-6 md:col-span-2">
            <h3 className="font-black tracking-widest text-dark text-sm">EXPERIENCE BLEND APP ON MOBILE</h3>
            <div className="flex gap-4 mb-2">
              <img src="https://constant.myntassets.com/web/assets/img/80cc455a-92d2-4b5c-a038-7da0d92af33f1539674178924-google_play.png" alt="Google Play" className="h-10 cursor-pointer object-contain hover:scale-105 transition-transform" />
              <img src="https://constant.myntassets.com/web/assets/img/bc5e11ad-0250-420a-ac71-115a57ca35d51539674178941-apple_store.png" alt="App Store" className="h-10 cursor-pointer object-contain hover:scale-105 transition-transform" />
            </div>

            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <ShieldCheck size={32} className="text-gray-400" />
                <p className="text-sm font-medium text-gray-500"><strong className="text-dark">100% ORIGINAL</strong> guarantee</p>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw size={32} className="text-gray-400" />
                <p className="text-sm font-medium text-gray-500"><strong className="text-dark">Return within 14days</strong> of receiving</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center py-8 border-t border-gray-100 text-gray-400 font-semibold text-sm">
          © {new Date().getFullYear()} www.blendfashion.com. All rights reserved. Let's pretend at least.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
