// import mongoose from "mongoose";

// type ConnectionObject = {
//   isConnected?: number;
// };
// const connection: ConnectionObject = {};

// export default async function dbConnect(): Promise<void> {
//   if (connection.isConnected) {
//     console.log("MongoDB is already connected");
//     return;
//   }
//   try {
//     const db = await mongoose.connect(process.env.MONGODB_URI || "");
//     connection.isConnected = db.connections[0].readyState;
//     console.log("MongoDB connected successfully");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// }
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}
type ConnectionObject = {
  isConnected?: number;
};
const connection: ConnectionObject = {};
const dbConnect = async () => {
  try {
    if (connection.isConnected) {
      console.log("MongoDB is already connected");
      return;
    }
    // if (mongoose.connection.readyState >= 1) return;

    const db = await mongoose.connect(MONGODB_URI, {
      dbName: "mysterymessage",
    });
    connection.isConnected = db.connections[0].readyState;

    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
    throw err;
  }
};
export default dbConnect;
// import mongoose from "mongoose";

// declare global {
//   var mongoose: any;
// }

// const connection = global.mongoose || { conn: null, promise: null };

// async function dbConnect() {
//   if (connection.conn) return connection.conn;

//   if (!process.env.MONGODB_URI) {
//     throw new Error("MONGODB_URI is not defined in environment variables");
//   }

//   if (!connection.promise) {
//     connection.promise = mongoose
//       .connect(process.env.MONGODB_URI)
//       .then((mongoose) => {
//         console.log("MongoDB connected successfully");
//         return mongoose;
//       })
//       .catch((err) => {
//         console.error("MongoDB connection error:", err);
//         throw err;
//       });
//   }

//   connection.conn = await connection.promise;
//   global.mongoose = connection;
//   return connection.conn;
// }

// export default dbConnect;
