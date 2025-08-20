import React from "react";
// Importing icons for a better visual experience
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser } from "react-icons/fa";

// Define a TypeScript interface for the serviceProvider prop for type safety
interface ServiceProvider {
  id: string;
  businessName: string;
  phoneNumber: string;
  contactEmail: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  userId: string;
}

const ServiceProviderProfile = ({
  sevicerviceProvider,
}: {
  sevicerviceProvider: ServiceProvider;
}) => {
console.log(" sevicerviceProvider", sevicerviceProvider);
  if (!sevicerviceProvider) {
    return (
      <div className="flex items-center justify-center p-10">
        <p className="text-gray-500">Loading service provider information...</p>
      </div>
    );
  }

  return (

    <div className="max-w-2xl  my-10 bg-white rounded-xl shadow-lg overflow-hidden min-w-150">
  
      <div className="bg-black p-6">
        <h1 className="text-3xl font-bold text-white capitalize text-center">
          {sevicerviceProvider.businessName}
        </h1>
      </div>


      <div className="p-6 md:p-8">
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Contact Information
          </h2>
          <div className="space-y-3 text-gray-600">
            <div className="flex items-center">
              <FaEnvelope className="text-blue-500 mr-3" />
              <a
                href={`mailto:${sevicerviceProvider.contactEmail}`}
                className="hover:text-blue-700 hover:underline"
              >
                {sevicerviceProvider.contactEmail}
              </a>
            </div>
            <div className="flex items-center">
              <FaPhone className="text-blue-500 mr-3" />
              <a
                href={`tel:${sevicerviceProvider.phoneNumber}`}
                className="hover:text-blue-700 hover:underline"
              >
                {sevicerviceProvider.phoneNumber}
              </a>
            </div>
          </div>
        </div>

      
        <div>
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Location
          </h2>
          <div className="flex items-start text-gray-600">
            <FaMapMarkerAlt className="text-blue-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <p>{sevicerviceProvider.street}</p>
              <p>{`${sevicerviceProvider.city}, ${sevicerviceProvider.state} ${sevicerviceProvider.postalCode}`}</p>
              <p>{sevicerviceProvider.country}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-3 text-xs text-gray-500 flex items-center justify-center">
        <FaUser className="mr-2" />
        <span>User ID: {sevicerviceProvider.userId}</span>
      </div>
    </div>
  );
};

export default ServiceProviderProfile;
