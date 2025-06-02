"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";
const Page = () => {
  // const [username, setUsername] = useState("");
  // const [userMessages, setUserMessages] = useState("");
  // const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  //setting value with debounce of 300 ms
  // const debounced = useDebounceCallback(setUsername, 300);
  //   const [debouncedValue, setValue] = useDebounceValue(username, 300);
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });
    if (result?.error) {
      toast.error("Incorrect Username or Password");
    }
    if (result?.url) {
      router.replace("/dashboard");
    }
  };
  return (
    <div className="flex justify-center items-center  bg-gray-200 min-h-screen">
      <div className="bg-white p-8 rounded-lg m-5 shadow-md w-full max-w-md">
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
            Sign in Mystery Messages
          </h1>
          <p className="mb-4 text-xl font-bold">
            Sign In to start your anonymous adventure
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Email/Username" {...field} />
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
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center">
          <p>
            Be a member?{" "}
            <Link
              href={"/sign-up"}
              className="text-blue-600 hover:underline hover:text-blue-800"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
