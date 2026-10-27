import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, MapPin, Calendar, CheckCircle, XCircle, Star, Camera, Utensils } from 'lucide-react';
import { TOURS } from '../constants';
import { TourPackage } from '../types';

const ViewItineraryPage: React.FC = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const tour: TourPackage | undefined = TOURS.find(t => t.id === tourId);

  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Tour Not Found</h1>
            <p className="text-gray-600 mt-4">The tour you're looking for doesn't exist.</p>
            <Link to="/tours" className="inline-flex items-center gap-2 mt-6 text-[#C08240] hover:text-[#A67134] font-medium">
              <ArrowLeft className="w-4 h-4" />
              Back to Tours
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-black/70 to-black/50">
        <img 
          src={tour.coverImage || tour.image || 'https://images.unsplash.com/photo-1583421664367-15c7cfd6f0f6?q=80&w=1600'} 
          alt={tour.name}
          onError={(e) => {
            const target = e.currentTarget;
            if (tour.image && target.src !== tour.image) {
              target.src = tour.image;
            } else {
              target.src = 'https://images.unsplash.com/photo-1583421664367-15c7cfd6f0f6?q=80&w=1600';
            }
          }}
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-6xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <Link to="/tours" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to Tours
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{tour.name}</h1>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{tour.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Tanzania</span>
              </div>
            </div>
            {tour.badge && (
              <span className="inline-block mt-4 px-3 py-1 bg-[#C08240] text-white text-sm rounded-full">
                {tour.badge}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            
            {/* Overview */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tour Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#C08240]" />
                  <div>
                    <p className="font-medium text-gray-900">Duration</p>
                    <p className="text-gray-600">{tour.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[#C08240]" />
                  <div>
                    <p className="font-medium text-gray-900">Category</p>
                    <p className="text-gray-600">{tour.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-[#C08240]" />
                  <div>
                    <p className="font-medium text-gray-900">Price Range</p>
                    <p className="text-gray-600">{tour.priceRange}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#C08240]" />
                  <div>
                    <p className="font-medium text-gray-900">Starting From</p>
                    <p className="text-gray-600">Arusha/Moshi</p>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tour Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {tour.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#C08240] flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Itinerary */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Itinerary</h2>
              <div className="space-y-8">
                {tour.itinerary.map((day, index) => (
                  <div key={index} className="border-l-4 border-[#C08240] pl-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-[#C08240] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        {day.day}
                      </span>
                      <h3 className="text-xl font-semibold text-gray-900">{day.title}</h3>
                    </div>
                    <p className="text-gray-700 mb-4">{day.activities}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4 text-[#C08240]" />
                        <span className="font-medium">Accommodation:</span>
                        <span className="text-gray-600">{day.accommodation}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-[#C08240]" />
                        <span className="font-medium">Meals:</span>
                        <span className="text-gray-600">{day.meals}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Included & Not Included */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
                  <div className="space-y-2">
                    {tour.included.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">What's Not Included</h3>
                  <div className="space-y-2">
                    {tour.notIncluded.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Booking Card */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-[#C08240] mb-1">
                    ${tour.fromPrice}
                  </div>
                  <div className="text-gray-600">per person</div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{tour.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Group Size:</span>
                    <span className="font-medium">1-12 people</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Language:</span>
                    <span className="font-medium">English</span>
                  </div>
                </div>

                <button className="w-full bg-[#C08240] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#A67134] transition-colors mb-3">
                  Book Now
                </button>
                
                <button className="w-full border border-[#C08240] text-[#C08240] px-6 py-3 rounded-lg font-semibold hover:bg-[#C08240] hover:text-white transition-colors">
                  Customize Tour
                </button>
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Call us:</span>
                    <p className="text-[#C08240]">+255 753 997 777</p>
                  </div>
                  <div>
                    <span className="font-medium">Email:</span>
                    <p className="text-[#C08240]">info@tanzaniasafariexplorer.com</p>
                  </div>
                  <div>
                    <span className="font-medium">WhatsApp:</span>
                    <p className="text-[#C08240]">+255 753 997 777</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewItineraryPage;