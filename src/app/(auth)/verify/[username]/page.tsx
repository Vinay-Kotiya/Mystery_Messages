"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { verifySchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@react-email/components";
import axios from "axios";
import { Link, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
// import { useDebounceCallback } from "usehooks-ts";

const page = () => {
  const router = useRouter();
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const params = useParams<{ username: string }>();
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      setIsVerifyingCode(true);
      const response = await axios.post(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });
      toast.success(response.data.message || "Verification successful!");

      router.replace("/sign-in");
    } catch (error) {
      console.error("Error during verification:", error);
      toast.error("Verification failed. Please try again.");
    } finally {
      setIsVerifyingCode(false);
    }
  };
  return (
    <div className="flex justify-center items-center bg-gray-200 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
            Verify Your Email
          </h1>
          {/* <p className="mb-4">Sign up to start your anonymous adventure</p> */}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem className="relative items-center">
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your verification code"
                      {...field}
                      //   onChange={(e) => {
                      //     field.onChange(e);
                      //     // debounced(e.target.value);
                      //     // setUsername(e.target.value);
                      //   }}
                    />
                  </FormControl>
                  {/* {isCheckingUsername && (
                    <Loader2 className="animate-spin absolute right-2 top-7 " />
                  )} */}
                  {/* <p
                    className={`text-sm ${userMessages === "Username is available." ? `text-green-500` : `text-red-500`}`}
                  >
                    {userMessages}
                  </p> */}

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isVerifyingCode}>
              {isVerifyingCode ? (
                <>
                  <Loader2 className="h-4 w-4 mr-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Verify"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default page;
