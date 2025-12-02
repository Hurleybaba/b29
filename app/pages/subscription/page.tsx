import Link from "next/link";

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-white px-3 xs:px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-[30px]">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 lg:mb-16">
        <h1 className="text-3xl xs:text-4xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-2 sm:mb-3 lg:mb-4 leading-tight">
          Subscription & Billing
        </h1>
        <p className="text-sm xs:text-base sm:text-lg text-black px-2">
          Manage your plan, payments, and billing history
        </p>
      </div>

      {/* Current Plan Section */}
      <div className="w-full max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-16 px-0">
        <div className="bg-white rounded-lg xs:rounded-xl shadow-lg sm:shadow-2xl border border-gray-200 p-4 xs:p-6 sm:p-8 relative">
          <div className="absolute top-3 xs:top-4 right-3 xs:right-4 sm:right-6 bg-orange-600 text-white text-xs font-bold px-2 xs:px-3 sm:px-4 py-1 rounded-full whitespace-nowrap">
            Active
          </div>
          <p className="text-black text-xs xs:text-xs sm:text-sm uppercase tracking-wide mb-2 xs:mb-3 sm:mb-4 pr-16">
            Current Plan
          </p>
          <h2 className="text-2xl xs:text-2xl sm:text-3xl font-bold text-black mb-2 sm:mb-3">
            Professional
          </h2>
          <p className="text-3xl xs:text-4xl sm:text-4xl font-bold text-orange-600 mb-1 sm:mb-2">
            $79 <span className="text-base xs:text-lg sm:text-lg text-black">/month</span>
          </p>
          <p className="text-black text-xs xs:text-sm sm:text-sm mb-4 sm:mb-8">
            Next billing date: November 01, 2025
          </p>
          <button className="cursor-pointer w-full py-2 xs:py-2.5 sm:py-3 px-3 xs:px-4 sm:px-4 rounded-lg border-2 border-orange-600 text-orange-600 text-sm xs:text-base font-semibold hover:bg-orange-600 hover:text-white transition duration-200">
            Cancel Subscription
          </button>
        </div>
      </div>

      {/* Available Plans Section */}
      <div className="w-full max-w-6xl mx-auto pb-8 sm:pb-12 lg:pb-[50px] px-0">
        <h3 className="text-2xl xs:text-3xl sm:text-3xl lg:text-3xl font-bold text-black text-center mb-6 sm:mb-8 lg:mb-12">
          Available Plans
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-6 lg:gap-8">
          {/* Basic Plan */}
          <div className="bg-white rounded-lg xs:rounded-xl shadow-md sm:shadow-lg border border-gray-200 p-4 xs:p-6 sm:p-8 hover:shadow-lg hover:border-gray-300 transition duration-200 flex flex-col">
            <h4 className="text-xl xs:text-2xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">
              Basic
            </h4>
            <p className="text-3xl xs:text-4xl sm:text-4xl font-bold text-orange-600 mb-1 sm:mb-2">
              $29 <span className="text-base xs:text-lg sm:text-lg text-black">/month</span>
            </p>
            
            <ul className="mt-4 xs:mt-6 sm:mt-8 space-y-2 xs:space-y-3 sm:space-y-4 flex-grow">
              <li className="flex items-start gap-2 xs:gap-2.5 sm:gap-3">
                <span className="text-orange-600 font-bold text-lg flex-shrink-0 pt-0.5">●</span>
                <span className="text-black text-sm xs:text-base sm:text-base">5 Business Listings</span>
              </li>
              <li className="flex items-start gap-2 xs:gap-2.5 sm:gap-3">
                <span className="text-orange-600 font-bold text-lg flex-shrink-0 pt-0.5">●</span>
                <span className="text-black text-sm xs:text-base sm:text-base">Basic Analytics</span>
              </li>
              <li className="flex items-start gap-2 xs:gap-2.5 sm:gap-3">
                <span className="text-orange-600 font-bold text-lg flex-shrink-0 pt-0.5">●</span>
                <span className="text-black text-sm xs:text-base sm:text-base">Email Support</span>
              </li>
              <li className="flex items-start gap-2 xs:gap-2.5 sm:gap-3">
                <span className="text-orange-600 font-bold text-lg flex-shrink-0 pt-0.5">●</span>
                <span className="text-black text-sm xs:text-base sm:text-base">24/7 Visibility</span>
              </li>
            </ul>

            <button className="cursor-pointer mt-4 xs:mt-6 sm:mt-8 w-full py-2 xs:py-2.5 sm:py-3 px-3 xs:px-4 sm:px-4 rounded-lg border-2 border-orange-600 text-orange-600 text-sm xs:text-base font-semibold hover:bg-orange-600 hover:text-white transition duration-200">
              Choose Plan
            </button>
          </div>

          {/* Professional Plan (Recommended) */}
          <div className="bg-white rounded-lg xs:rounded-xl shadow-md sm:shadow-2xl border-2 border-orange-600 p-4 xs:p-6 sm:p-8 relative sm:col-span-2 lg:col-span-1 lg:transform lg:scale-100 z-10 flex flex-col sm:-translate-y-2 lg:-translate-y-0">
            <div className="absolute top-0 right-0 bg-orange-600 text-white text-xs font-bold px-2 xs:px-3 sm:px-4 py-1 rounded-bl-lg rounded-tr-lg xs:rounded-tr-xl whitespace-nowrap">
              Currently Plan
            </div>
            <h4 className="text-xl xs:text-2xl sm:text-2xl font-bold text-black mb-3 sm:mb-4 pr-20">
              Professional
            </h4>
            <p className="text-3xl xs:text-4xl sm:text-4xl font-bold text-orange-600 mb-1 sm:mb-2">
              $79 <span className="text-base xs:text-lg sm:text-lg text-black">/month</span>
            </p>
            
            <ul className="mt-4 xs:mt-6 sm:mt-8 space-y-2 xs:space-y-3 sm:space-y-4 flex-grow">
              <li className="flex items-start gap-2 xs:gap-2.5 sm:gap-3">
                <span className="text-orange-600 font-bold text-lg flex-shrink-0 pt-0.5">●</span>
                <span className="text-black text-sm xs:text-base sm:text-base">20 Business Listings</span>
              </li>
              <li className="flex items-start gap-2 xs:gap-2.5 sm:gap-3">
                <span className="text-orange-600 font-bold text-lg flex-shrink-0 pt-0.5">●</span>
                <span className="text-black text-sm xs:text-base sm:text-base">Advanced Analytics</span>
              </li>
              <li className="flex items-start gap-2 xs:gap-2.5 sm:gap-3">
                <span className="text-orange-600 font-bold text-lg flex-shrink-0 pt-0.5">●</span>
                <span className="text-black text-sm xs:text-base sm:text-base">Priority Support</span>
              </li>
              <li className="flex items-start gap-2 xs:gap-2.5 sm:gap-3">
                <span className="text-orange-600 font-bold text-lg flex-shrink-0 pt-0.5">●</span>
                <span className="text-black text-sm xs:text-base sm:text-base">Custom Branding</span>
              </li>
              <li className="flex items-start gap-2 xs:gap-2.5 sm:gap-3">
                <span className="text-orange-600 font-bold text-lg flex-shrink-0 pt-0.5">●</span>
                <span className="text-black text-sm xs:text-base sm:text-base">API Access</span>
              </li>
            </ul>

            <button className="cursor-pointer mt-4 xs:mt-6 sm:mt-8 w-full py-2 xs:py-2.5 sm:py-3 px-3 xs:px-4 sm:px-4 rounded-lg bg-orange-600 text-white text-sm xs:text-base font-semibold hover:bg-orange-700 transition duration-200 shadow-lg">
              Current Plan
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-lg xs:rounded-xl shadow-md sm:shadow-lg border border-gray-200 p-4 xs:p-6 sm:p-8 hover:shadow-lg hover:border-gray-300 transition duration-200 sm:col-span-2 lg:col-span-1 flex flex-col">
            <h4 className="text-xl xs:text-2xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">
              Enterprise
            </h4>
            <p className="text-3xl xs:text-4xl sm:text-4xl font-bold text-orange-600 mb-1 sm:mb-2">
              $199 <span className="text-base xs:text-lg sm:text-lg text-black">/month</span>
            </p>
            
            <ul className="mt-4 xs:mt-6 sm:mt-8 space-y-2 xs:space-y-3 sm:space-y-4 flex-grow">
              <li className="flex items-start gap-2 xs:gap-2.5 sm:gap-3">
                <span className="text-orange-600 font-bold text-lg flex-shrink-0 pt-0.5">●</span>
                <span className="text-black text-sm xs:text-base sm:text-base">Unlimited Listings</span>
              </li>
              <li className="flex items-start gap-2 xs:gap-2.5 sm:gap-3">
                <span className="text-orange-600 font-bold text-lg flex-shrink-0 pt-0.5">●</span>
                <span className="text-black text-sm xs:text-base sm:text-base">Premium Analytics</span>
              </li>
              <li className="flex items-start gap-2 xs:gap-2.5 sm:gap-3">
                <span className="text-orange-600 font-bold text-lg flex-shrink-0 pt-0.5">●</span>
                <span className="text-black text-sm xs:text-base sm:text-base">24/7 Dedicated Support</span>
              </li>
              <li className="flex items-start gap-2 xs:gap-2.5 sm:gap-3">
                <span className="text-orange-600 font-bold text-lg flex-shrink-0 pt-0.5">●</span>
                <span className="text-black text-sm xs:text-base sm:text-base">White Label</span>
              </li>
              <li className="flex items-start gap-2 xs:gap-2.5 sm:gap-3">
                <span className="text-orange-600 font-bold text-lg flex-shrink-0 pt-0.5">●</span>
                <span className="text-black text-sm xs:text-base sm:text-base">Advanced API</span>
              </li>
              <li className="flex items-start gap-2 xs:gap-2.5 sm:gap-3">
                <span className="text-orange-600 font-bold text-lg flex-shrink-0 pt-0.5">●</span>
                <span className="text-black text-sm xs:text-base sm:text-base">Custom Integration</span>
              </li>
            </ul>

            <button className="cursor-pointer mt-4 xs:mt-6 sm:mt-8 w-full py-2 xs:py-2.5 sm:py-3 px-3 xs:px-4 sm:px-4 rounded-lg border-2 border-orange-600 text-orange-600 text-sm xs:text-base font-semibold hover:bg-orange-600 hover:text-white transition duration-200">
              Choose Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}