"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDebounceCallback } from "usehooks-ts";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
const page = () => {
  const [username, setUsername] = useState("");
  const [userMessages, setUserMessages] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  //setting value with debounce of 300 ms
  const debounced = useDebounceCallback(setUsername, 300);
  //   const [debouncedValue, setValue] = useDebounceValue(username, 300);
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    const checkingUsernameUnique = async () => {
      if (username.length > 1) {
        setIsCheckingUsername(true);
        setUserMessages("");

        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${username}`
          );
          const data = response.data;
          setUserMessages(data.message || "Username is available.");
          console.log("Response data:", data);
          // if (data) {
          //   setUserMessages("Username is available.");
          // } else {
          //   setUserMessages("Username is already taken.");
          // }
        } catch (err) {
          const error = err as AxiosError<{ message?: string }>;
          console.error("Error checking username:", error);
          if (error.response) {
            const status = error.response.status;
            const message =
              error.response.data?.message || "Unknown Error occurred";
            if (status === 400 && message === "Username already exists") {
              setUserMessages(message);
              toast.error(message);
            } else {
              toast.error(`Error ${status}: ${message}`);
              setUserMessages(message);
            }
          } else if (error.request) {
            toast.error("No response from server. Please try again");
          } else {
            toast.error("Unexpected Error. Please try again");
          }

          // setUserMessages(
          //   typeof error === "object" &&
          //     error !== null &&
          //     "response" in error &&
          //     typeof (error as any).response === "object" &&
          //     (error as any).response !== null &&
          //     "data" in (error as any).response &&
          //     typeof (error as any).response.data === "object" &&
          //     (error as any).response.data !== null &&
          //     "message" in (error as any).response.data
          //     ? (error as any).response.data.message
          //     : "Error checking username."
          // );
          // setUserMessages("Error checking username.");
        } finally {
          setIsCheckingUsername(false);
        }
      } else {
        setUserMessages("");
        setIsCheckingUsername(false);
      }
    };

    checkingUsernameUnique();
  }, [username]);
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      // console.log("Submitting data:", data);
      const response = await axios.post<ApiResponse>("/api/sign-up", data);
      if (response.status === 201) {
        toast.success("Sign up successful! Redirecting to Verify page...");
        setTimeout(() => {
          router.replace(`/verify/${username}`);
        }, 2000);
      }
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.error("Error during sign up:", error);

      // Handle known server response
      if (error.response) {
        const status = error.response.status;
        const message =
          error.response.data?.message || "Unknown error occurred";

        if (status === 400 && message === "Email already exists") {
          toast.error("Email already exists.");
        } else {
          toast.error(`Error ${status}: ${message}`);
        }
      } else if (error.request) {
        // Request was made but no response received
        toast.error("No response from server. Please try again.");
      } else {
        // Something else happened
        toast.error("Unexpected error. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex justify-center items-center  bg-gray-200 min-h-screen">
      <div className="bg-white p-8 rounded-lg m-5 shadow-md w-full max-w-md">
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
            Join Mystery Messages
          </h1>
          <p className="mb-4 text-xl font-bold">
            Sign up to start your anonymous adventure
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem className="relative items-center">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value);
                        // setUsername(e.target.value);
                      }}
                    />
                  </FormControl>
                  {isCheckingUsername && (
                    <Loader2 className="animate-spin absolute right-2 top-7 " />
                  )}
                  <p
                    className={`text-sm ${userMessages === "Username is unique" ? `text-green-500` : `text-red-500`}`}
                  >
                    {userMessages}
                  </p>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Sign up"
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center">
          <p>
            Already a member?{" "}
            <Link
              href={"/sign-in"}
              className="text-blue-600 hover:underline hover:text-blue-800"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
