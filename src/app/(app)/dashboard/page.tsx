"use client";
import MessageCard from "@/components/MessageCard";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Message, User } from "@/model/User";
import { acceptMessagesSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const { data: session } = useSession();
  const handleDeleteMessage = (messageId: string) => {
    console.log("delete message that has this id:", messageId);

    setMessages(messages.filter((message) => message._id !== messageId));
  };
  const form = useForm({
    resolver: zodResolver(acceptMessagesSchema),
  });
  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");
  const fetchAcceptingMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get("/api/accept-messages");
      // console.log("is accepting message :", response.data.isAcceptingMessages);
      setValue("acceptMessages", response.data.isAcceptingMessages);
    } catch (error) {
      const AxiosError = error as AxiosError<ApiResponse>;
      toast.error(
        AxiosError.response?.data.message || "Failed to fetch message setting"
      );
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);
  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get("/api/get-message");
        // console.log("all messages :", response.data);
        setMessages(response.data.messages);
        if (refresh) {
          toast.loading("Showing latest messages");
        }
      } catch (error) {
        const AxiosError = error as AxiosError<ApiResponse>;
        toast.error(
          AxiosError.response?.data.message || "Failed to fetch message "
        );
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages]
  );
  useEffect(() => {
    if (!session || !session.user) return;
    fetchAcceptingMessages();
    fetchMessages();
  }, [session, setValue, fetchAcceptingMessages, fetchMessages]);
  //handle switch change
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast.success(response.data.message + " to " + acceptMessages);
    } catch (error) {
      const AxiosError = error as AxiosError<ApiResponse>;
      toast.error(
        AxiosError.response?.data.message || "Failed to fetch message "
      );
    }
  };
  if (!session || !session.user) {
    return <div className="text-2xl text-center">Login Please</div>;
  }
  const { username } = session?.user as User;
  //find BaseURL ans ProfileURL
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("Profile Url has been copied to clipboard");
  };

  return (
    <div className="lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">
          Copy Your Unique Link -
          <span className="text-sm text-gray-500">
            {" "}
            Send this like to others so they will send you messages
          </span>
        </h2>
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2"
          />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch
          {...register("acceptMessages")}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="ml-2">
          Accept Messages: {acceptMessages ? "On" : "Off"}
        </span>
      </div>
      <Separator />

      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length >= 1 ? (
          messages.map((message, index) => (
            <MessageCard
              key={index}
              message={message}
              onMessageDelete={(messageId) => {
                handleDeleteMessage(messageId);
              }}
            />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  );
};

export default page;
