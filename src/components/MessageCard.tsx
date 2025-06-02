"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Message } from "@/model/User";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
type MessageDeleteProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};
const MessageCard = ({ message, onMessageDelete }: MessageDeleteProps) => {
  const handleDeleteMessage = async () => {
    try {
      const messageId = message._id + "";
      onMessageDelete(messageId);
      const response = await axios.delete<ApiResponse>(
        `api/delete-message/${message._id}`
      );
      toast.success(response.data.message);
    } catch (error) {
      const AxiosError = error as AxiosError<ApiResponse>;
      toast.error(
        AxiosError.response?.data.message || "Failed to delete message "
      );
    }
  };
  const formatted = new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  }).format(new Date(message.createdAt));
  return (
    <Card className="m-5">
      <CardHeader>
        <CardTitle className="md:text-2xl text-xl">{message.content}</CardTitle>
        <CardDescription>{formatted}</CardDescription>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-15">
              <X className="w-5 h-5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                message and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteMessage}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>
    </Card>
  );
};

export default MessageCard;
