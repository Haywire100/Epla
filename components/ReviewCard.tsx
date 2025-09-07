import React from 'react';
import { Review } from '../types';
import { StarIcon } from './icons/StarIcon';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-start justify-between mb-2">
        <div>
            <h4 className="font-semibold text-gray-800">{review.reviewerName}</h4>
            <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className={`h-5 w-5 ${review.rating > i ? 'text-accent' : 'text-gray-300'}`} />
                ))}
            </div>
        </div>
        <p className="text-sm text-gray-500 flex-shrink-0 ml-4">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      <p className="mt-3 text-gray-600 leading-relaxed">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
