import React, { useState, useEffect, useRef } from 'react';

const StatCard: React.FC<{ finalValue: number; label: string }> = ({ finalValue, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const end = finalValue;
          const stepTime = Math.abs(Math.floor(duration / end));

          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) {
              clearInterval(timer);
            }
          }, stepTime);
          
          observer.disconnect();
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [finalValue]);

  return (
    <div ref={ref} className="mx-auto flex max-w-xs flex-col gap-y-4">
      <dt className="text-base leading-7 text-gray-600">{label}</dt>
      <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl text-secondary">
        {count.toLocaleString()}
      </dd>
    </div>
  );
};

const TrustAndImpactSection: React.FC = () => {
  return (
    <div className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
           <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Join a movement that matters</h2>
          <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
              <p className="text-xl leading-8 text-gray-600">
                Your purchases on Epla are more than just transactions; they are a vital part of a larger story of empowerment and community building.
              </p>
              <p className="mt-6 max-w-xl text-base leading-7 text-gray-700">
                We provide a transparent platform that ensures farmers receive a fair price for their hard work. This stability allows them to invest in their farms, support their families, and strengthen their local economies. By choosing Epla, you are directly contributing to a more sustainable and equitable food system in Nigeria.
              </p>
            </div>
            <div className="lg:flex lg:flex-auto lg:justify-center">
              <dl className="w-64 space-y-8 xl:w-80">
                <StatCard finalValue={3250} label="Farmers & vendors empowered" />
                <StatCard finalValue={10000} label="Kilograms of fresh produce delivered" />
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustAndImpactSection;
