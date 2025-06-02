"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { messagesSchema } from "@/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const [suggestedMessages, setSuggestedMessages] = useState([
    "What’s a place you’ve never visited but dream of going to?",
    "If you could instantly master any skill, what would it be and why?",
    " What’s a small act of kindness that made your day recently?",
  ]);
  const { username } = useParams(); // ✅ Correct in React 19
  const form = useForm<z.infer<typeof messagesSchema>>({
    resolver: zodResolver(messagesSchema),
    defaultValues: {
      content: content,
    },
    values: {
      content: content,
    },
  });

  async function handleSuggestMessages(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/suggest-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      console.log(data.result);

      if (res.ok && data.success) {
        setResult(data.result);
      } else {
        setResult("Error: " + (data.message ?? "Unknown error"));
      }
    } catch (error) {
      setResult("Network error: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    // const messageArray = [];
    if (result) {
      console.log(result);
      // const coma = "'";
      const trimmedString = result.slice(1, -1);

      const splittedMessage = trimmedString.split("||");
      console.log(splittedMessage);

      setSuggestedMessages(splittedMessage);
    }
  }, [result]);

  const onSubmit = async (data: z.infer<typeof messagesSchema>) => {
    // data.content = username?.toString() || "";
    setIsSubmitting(true);
    try {
      console.log("Submitting data:", data);
      const content = data.content;
      const response = await axios.post<ApiResponse>("/api/send-message", {
        username,
        content,
      });
      if (response.status === 200) {
        toast.success("Message sent successfully...");
        setContent("");
        // setTimeout(() => {
        //   router.replace(`/verify/${username}`);
        // }, 2000);
      }
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.error("Error during sending message:", error);

      // Handle known server response
      if (error.response) {
        const status = error.response.status;
        const message =
          error.response.data?.message || "Unknown error occurred";

        if (status === 403 && message === "User is not accepting messages") {
          toast.error("User is not accepting messages");
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
    <div className="flex flex-col justify-center items-center md:pt-15 p-5">
      <h1 className="md:text-5xl text-2xl font-bold">Public Profile Link</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-[70%] m-5">
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem className="relative items-center   ">
                <FormLabel className="text-xl">
                  Send Anonymous Message to @{username}
                </FormLabel>
                <FormControl className="">
                  <Input
                    placeholder="Write your anonymous message here"
                    {...field}
                    // value={content}
                    className="md:text-2xl py-8 font-bold"
                    onChange={(e) => {
                      field.onChange(e);
                      // debounced(e.target.value);
                      setContent(e.target.value);
                    }}
                  />
                </FormControl>

                {/* <p
                  className={`text-sm ${userMessages === "Username is unique" ? `text-green-500` : `text-red-500`}`}
                >
                  {userMessages}
                </p> */}

                <FormMessage />
              </FormItem>
            )}
          />
          {/* <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-4 animate-spin" />
                Please wait...
              </>
            ) : (
              "Send it"
            )}
          </Button> */}
          <div className=" flex justify-center items-center">
            <button
              type="submit"
              className="bg-gray-300 py-3 my-3 px-5 rounded-xl text-xl font-bold flex-row flex hover:bg-gray-400"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Send it"
              )}
            </button>
          </div>
        </form>
      </Form>
      <div className="flex flex-col justify-center items-start md:w-[70%] m-5 gap-7">
        <Button
          onClick={handleSuggestMessages}
          className="text-xl px-5 py-7 flex-row"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-4 animate-spin" />
              Please wait...
            </>
          ) : (
            "Suggest Messages"
          )}
        </Button>
        <h1 className="text-xl">Click on any messages to select it.</h1>
        <div className="text-xl border w-full rounded-lg h-full flex-col gap-5 flex p-7">
          <h1 className="font-bold text-2xl">Messages</h1>
          {suggestedMessages &&
            suggestedMessages.map((message, index) => {
              return (
                <h1
                  key={index}
                  className="border p-4 rounded-lg text-center hover:bg-gray-200 transition"
                  onClick={() => {
                    setContent(message);
                  }}
                >
                  {message}
                </h1>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Page;
