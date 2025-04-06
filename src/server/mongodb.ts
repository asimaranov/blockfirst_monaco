import mongoose from 'mongoose';
import { env } from '~/env';

// Define interface for the cached mongoose connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Declare global interface with mongoose property
declare global {
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = env.MONGODB_URI;
const DATABASE_NAME = env.DATABASE_NAME || 'blockfirst';

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: DATABASE_NAME,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
