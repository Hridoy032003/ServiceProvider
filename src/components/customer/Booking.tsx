"use client";

import React, { useState, useTransition } from "react";
import { format } from "date-fns";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  CalendarFold,
  Clock,
  Calendar as CalendarIcon,
  User,
  BadgeDollarSign,
} from "lucide-react";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { timeSlots } from "@/helper/slots";
import { createBooking } from "@/app/actions/Booking-slot";
import { toast } from "react-toastify";

interface BookingFormData {
  date: Date; // Managed as a Date object within the form state
  slot: string;
}

interface BookingProps {
  services: { id: string; name: string; price: number; duration: number }[];
  userId: string;
  providerId: string;
}

const Booking = ({ services, providerId }: BookingProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      date: new Date(),
      slot: undefined,
    },
  });

  const selectedDate = watch("date");
  const selectedTime = watch("slot");

  const serviceToBook = services?.[0];

  const selectedDateString = selectedDate ? (
    format(selectedDate, "PPP")
  ) : (
    <span>Pick a date</span>
  );

const calculateEndTime = (startTime: string, duration: number): string => {
  if (!selectedDate) return "";
  const [time, modifier] = startTime.split(" ");
  const [hours, minutes] = time.split(":").map(Number);
  const totalHours =
    modifier === "PM" && hours < 12
      ? hours + 12
      : modifier === "AM" && hours === 12
      ? 0
      : hours;

  const startDate = new Date(selectedDate);
  startDate.setHours(totalHours, minutes);

  const endDate = new Date(startDate.getTime() + duration * 60000);
  return format(endDate, "hh:mm a");
};

  const onSubmit: SubmitHandler<BookingFormData> = (data) => {
    if (!serviceToBook) {
      toast.error("Service not found.");
      return;
    }

    const formData = new FormData();
    const endTime = calculateEndTime(data.slot, serviceToBook.duration);

    formData.append("slot", data.slot);
    formData.append("startTime", data.slot);
    formData.append("endTime", endTime);
    formData.append("date", data.date.toISOString());

    formData.append("providerId", providerId);
    formData.append("serviceId", serviceToBook.id);

    startTransition(() => {
      createBooking(formData)
        .then((response) => {
          if (response.success) {
            toast.success(
              response.message || "Booking confirmed successfully!"
            );
            setIsSheetOpen(false);
            setValue("date", new Date());
          } else {
            toast.error(response.error || "An unknown error occurred.");
          }
        })
        .catch((error) => {
          console.error("Booking submission failed:", error);
          toast.error("Could not connect to the server. Please try again.");
        });
    });
  };

  if (!serviceToBook) {
    return (
      <Card className="w-full max-w-md mt-10 shadow-lg">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Service details could not be loaded. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <form id="booking-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="hidden"
        {...register("date", { required: "Please select a date." })}
      />
      <input
        type="hidden"
        {...register("slot", { required: "Please select a time slot." })}
      />

      <Card className="w-full max-w-md mt-10 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Booking Information</span>
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <CalendarFold className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Select a Date & Time</SheetTitle>
                  <SheetDescription>
                    Choose a date and an available time slot for your service.
                  </SheetDescription>
                </SheetHeader>

                <div className="py-4 flex flex-col justify-center items-center gap-4">
                  <h3 className="mb-2 text-sm font-medium text-gray-700">
                    Select a Date
                  </h3>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(day) =>
                      setValue("date", day as Date, { shouldValidate: true })
                    }
                    className="rounded-md border"
                    disabled={(day) =>
                      day < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                  />
                  {errors.date && (
                    <p className="text-sm text-red-500">
                      {errors.date.message}
                    </p>
                  )}
                </div>

                {selectedDate && (
                  <div className="p-4">
                    <h3 className="mb-4 text-sm font-medium text-gray-700">
                      Available Slots
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot}
                          type="button"
                          variant={
                            selectedTime === slot ? "default" : "outline"
                          }
                          onClick={() =>
                            setValue("slot", slot, { shouldValidate: true })
                          }
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                    {errors.slot && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.slot.message}
                      </p>
                    )}
                  </div>
                )}

                <SheetFooter className="mt-6"></SheetFooter>
              </SheetContent>
            </Sheet>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center text-sm">
              <User className="mr-3 h-5 w-5 text-gray-500" />
              <span className="font-medium">Service Provider:</span>
              <span className="ml-2 text-gray-600">{serviceToBook.name}</span>
            </div>
            <div className="flex items-center text-sm">
              <CalendarIcon className="mr-3 h-5 w-5 text-gray-500" />
              <span className="font-medium">Selected Date:</span>
              <span className="ml-2 text-gray-600">{selectedDateString}</span>
            </div>
            <div className="flex items-center text-sm">
              <BadgeDollarSign className="mr-3 h-5 w-5 text-gray-500" />
              <span className="font-medium">Price: $</span>
              <span className="ml-2 text-gray-600">{serviceToBook.price}</span>
            </div>
            <div className="flex  text-sm md:flex-row justify-between flex-col lg:flex-row  ">
          
              <div className="flex items-center text-sm">
                <Clock className="mr-3 h-5 w-5 text-gray-500" />
                <span className="font-medium">Selected Time:</span>
                <span className="ml-2 text-gray-600">
                  {selectedTime || "Not selected"}
                </span>
              </div>
              <Button
                type="submit"
                form="booking-form"
                variant="default"
                size="lg"
                disabled={!selectedDate || !selectedTime || isPending}
                className="mt-2"
              
              >
                {isPending ? "Confirming..." : "Confirm Booking"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default Booking;
