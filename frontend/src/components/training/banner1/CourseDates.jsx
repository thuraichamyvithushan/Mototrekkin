import React from 'react';
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';

const CourseDates = () => {
  return (
    <section id="course-dates" className="py-24 bg-gradient-to-br from-gray-50 via-white to-yellow-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-red-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-full text-sm font-bold tracking-wider uppercase animate-fade-in-up">
              📅 2025 Training Schedule
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-yellow-600 to-orange-600 mb-8 animate-fade-in-up animation-delay-200 leading-tight">
            2025 COURSE DATES
          </h2>

          <div className="flex justify-center mb-12 animate-fade-in-up animation-delay-400">
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full"></div>
          </div>

          <p className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed animate-fade-in-up animation-delay-600 max-w-4xl mx-auto">
            Find the perfect date for your Masterclass Development Program. Book early to secure your spot!
          </p>
        </div>

        {/* Course Dates Table */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 animate-fade-in-up animation-delay-800">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              {/* Table Header */}
              <thead className="bg-gradient-to-r from-gray-900 via-black to-gray-800">
                <tr>
                  <th className="py-6 px-8 text-left">
                    <div className="flex items-center text-yellow-400">
                      <Calendar className="w-6 h-6 mr-3" />
                      <span className="text-lg font-bold">2025 DATES</span>
                    </div>
                  </th>
                  <th className="py-6 px-8 text-left">
                    <div className="flex items-center text-yellow-400">
                      <MapPin className="w-6 h-6 mr-3" />
                      <span className="text-lg font-bold">WHERE</span>
                    </div>
                  </th>
                  <th className="py-6 px-8 text-left">
                    <div className="flex items-center text-yellow-400">
                      <Clock className="w-6 h-6 mr-3" />
                      <span className="text-lg font-bold">STATUS</span>
                    </div>
                  </th>
                  <th className="py-6 px-8 text-left">
                    <div className="flex items-center text-yellow-400">
                      <ExternalLink className="w-6 h-6 mr-3" />
                      <span className="text-lg font-bold">ACTION</span>
                    </div>
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-100">
                {/* January */}
                <tr className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-300">
                  <td className="py-6 px-8">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-4"></div>
                      <span className="text-lg font-semibold text-gray-800">JANUARY</span>
                    </div>
                  </td>
                  <td className="py-6 px-8 text-gray-600">NO COURSE AVAILABLE</td>
                  <td className="py-6 px-8">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-red-100 text-red-800 border border-red-200">
                      SOLD OUT
                    </span>
                  </td>
                  <td className="py-6 px-8">
                    <span className="text-gray-400 text-sm">-</span>
                  </td>
                </tr>

                {/* February */}
                <tr className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-300">
                  <td className="py-6 px-8">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-4"></div>
                      <span className="text-lg font-semibold text-gray-800">FEBRUARY</span>
                    </div>
                  </td>
                  <td className="py-6 px-8 text-gray-600">NO COURSE AVAILABLE</td>
                  <td className="py-6 px-8">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-red-100 text-red-800 border border-red-200">
                      SOLD OUT
                    </span>
                  </td>
                  <td className="py-6 px-8">
                    <span className="text-gray-400 text-sm">-</span>
                  </td>
                </tr>

                {/* March */}
                <tr className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-300">
                  <td className="py-6 px-8">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-4"></div>
                      <span className="text-lg font-semibold text-gray-800">MAR. 28,29,30</span>
                    </div>
                  </td>
                  <td className="py-6 px-8">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                      MDP Phase I
                    </span>
                  </td>
                  <td className="py-6 px-8">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-red-100 text-red-800 border border-red-200">
                      SOLD OUT
                    </span>
                  </td>
                  <td className="py-6 px-8">
                    <span className="text-gray-400 text-sm">-</span>
                  </td>
                </tr>

                {/* April */}
                <tr className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-300">
                  <td className="py-6 px-8">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-4"></div>
                      <span className="text-lg font-semibold text-gray-800">APR. 25,26,27</span>
                    </div>
                  </td>
                  <td className="py-6 px-8">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                      MDP Phase II
                    </span>
                  </td>
                  <td className="py-6 px-8">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-red-100 text-red-800 border border-red-200">
                      SOLD OUT
                    </span>
                  </td>
                  <td className="py-6 px-8">
                    <span className="text-gray-400 text-sm">-</span>
                  </td>
                </tr>

                {/* May */}
                <tr className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-300">
                  <td className="py-6 px-8">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-4"></div>
                      <span className="text-lg font-semibold text-gray-800">MAY 23,24,25</span>
                    </div>
                  </td>
                  <td className="py-6 px-8">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                      MDP Phase I
                    </span>
                  </td>
                  <td className="py-6 px-8">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-red-100 text-red-800 border border-red-200">
                      SOLD OUT
                    </span>
                  </td>
                  <td className="py-6 px-8">
                    <span className="text-gray-400 text-sm">-</span>
                  </td>
                </tr>

                {/* June */}
                <tr className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-300">
                  <td className="py-6 px-8">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-4"></div>
                      <span className="text-lg font-semibold text-gray-800">JUNE 27,28,29</span>
                    </div>
                  </td>
                  <td className="py-6 px-8">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                      MDP Phase II
                    </span>
                  </td>
                  <td className="py-6 px-8">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-orange-100 text-orange-800 border border-orange-200">
                      90% SOLD
                    </span>
                  </td>
                  <td className="py-6 px-8">
                    <a 
                      href="https://www.mototrekkin.com.au/registration-form/registration-mdp-phase-2" 
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold rounded-lg text-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      BOOK NOW
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </td>
                </tr>

                {/* July */}
                <tr className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-300">
                  <td className="py-6 px-8">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-4"></div>
                      <span className="text-lg font-semibold text-gray-800">JULY</span>
                    </div>
                  </td>
                  <td className="py-6 px-8 text-gray-600">NO COURSE AVAILABLE</td>
                  <td className="py-6 px-8">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-red-100 text-red-800 border border-red-200">
                      SOLD OUT
                    </span>
                  </td>
                  <td className="py-6 px-8">
                    <span className="text-gray-400 text-sm">-</span>
                  </td>
                </tr>

                {/* August */}
                <tr className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-300">
                  <td className="py-6 px-8">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-4"></div>
                      <span className="text-lg font-semibold text-gray-800">AUGUST</span>
                    </div>
                  </td>
                  <td className="py-6 px-8 text-gray-600">NO COURSE AVAILABLE</td>
                  <td className="py-6 px-8">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-red-100 text-red-800 border border-red-200">
                      SOLD OUT
                    </span>
                  </td>
                  <td className="py-6 px-8">
                    <span className="text-gray-400 text-sm">-</span>
                  </td>
                </tr>

                {/* September */}
                <tr className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-300">
                  <td className="py-6 px-8">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-4"></div>
                      <span className="text-lg font-semibold text-gray-800">SEPT. 26,27,28</span>
                    </div>
                  </td>
                  <td className="py-6 px-8">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                      MDP Phase I
                    </span>
                  </td>
                  <td className="py-6 px-8">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-orange-100 text-orange-800 border border-orange-200">
                      90% SOLD
                    </span>
                  </td>
                  <td className="py-6 px-8">
                    <a 
                      href="https://www.mototrekkin.com.au/registration-form/registration-masterclass/" 
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold rounded-lg text-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      BOOK NOW
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </td>
                </tr>

                {/* October */}
                <tr className="hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300">
                  <td className="py-6 px-8">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                      <span className="text-lg font-semibold text-gray-800">OCT. 24,25,26</span>
                    </div>
                  </td>
                  <td className="py-6 px-8">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                      MDP Phase II
                    </span>
                  </td>
                  <td className="py-6 px-8">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-green-100 text-green-800 border border-green-200">
                      AVAILABLE
                    </span>
                  </td>
                  <td className="py-6 px-8">
                    <a 
                      href="https://www.mototrekkin.com.au/registration-form/registration-mdp-phase-2" 
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-lg text-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      BOOK NOW
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </td>
                </tr>

                {/* November */}
                <tr className="hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300">
                  <td className="py-6 px-8">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                      <span className="text-lg font-semibold text-gray-800">NOV. 28,29,30</span>
                    </div>
                  </td>
                  <td className="py-6 px-8">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 border border-purple-200">
                      MDP Phase III
                    </span>
                  </td>
                  <td className="py-6 px-8">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-green-100 text-green-800 border border-green-200">
                      AVAILABLE
                    </span>
                  </td>
                  <td className="py-6 px-8">
                    <a 
                      href="https://www.mototrekkin.com.au/registration-form/registration-mdp-phase-3" 
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-lg text-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      BOOK NOW
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </td>
                </tr>

                {/* December */}
                <tr className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-300">
                  <td className="py-6 px-8">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-4"></div>
                      <span className="text-lg font-semibold text-gray-800">DECEMBER</span>
                    </div>
                  </td>
                  <td className="py-6 px-8 text-gray-600">NO COURSE AVAILABLE</td>
                  <td className="py-6 px-8">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-red-100 text-red-800 border border-red-200">
                      SOLD OUT
                    </span>
                  </td>
                  <td className="py-6 px-8">
                    <span className="text-gray-400 text-sm">-</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-fade-in-up animation-delay-1000">
          <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-sm border border-red-200 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">7</span>
            </div>
            <h3 className="text-lg font-bold text-red-800 mb-2">SOLD OUT</h3>
            <p className="text-red-600 text-sm">Months fully booked</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 backdrop-blur-sm border border-orange-200 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">2</span>
            </div>
            <h3 className="text-lg font-bold text-orange-800 mb-2">90% SOLD</h3>
            <p className="text-orange-600 text-sm">Limited spots remaining</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-200 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">2</span>
            </div>
            <h3 className="text-lg font-bold text-green-800 mb-2">AVAILABLE</h3>
            <p className="text-green-600 text-sm">Book your spot now</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDates;
