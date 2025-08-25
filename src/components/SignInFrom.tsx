"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const SignInFormOtp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"email" | "otp">("email");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });


  const handleSendOtp = async () => {
    // Manually validate just the email field
    const isEmailValid = await form.trigger("email");
    if (!isEmailValid) {
      return; 
    }

    setIsLoading(true);
    try {
      const email = form.getValues("email");
      const response = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success("Check your email for the verification code.");
        setStep("otp");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Could not connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };


  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        otp: data.otp,
      });

      if (result?.error) {
        toast.error(result.error);
      } else if (result?.ok) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Sign-in error", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
  
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  {...field}
                  disabled={isLoading || step === "otp"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {step === "otp" && (
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={field.disabled}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the code sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

 
        <Button
          type={step === "email" ? "button" : "submit"}
          className="w-full"
          disabled={isLoading}
          onClick={step === "email" ? handleSendOtp : undefined}
        >
          {isLoading
            ? "Loading..."
            : step === "email"
            ? "Send OTP"
            : "Verify & Sign In"}
        </Button>
      </form>
    </Form>
  );
};

export default SignInFormOtp;
