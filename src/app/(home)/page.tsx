import ServiceCard from "@/components/globle-component/ServiceCard";
import { Button } from "@/components/ui/button";
import { services } from "@/helper/service";
import Image from "next/image";
export default function Home() {

  return (
    <>
      <div className="flex  justify-center items-center  min-h-screen ">
        <div className="text-center mb-20 ">
          <h1 className="text-3xl">We Provide Best Services that we have</h1>
          <p className="text-gray-400 mb-2">
            the best we get to you on time just book now{" "}
          </p>
          <Button variant={"outline"}>Book Now</Button>
        </div>
      </div>
      <div className="bg-blue-500 -mt-20 flex justify-between items-center min-h-50 rounded-2xl p-5 lg:px-50  flex-col lg:flex-row gap-15">
        <div className="flex  gap-5  max-w-100 text-white flex-row justify-center items-center">
          <Image
            src="/shovel.png"
            alt="Vercel Logo"
            width={100}
            height={100}
            className="bg-yellow-300 rounded-full object-cover h-25 w-25"
          />
          <div className="flex flex-col gap-3 ">
            <h1 className="text-lg md:text-xl lg:text-2xl">
              Experienced Staff
            </h1>
            <p className=" text-sm md:text:lg lg:text-lg">
              Professional and Experienced staff help you anytime.
            </p>
          </div>
        </div>
        <div className="flex  gap-5  max-w-100 text-white flex-row justify-center items-center">
          <Image
            src="/waching.png"
            alt="Vercel Logo"
            width={100}
            height={100}
            className="bg-yellow-300 rounded-full object-cover h-25 w-25"
          />
          <div className="flex flex-col gap-3 ">
            <h1 className="text-lg md:text-xl lg:text-2xl">Natural Products</h1>
            <p className=" text-sm md:text:lg lg:text-lg">
              We only use natural products in the process.
            </p>
          </div>
        </div>
        <div className="flex  gap-5  max-w-100 text-white flex-row justify-center items-center">
          <Image
            src="/clean.png"
            alt="Vercel Logo"
            width={100}
            height={100}
            className="bg-yellow-300 rounded-full object-cover h-25 w-25"
          />
          <div className="flex flex-col gap-3 ">
            <h1 className="text-lg md:text-xl lg:text-2xl">Best Equipment</h1>
            <p className=" text-sm md:text:lg lg:text-lg">
              We use the best and world class equipment for cleaning.
            </p>
          </div>
        </div>
      </div>
      <section className="bg-white mt-20">
        <div className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left Column: Image Section */}
            <div className="relative h-[500px] flex items-center justify-center">
              {/* Main background image */}
              <Image
                src="https://images.pexels.com/photos/4239031/pexels-photo-4239031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Professional cleaner smiling"
                className="absolute w-[85%] h-[85%] object-cover rounded-lg shadow-lg"
                width={1000}
                height={1000}
              />

              <div className="absolute top-16 left-0 bg-yellow-400 p-6 shadow-xl w-48 text-center z-10">
                <div className="text-5xl font-extrabold text-gray-900">85+</div>
                <p className="text-base font-semibold text-gray-800 mt-2">
                  Years of Experience Working
                </p>
              </div>

              <div className="absolute bottom-10 right-0 p-2 bg-blue-500 shadow-xl z-10">
                <Image
                  src="https://images.pexels.com/photos/7217988/pexels-photo-7217988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Cleaning service in action"
                  className="w-60 h-auto"
                  width={1000}
                  height={1000}
                />
              </div>
            </div>

            <div className="max-w-lg">
              <p className="text-sm font-bold uppercase text-blue-600 mb-3">
                Our Introduction
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-5 leading-tight">
                The Best Residential Carpet Cleaning In New York City
              </h2>
              <p className="text-gray-500 mb-8">
                Gravida sodales condimentum pellen tesq accumsan orci. The
                concept behind this project was to create a mini website.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    High Quality
                  </h3>
                  <p className="text-gray-500">
                    We hold a successful track record of satisfying our
                    customers.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Superior Quality
                  </h3>
                  <p className="text-gray-500">
                    We hold a successful track record of satisfying our
                    customers.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Eco Friendly
                  </h3>
                  <p className="text-gray-500">
                    We hold a successful track record of satisfying our
                    customers.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Fast Service
                  </h3>
                  <p className="text-gray-500">
                    We hold a successful track record of satisfying our
                    customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-50 py-16 lg:py-24 mt-30">
        <div className="container mx-auto px-4">

          <div className="text-center mb-12">
            <p className="text-sm font-bold uppercase text-blue-600 mb-2">
              Our Services
            </p>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-20">
              Our Company Give Your Carpet A Deep Clean
            </h2>
          </div>

       
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            services.map((service) => (
              <ServiceCard  key={service.id} item={service} />
            ))
          }
            
            
          </div>
        </div>
      </section>
    </>
  );
}
