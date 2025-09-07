import React from 'react';
import { PageState, Review } from '../types';
import { VENDORS, PRODUCTS, REVIEWS } from '../constants';
import ProductGrid from './ProductGrid';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { ChatBubbleLeftRightIcon } from './icons/ChatBubbleLeftRightIcon';
import { StarIcon } from './icons/StarIcon';
import { HeartIcon } from './icons/HeartIcon';
import ReviewCard from './ReviewCard';

interface VendorProfileProps {
  vendorId: number;
  onNavigate: (page: PageState) => void;
}

const VendorProfile: React.FC<VendorProfileProps> = ({ vendorId, onNavigate }) => {
  const vendor = VENDORS.find(v => v.id === vendorId);
  const vendorProducts = PRODUCTS.filter(p => p.vendorId === vendorId);
  const vendorReviews = REVIEWS.filter(r => r.vendorId === vendorId).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const averageRating = vendorReviews.length > 0
    ? (vendorReviews.reduce((sum, review) => sum + review.rating, 0) / vendorReviews.length).toFixed(1)
    : vendor?.rating.toFixed(1);

  if (!vendor) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Vendor not found</h2>
        <button onClick={() => onNavigate({ name: 'buyerDashboard' })} className="mt-4 text-secondary hover:text-secondary-dark">
          &larr; Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-gray-50">
       <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <button 
                onClick={() => onNavigate({ name: 'home' })} 
                className="flex items-center text-sm font-medium text-gray-600 hover:text-primary mb-4"
            >
                <ArrowLeftIcon className="mr-2"/>
                Back to Shop
            </button>
            <div className="md:flex md:items-start md:justify-between">
                <div className="flex-1 min-w-0">
                    <h1 className="text-3xl font-bold text-gray-900">{vendor.name}</h1>
                    <p className="mt-1 text-gray-600">{vendor.location}</p>
                    <div className="mt-2 flex items-center">
                        <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                key={rating}
                                className={`h-5 w-5 ${vendor.rating > rating ? 'text-accent' : 'text-gray-300'}`}
                                aria-hidden="true"
                                />
                            ))}
                        </div>
                        <p className="ml-2 text-sm text-gray-500">{vendor.rating} stars</p>
                    </div>
                     <p className="mt-4 text-gray-600 max-w-2xl">{vendor.bio}</p>
                </div>
                <div className="mt-4 flex md:mt-0 md:ml-4">
                     <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                     >
                        <ChatBubbleLeftRightIcon className="mr-2"/>
                        Direct Message
                    </button>
                </div>
            </div>
        </div>
      </div>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-primary/10 p-6 rounded-lg mb-12">
          <div className="flex items-center">
            <HeartIcon className="h-8 w-8 text-primary mr-4" />
            <div>
              <h3 className="text-xl font-bold text-primary">Our Impact Story</h3>
              <p className="mt-2 text-gray-700">{vendor.impactStory}</p>
            </div>
          </div>
        </div>

        <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Feedback</h3>
            {vendorReviews.length > 0 ? (
                <div className="space-y-6">
                    <div className="flex items-center mb-6 bg-white p-4 rounded-lg shadow-sm border">
                        <div className="text-5xl font-extrabold text-accent">{averageRating}</div>
                        <div className="ml-4">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} className={`h-6 w-6 ${parseFloat(averageRating || '0') > i ? 'text-accent' : 'text-gray-300'}`} />
                                ))}
                            </div>
                            <p className="text-gray-600">Based on {vendorReviews.length} reviews</p>
                        </div>
                    </div>
                    <div className="space-y-8">
                        {vendorReviews.map(review => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                    <p className="text-gray-600">This vendor doesn't have any reviews yet.</p>
                </div>
            )}
        </div>


        <ProductGrid 
          products={vendorProducts} 
          onNavigate={onNavigate}
          title={`Products from ${vendor.name}`}
          subtitle="Support this vendor by purchasing their fresh produce."
        />
      </main>
    </div>
  );
};

export default VendorProfile;