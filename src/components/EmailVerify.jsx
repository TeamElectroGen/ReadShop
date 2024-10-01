import React from 'react';
import Image from 'next/image';

const EmailVerify = () => {
    return (
        <div>
             <div className="flex items-center justify-center h-screen bg-purple-100">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-sm w-full text-center">
        <div className="bg-purple-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
        <Image
            src="/path/to/envelope-icon.png" //TODO: Icon will be added here
            alt="Envelope Icon"
            width={52} 
            height={52} 
            className="w-12 h-12"
          />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Check your inbox, please!</h2>
        <p className="text-gray-600 mb-4">
          Hey Nazrul, to start using this, we need to verify your email.
          We’ve already sent out the verification link. Please check it and
          confirm it's really you.
        </p>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400 transition duration-200">
          Sure!
        </button>
        <p className="text-gray-500 mt-4">
          Didn’t get e-mail? <a href="#" className="text-blue-500 hover:underline">Send it again</a>
        </p>
      </div>
    </div>
        </div>
    );
};

export default EmailVerify;