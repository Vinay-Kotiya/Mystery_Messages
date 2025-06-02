import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !session.user) {
    Response.json(
      {
        success: false,
        message: "User not authenticated",
      },
      { status: 401 }
    );
  }
  const userId = user._id;
  const { acceptMessage } = await request.json();
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessages: acceptMessage },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    return Response.json(
      { success: true, message: "accepting messages updated successfully.. " },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error accepting messages:", error);
    return NextResponse.json(
      { success: false, message: "Error accepting messages" },
      { status: 500 }
    );
  }
}
export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !session.user) {
    Response.json(
      {
        success: false,
        message: "User not authenticated",
      },
      { status: 401 }
    );
  }
  const userId = user._id;
  try {
    const userData = await UserModel.findById(userId);
    if (!userData) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    const isAcceptingMessages = userData.isAcceptingMessages;
    // console.log("isAcceptingMessages:", isAcceptingMessages);
    return Response.json(
      {
        success: true,
        isAcceptingMessages: isAcceptingMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error accepting messages:", error);
    return Response.json(
      { success: false, message: "Error accepting messages" },
      { status: 500 }
    );
  }
}
