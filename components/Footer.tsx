import React from 'react';
import { PageState } from '../types';

interface FooterProps {
  onNavigate: (page: PageState) => void;
}


const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white text-text-primary border-t border-gray-200">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
             <a href="#" onClick={(e) => { e.preventDefault(); onNavigate({ name: 'home' }); }} className="flex items-center space-x-2">
              <span className="text-3xl font-bold text-primary">Epla</span>
            </a>
            <p className="text-text-secondary text-base">
              Connecting local farmers with communities, one fresh delivery at a time.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Solutions</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate({ name: 'buyerSignUp' }); }} className="text-base text-text-secondary hover:text-primary">For Consumers</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate({ name: 'vendorSignUp' }); }} className="text-base text-text-secondary hover:text-primary">For Farmers</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate({ name: 'agentPortal' }); }} className="text-base text-text-secondary hover:text-primary">Community Agents</a></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-text-secondary hover:text-primary">About</a></li>
                  <li><a href="#" className="text-base text-text-secondary hover:text-primary">Blog</a></li>
                  <li><a href="#" className="text-base text-text-secondary hover:text-primary">Careers</a></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-text-secondary hover:text-primary">Privacy</a></li>
                  <li><a href="#" className="text-base text-text-secondary hover:text-primary">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-text-secondary xl:text-center">&copy; 2024 Epla. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;