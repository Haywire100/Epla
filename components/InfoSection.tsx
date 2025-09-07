import React from 'react';
import { ShoppingBagIcon } from './icons/ShoppingBagIcon';
import { HeartIcon } from './icons/HeartIcon';
import { SparklesIcon } from './icons/SparklesIcon';

const features = [
  {
    name: 'Shop from Local Farms',
    description: 'Get direct access to the freshest produce from farms across Nigeria, bypassing the middlemen.',
    icon: ShoppingBagIcon,
  },
  {
    name: 'Support Nigerian Business',
    description: 'Every purchase you make directly contributes to the livelihood of local farmers and their communities.',
    icon: HeartIcon,
  },
  {
    name: 'Fresh & Authentic Produce',
    description: 'We guarantee the quality and authenticity of our products, bringing the true taste of home to your table.',
    icon: SparklesIcon,
  },
];

const InfoSection: React.FC = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
           <h2 className="text-base font-semibold leading-7 text-primary">From Farm to Your Home</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to nourish your family
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We are more than a marketplace. We are a community dedicated to connecting you with the heart of Nigerian agriculture.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
