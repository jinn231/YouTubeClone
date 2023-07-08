import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="flex items-center justify-between py-4 px-6">
        <div className="flex items-center">
          <img
            src="/path/to/logo.png"
            alt="YouTube Studio"
            className="h-8 mr-2"
          />
          <span className="font-semibold text-xl">YouTube Studio</span>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li className="text-gray-600 hover:text-black cursor-pointer">
              Dashboard
            </li>
            <li className="text-gray-600 hover:text-black cursor-pointer">
              Videos
            </li>
            <li className="text-gray-600 hover:text-black cursor-pointer">
              Analytics
            </li>
            <li className="text-gray-600 hover:text-black cursor-pointer">
              Comments
            </li>
            <li className="text-gray-600 hover:text-black cursor-pointer">
              Settings
            </li>
          </ul>
        </nav>
        <div className="flex items-center">
          <img
            src="/path/to/profile.png"
            alt="User Profile"
            className="h-8 rounded-full mr-2"
          />
          <span className="text-gray-600">Username</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
