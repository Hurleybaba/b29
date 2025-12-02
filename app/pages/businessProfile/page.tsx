import Image from "next/image";
import Link from "next/link";

export default function BusinessProfile() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header/Nav */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="font-bold text-xl text-[#1453A0]">MyApp</div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">Search</button>
            <Link href="/pages/userProfile" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
               <span className="text-xs font-bold">ME</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-gray-800 to-gray-900">
        {/* Banner Image Placeholder */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="relative -mt-16 sm:-mt-24 mb-8 flex flex-col sm:flex-row items-end sm:items-end gap-6">
          {/* Logo */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white p-1 rounded-2xl shadow-xl">
            <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                {/* Logo Placeholder */}
                <span className="text-4xl font-bold text-gray-400">NP</span>
            </div>
          </div>
          
          {/* Business Info Header */}
          <div className="flex-1 pb-2 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-white sm:drop-shadow-md">Nexus Properties Ltd.</h1>
            <p className="text-gray-600 sm:text-gray-200 mt-1 sm:font-medium">Premium Real Estate & Architecture</p>
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(i => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                </div>
                <span className="text-sm font-medium text-gray-600 sm:text-gray-200">(48 Reviews)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pb-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none bg-[#1453A0] hover:bg-blue-800 text-white px-6 py-2.5 rounded-lg font-semibold shadow-sm transition">
                Contact Us
            </button>
            <button className="flex-1 sm:flex-none bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2.5 rounded-lg font-semibold shadow-sm transition">
                Website
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-10">
                
                {/* About Section */}
                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#1453A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        About Us
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        We are a leading real estate agency specializing in luxury properties and modern architecture. With over 15 years of experience in the market, we help our clients find their dream homes and investment opportunities. Our team of dedicated professionals ensures a seamless experience from viewing to handing over the keys.
                    </p>
                </section>

                {/* Services/Listings Section */}
                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#1453A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        Featured Listings
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition group">
                                <div className="h-48 bg-gray-100 relative">
                                    {/* Listing Image Placeholder */}
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 22V12h6v10"></path></svg>
                                    </div>
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-800">
                                        $450,000
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-900 group-hover:text-[#1453A0] transition">Sunnyvale Villa</h3>
                                    <p className="text-sm text-gray-500 mb-3">Beverly Hills, CA</p>
                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg> 4 Bed</span>
                                        <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> 2500 sqft</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
                {/* Opening Hours */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4">Opening Hours</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex justify-between">
                            <span className="text-gray-600">Monday - Friday</span>
                            <span className="font-medium text-gray-900">9:00 AM - 6:00 PM</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="text-gray-600">Saturday</span>
                            <span className="font-medium text-gray-900">10:00 AM - 4:00 PM</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="text-gray-600">Sunday</span>
                            <span className="text-red-500 font-medium">Closed</span>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4">Contact Info</h3>
                    <div className="space-y-4 text-sm">
                        <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-[#1453A0] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            <span className="text-gray-600">123 Business Avenue, Suite 400<br/>San Francisco, CA 94107</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-[#1453A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            <span className="text-gray-600">+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-[#1453A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            <span className="text-gray-600">contact@nexusproperties.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}