
import Image from 'next/image';
import React from 'react'
import { FaBroom } from "react-icons/fa";
interface Item {
  title: string;
  description: string;
  imageUrl: string;
}
const ServiceCard = ({ item }: { item: Item }) => {
  return (
    <div>
      <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden text-center">
        <div className="relative">
          <Image
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-56 object-cover"
            width={1000}
            height={1000}
          />

          <div className="absolute top-0 left-0 bg-yellow-400 p-3">
            <FaBroom className="h-6 w-6 text-gray-800" />
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            {item.title}
          </h3>
          <p className="text-gray-500 mb-6">{item.description}</p>
          <a
            href="#"
            className="font-bold text-blue-600 border-b-2 border-blue-600 pb-1 hover:text-blue-800 hover:border-blue-800 transition"
          >
            READ MORE
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard